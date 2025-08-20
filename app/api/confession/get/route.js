import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/dbConnect";
import Confession from "@/models/Confession";
import User from "@/models/User";
import { auth } from "@/auth";

export async function GET(req) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ success: false, message: "NOT AUTHENTICATED" }, { status: 404 });
  }

  const {user} = session;

  await dbConnect();

  if (!user?.userId) {
    return NextResponse.json({ success: false, message: "NOT AUTHENTICATED" }, { status: 401 });
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