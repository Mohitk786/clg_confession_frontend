import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import Confession from "@/models/Confession";
import News from "@/models/News";
import { getAuthUser } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    console.log("User from getAuthUser:", user);

    if (!user || !user.userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    await dbConnect();
    console.log("User from getAuthUser:", user);

    const confessionLimit = 4;
    const newsLimit = 2;

    const foundUser = await User.findById(user.userId);
    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const collegeId = foundUser.college;

    const confessions = await Confession.find({ college: collegeId })
      .select("content commentsCount tags")
      .sort({ createdAt: -1 })
      .limit(confessionLimit);

    const news = await News.find({ college: collegeId })
      .select("content commentsCount image")
      .sort({ createdAt: -1 })
      .limit(newsLimit);

    console.log("Confessions:", confessions);
    console.log("News:", news);

    return NextResponse.json({
      success: true,
      message: "Home data fetched successfully",
      data: {
        confessions,
        news,
      },
    });
  } catch (error) {
    console.error("Error in getHomeData:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while fetching home data",
      },
      { status: 500 }
    );
  }
}
