import {  NextResponse } from "next/server";
import Confession from "@/models/Confession";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { verifySession } from "@/lib/dal";

export async function DELETE(req, { params }) {
  const user =await verifySession();

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
  const { confessionId } = params;

  if (!user?.userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const confession = await Confession.findById(confessionId);
  if (!confession)
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );

  if (confession.createdBy.toString() !== user.userId) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  await Comment.deleteMany({ confession: confessionId });
  await Confession.findByIdAndUpdate(confessionId, { isDeleted: true });

  const foundUser = await User.findById(user.userId);
  if (foundUser) {
    foundUser.sp = (foundUser.sp || 0) - 5;
    await foundUser.save();
  }

  return NextResponse.json({ success: true, message: "Confession deleted" });
}
