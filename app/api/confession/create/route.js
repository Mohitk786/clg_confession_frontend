import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Confession from "@/models/Confession";
import User from "@/models/User";
import College from "@/models/College";
import { getAuthUser } from "@/lib/auth";

export async function POST(req) {
  try {
    const user = await getAuthUser(req);
    console.log("Authenticated user:", user);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    await dbConnect();
    const body = await req.json();
    const { content, targetUser, tags, isAnonymous, spForRevealIdentity } =
      body;

    if (!user?.userId) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, message: "Confession content is required" },
        { status: 400 }
      );
    }

    const foundUser = await User.findById(user.userId);
    if (!foundUser)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    let confessTo = null;
    if (targetUser) confessTo = await User.findOne({ username: targetUser });

    const confession = new Confession({
      content: content.trim(),
      createdBy: user.userId,
      college: foundUser.college,
      tags: tags || [],
      isAnonymous: isAnonymous || false,
      ...(targetUser && { targetUser: confessTo._id }),
      ...(!isAnonymous && { spForRevealIdentity }),
    });

    await confession.save();
    foundUser.sp = (foundUser.sp || 0) + 5;
    await foundUser.save();

    await College.findByIdAndUpdate(foundUser.college, {
      $push: { confessions: confession._id },
    });

    return NextResponse.json(
      { success: true, message: "Confession created", data: confession },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating confession:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
