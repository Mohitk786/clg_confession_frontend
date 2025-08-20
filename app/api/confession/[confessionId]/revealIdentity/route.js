import { NextResponse } from "next/server";
import Confession from "@/models/Confession";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { SP_DEDUCTION } from "@/constants/spCost";
import { auth } from "@/auth";

export async function GET(req, { params }) {
  try {
    const session = await auth(); 

    if (!session) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 404 });
    }

    const {user} = session;

    if (!user || !user.userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const { confessionId } = await params;

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

    if(foundUser.paidFor.includes(confessionId)) {
      return NextResponse.json({
        success: true,
        isForYou: false,
        message: "You have already paid for this confession",
      });
    }

    if (foundUser.sp < SP_DEDUCTION.REVEAL_IDENTITY) {
      return NextResponse.json(
        { success: false, message: "Not enough SP" },
        { status: 400 }
      );
    }

    const confession = await Confession.findById(confessionId)

    if (!confession) {
      return NextResponse.json(
        { success: false, message: "Confession not found" },
        { status: 404 }
      );
    }

    if (!confession?.targetUser) {
      return NextResponse.json({
        success: true,
        isForYou: false,
        message: "This confession is not for you",
      });
    }

    const isForYou = confession.targetUser.toString() === user.userId.toString();


    if (isForYou) {
        foundUser.sp -= SP_DEDUCTION.REVEAL_IDENTITY;
        foundUser.paidFor.push(confession._id);
       await foundUser.save();
    }

    return NextResponse.json({
      success: true, 
    });
    
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error while checking confession target",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
