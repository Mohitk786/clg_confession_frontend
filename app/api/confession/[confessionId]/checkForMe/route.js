import { NextResponse } from "next/server";
import Confession from "@/models/Confession";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { verifySession } from "@/lib/dal";
import { SP_DEDUCTION } from "@/constants/spCost";

export async function GET(req, {params}) {
  try {
    
    const {user} = await verifySession();
    // Validate user
    if (!user || !user.userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }
    const { confessionId } = await params;
    
    
    // Validate confession ID
    if (!confessionId) {
      return NextResponse.json(
        { success: false, message: "Confession ID is required" },
        { status: 400 }
      );
    }
    
    
    await dbConnect();
    const foundUser = await User.findById(user.userId);
    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if(foundUser.sp < SP_DEDUCTION.CHECK_FOR_ME){
      return NextResponse.json(
        { success: false, message: "Not enough SP" },
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

    
    const isForYou = confession.targetUser.toString() === user.userId.toString()  ;
    if (foundUser) {
      foundUser.sp -= SP_DEDUCTION.CHECK_FOR_ME;
      await foundUser.save();
    }
    
    // No target user => don't tell user that isme kisi ko mention hi nahi kiya
    if (!confession.targetUser) {
      return NextResponse.json({
        success: true,
        isForYou: false,
        message: "This confession is not for you", 
      });
    }

    return NextResponse.json({
      success: true,
      isForYou,
      message: isForYou
        ? "Yes, this confession is for you"
        : "No, this confession is not for you",
    });
  } catch (error) {
    console.error("Error checking confession target:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while checking confession target",
      },
      { status: 500 }
    );
  }
}
