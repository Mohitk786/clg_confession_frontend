import { NextResponse } from "next/server";
import Confession from "@/models/Confession";
import Like from "@/models/Like";
import User from "@/models/User";
import News from "@/models/News";
import { dbConnect } from "@/lib/dbConnect";
import { getAuthUser } from "@/lib/auth";
import { SP_REWARD } from "@/constants/spCost";

export async function POST(req, { params }) {
  try {
    const user = await getAuthUser(req);
    const { postId } = await params;

    if (!user?.userId) {
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
   
    console.log("Post ID:", postId);
    const {postType} = await req.json();
    if (!postType || (postType !== "confession" && postType !== "news")) {
      return NextResponse.json(
        { success: false, message: "Invalid post type" },
        { status: 400 }
      );
    }

    await dbConnect();

    const post =
      (await Confession.findById(postId)) || (await News.findById(postId));

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
    await post.save();

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
