import { NextResponse } from "next/server";
import Confession from "@/models/Confession";
import Like from "@/models/Like";
import User from "@/models/User";
import News from "@/models/News";
import { dbConnect } from "@/lib/dbConnect";
import { auth } from "@/auth";
import { SP_REWARD } from "@/constants/spCost";
import { Notifications_Types } from "@/constants/data";
import Notification from "@/models/Notification";
import { revalidatePath } from "next/cache";

export async function POST(req, { params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ success: false, message: "NOT AUTHENTICATED" }, { status: 401 });
    }

    const {user} = session;

    const { postId } = await params;

    if (!user || !user.userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. User not authenticated" },
        { status: 401 }
      );
    }

    if (!postId?.trim()) {
      return NextResponse.json(
        { success: false, message: "Post ID is required" },
        { status: 400 }
      );
    }

    const { postType } = await req.json();
    if (!postType || (postType !== "confession" && postType !== "news")) {
      return NextResponse.json(
        { success: false, message: "Invalid post type" },
        { status: 400 }
      );
    }

    await dbConnect();

    const PostModel = postType === "confession" ? Confession : News;
    const post = await PostModel.findById(postId);

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    const existingLike = await Like.findOne({
      postId,
      postType,
      userId: user.userId,
    });

    if (existingLike) {
      post.likesCount = Math.max(0, post.likesCount - 1);
      post.likes = post.likes.filter(
        (likeId) => likeId.toString() !== existingLike._id.toString()
      );

      await Promise.all([
        post.save(),
        Like.deleteOne({ _id: existingLike._id }),
      ]);

      return NextResponse.json(
        {
          success: true,
          message: "Like removed successfully",
          data: {
            postId,
            isLiked: false,
            likesCount: post.likesCount,
          },
        },
        { status: 200 }
      );
    }

    const newLike = await Like.create({
      postId,
      postType,
      userId: user.userId,
    });

    const foundUser = await User.findById(user.userId);
    if (foundUser) {
      foundUser.sp += SP_REWARD.LIKE;
      await foundUser.save();
    }

    post.likesCount += 1;
    post.likes.push(newLike._id);

    const tasks = [post.save()];
    if (post.createdBy?.toString() !== user.userId) {

      const notification = await Notification.findOne({
        from: user.userId,
        to: post.createdBy,
        type:
          postType === "confession"
            ? Notifications_Types.CONFESSION_LIKED
            : Notifications_Types.NEWS_LIKED,
        refModel: postType === "confession" ? "Confession" : "News",
        refId: post._id,
      });

     if(!notification) {
        tasks.push(
          Notification.create({
            from: user.userId,
            to: post.createdBy,
            message: `${user?.gender === "FEMALE" ? "A girl" : "Someone"} from your college liked your ${postType}`,
            type:
              postType === "confession"
                ? Notifications_Types.CONFESSION_LIKED
                : Notifications_Types.NEWS_LIKED,
            refModel: postType === "confession" ? "Confession" : "News",
            refId: post._id,
          })
        );

        revalidatePath('/notifications');
      }
    }

    await Promise.all(tasks);
    return NextResponse.json(
      {
        success: true,
        message: "Like added successfully",
        data: {
          postId,
          isLiked: true,
          likesCount: post.likesCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while toggling like",
      },
      { status: 500 }
    );
  }
}
