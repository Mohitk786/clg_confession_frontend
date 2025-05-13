import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { verifySession } from "@/lib/dal";
import Like from "../../../../models/Like";
import Confession from "@/models/Confession";
import News from "@/models/News";

export async function POST(req) {
  await dbConnect();

  const {user} = await verifySession();
  if (!user || !user.userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        {
          success: false,
          message: "Post Id and reaction type are required",
        },
        { status: 400 }
      );
    }
    const post =
      (await Confession.findById(postId)) || (await News.findById(postId));

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    const existingLike = await Like.findOne({
      userId: user.userId,
      postId: postId,
    });

    if (existingLike) {
      await existingLike.deleteOne({
        userId: user.userId,
        postId: postId,
      });

      await post.updateOne({ $pull: { likes: existingLike._id } });

      return NextResponse.json({
        success: true,
        message: "Like removed",
      });
    }

    const newLike = await Like.create({
      postId: postId,
      userId: user.userId,
    });

    await post.updateOne({ $push: { likes: newLike._id } });

    return NextResponse.json({
      success: true,
      message: "Reaction added",
      data: newLike,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error while handling reaction" },
      { status: 500 }
    );
  }
}
