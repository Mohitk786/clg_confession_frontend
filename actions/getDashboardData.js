"use server"

import { dbConnect } from "@/lib/dbConnect";
import {getUserAuth} from "@/lib/auth";
import User from "@/models/User";
import Confession from "@/models/Confession";
import News from "@/models/News";

export const getDashboardData = async () => {
  try {
    const user = await getUserAuth();
    if(!user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    await dbConnect();
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
      .select("content commentsCount tags reactions")
      .sort({ createdAt: -1 })
      .limit(confessionLimit)

    const news = await News.find({ college: collegeId })
      .select("content commentsCount image tags reactions")
      .sort({ createdAt: -1 })
      .limit(newsLimit)

      return {
        confessions: JSON.parse(JSON.stringify(confessions)),
        news: JSON.parse(JSON.stringify(news)),
      };
  } catch (error) {
    return {
      success: false,
      message: "Error in getHomeData",
      error: error.message,
    };
  }
};

