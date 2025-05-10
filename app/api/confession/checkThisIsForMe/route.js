import { NextResponse } from "next/server";
import Confession from "@/models/Confession";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { getAuthUser } from "@/lib/auth";

export async function GET(req) {
  try {
    await dbConnect();

    const user = await getAuthUser(req);
    const body = await req.json();
        const { confessionId } = body;
    

    // Validate user
    if (!user || !user.userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Validate confession ID
    if (!confessionId) {
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

    // No target user
    if (!confession.targetUser) {
      return NextResponse.json({
        success: true,
        isForYou: false,
        message: "This confession is not targeted to any user",
      });
    }

    const isForYou = confession.targetUser.toString() === user.userId;

    const foundUser = await User.findById(user.userId);
    if (foundUser) {
      foundUser.sp = (foundUser.sp || 0) - 5;
      await foundUser.save();
    }

    return NextResponse.json({
      success: true,
      isForYou,
      message: isForYou
        ? "Yes, this confession is for you"
        : "No, this confession is not for you",
    });
  } catch (error) {
    console.error("Error in checkItsForMe:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while checking confession target",
      },
      { status: 500 }
    );
  }
}
