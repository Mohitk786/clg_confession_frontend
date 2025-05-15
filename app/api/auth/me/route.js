import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    let {user} = await verifySession();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "UNAUTHORIZED"
      }, { status: 404 });
    }

    await dbConnect();
    const dbUser =  await User.findById(user.userId).select("sp referCode");

    if (!dbUser) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "User fetched",
      data: {...user, sp:dbUser.sp, referCode:dbUser?.referCode}
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Error while getting user"+err.message
    }, { status: 500 });
  }
}
