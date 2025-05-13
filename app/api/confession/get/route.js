import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/dbConnect";
import Confession from "@/models/Confession";
import User from "@/models/User";
import { verifySession } from "@/lib/dal";

export async function GET(req) {
  const {user} = await verifySession();
  
  if(!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }
  await dbConnect();

  if (!user?.userId) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const foundUser = await User.findById(user.userId);
  if (!foundUser?.college) {
    return NextResponse.json({ success: false, message: "User not found or college missing" }, { status: 400 });
  }

  const confessions = await Confession.find({ college: foundUser.college, isDeleted: false })
    .select("content commentsCount tags")
    .sort({ createdAt: -1 });

  return NextResponse.json({ success: true, message: "Fetched", data: confessions });
}