import { NextResponse } from "next/server";
import Confession from "@/models/Confession";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { getAuthUser } from "@/lib/auth";
import News from "@/models/News";
import { SP_REWARD } from "@/constants/spCost";

export async function POST(req, { params }) {
  try {
    
    const user = await getAuthUser(req);
    const { postId } = params;

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
    
    if (!postId || postId.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Post ID is required" },
        { status: 400 }
      );
    }
    
    await dbConnect();
    const post = (await Confession.findById(postId)) || (await News.findById(postId));
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    const newComment = new Comment({
      content: content.trim(),
      postId: postId,
      createdBy: user.userId,
    });

    await newComment.save();

    const foundUser = await User.findById(user.userId);
    if (foundUser) {
      foundUser.sp +=  SP_REWARD.COMMENT;
      await foundUser.save();
    }

    post.comments.push(newComment._id);
    await post.save();

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
