import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Reaction from "@/models/Reaction";
import { getAuthUser } from "@/lib/auth";

export async function POST(req) {
  await dbConnect();

  const user = await getAuthUser(req);
  if (!user || !user.userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    
      const body = await req.json();
        const { conferssionId, reactionType, emoji, isLike } = body;

    if (!conferssionId || !reactionType) {
      return NextResponse.json(
        { success: false, message: "Confession ID and reaction type are required" },
        { status: 400 }
      );
    }

    // Validate reactionType
    if (!["like", "emoji"].includes(reactionType)) {
      return NextResponse.json(
        { success: false, message: "Invalid reaction type" },
        { status: 400 }
      );
    }

    if (reactionType === "emoji" && (!emoji || emoji.trim() === "")) {
      return NextResponse.json(
        { success: false, message: "Emoji value is required for emoji reaction" },
        { status: 400 }
      );
    }

    // Check if the same reaction already exists
    const existingReaction = await Reaction.findOne({
      userId: user.userId,
      confession: conferssionId,    
    });

    let newReaction;

    if (existingReaction) {
      // Remove existing reaction (toggle off)
      if(reactionType === "emoji"){
            if(existingReaction.emoji !== emoji){
            existingReaction.emoji =emoji;
           }
      }else{
          existingReaction.isLike=isLike;
      }
    
      await existingReaction.save();
       
     
      
    }else{
           newReaction = new Reaction({
      userId: user.userId,
      confession: conferssionId,
      reactionType,
      ...(reactionType === "emoji" && { emoji }),
      ...(reactionType === "isLike" && { isLike })
    });

    await newReaction.save();
    }

    

    return NextResponse.json({
      success: true,
      message: "Reaction added",
      data: newReaction,
    });
  } catch (error) {
    console.error("Error in reaction API:", error);
    return NextResponse.json(
      { success: false, message: "Server error while handling reaction" },
      { status: 500 }
    );
  }
}
