import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";

export const GET = async (req) => {
  try {
    const {user} = await verifySession();
    if (!user || !user.userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const { searchParams } = req.nextUrl;
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username query param is required" },
        { status: 400 }
      );
    }

    const matchedUsers = await User.find({
      username: { $regex: `^${username}`, $options: "i" },
    })
      .select("username")
      .limit(50);

    return NextResponse.json({
      success: true,
      message: "Users fetched successfully",
      data: matchedUsers,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
