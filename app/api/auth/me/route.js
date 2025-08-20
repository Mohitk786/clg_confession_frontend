import { NextResponse } from "next/server";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "NOT AUTHENTICATED"
      }, { status: 404 });
    }

    const {user} = session;

    console.log("user sessioend", user);

    await dbConnect();
    const dbUser =  await User.findById(user?.userId).select("sp referCode profileCompleted");

    if (!dbUser) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 });
    }




    return NextResponse.json({
      success: true,
      message: "User fetched",
      data: {...user, profileCompleted: dbUser.profileCompleted, sp:dbUser.sp, referCode:dbUser?.referCode}
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Error while getting user"+err.message
    }, { status: 500 });
  }
}
