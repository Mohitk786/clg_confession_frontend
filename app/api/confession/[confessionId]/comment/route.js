import { NextResponse } from "next/server";
import Confession from "@/models/Confession";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { getAuthUser } from "@/lib/auth";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const user = await getAuthUser(req);
    const { confessionId } = params;

    if (!user || !user.userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. User not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { content } = body;

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Comment content is required" },
        { status: 400 }
      );
    }

    if (!confessionId || confessionId.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Confession ID is required" },
        { status: 400 }
      );
    }

    const confession = await Confession.findById(confessionId);
    if (!confession) {
      return NextResponse.json(
        { success: false, message: "Confession not found" },
        { status: 404 }
      );
    }

    const newComment = new Comment({
      content: content.trim(),
      createdBy: user.userId,
      confession: confessionId,
    });

    await newComment.save();

    const foundUser = await User.findById(user.userId);
    if (foundUser) {
      foundUser.sp = (foundUser.sp || 0) + 2;
      await foundUser.save();
    }

    confession.comments.push(newComment._id);
    confession.commentsCount += 1;
    await confession.save();

    return NextResponse.json(
      {
        success: true,
        message: "Comment added successfully",
        data: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while adding comment",
      },
      { status: 500 }
    );
  }
}
