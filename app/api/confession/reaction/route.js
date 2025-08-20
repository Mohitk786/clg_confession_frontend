import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Reaction from "@/models/Reaction";
  import Confession from "@/models/Confession";
import News from "@/models/News";
import { auth } from "@/auth";

export async function POST(req) {
  await dbConnect();

  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "NOT AUTHENTICATED" },
      { status: 401 }
    );
  }

  const {user} = session;

  try {
    const body = await req.json();
    const { postId, emoji } = body;

    if (!postId || !emoji) {
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

    let reaction = await Reaction.findOne({
      userId: user.userId,
      postId: postId,
    });

    if (reaction) {
      if (reaction.emoji !== emoji) {
        reaction.emoji = emoji;
        await reaction.save();
      } else {

        await Reaction.deleteOne({ _id: reaction._id });
        post.reactions.pull(reaction._id); 
        await post.save();

        return NextResponse.json({
          success: true,
          message: "Reaction removed",
        });
      }
    } else {
      // New reaction
      reaction = await Reaction.create({
        userId: user.userId,
        postId,
        emoji,
      });
      post.reactions.push(reaction._id);
      await post.save();
    }

    return NextResponse.json({
      success: true,
      message: "Reaction added/updated",
      data: reaction,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error while handling reaction" },
      { status: 500 }
    );
  }
}
