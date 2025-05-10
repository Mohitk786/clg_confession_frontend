"use server";

import { dbConnect } from "@/lib/dbConnect";
import { getUserAuth } from "@/lib/auth";
import User from "@/models/User";
import Confession from "@/models/Confession";
import News from "@/models/News";

export const getPosts = async (isConfession) => {
  try {
    await dbConnect();
    const user = await getUserAuth();

    const foundUser = await User.findById(user.userId);
    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const collegeId = foundUser.college;

    let confessions;
    let news;
    if(isConfession) {
        confessions = await Confession.find({ college: collegeId});
    }else {
        news = await News.find({ college: collegeId});
    }
    

    return {
      ...(isConfession && {confessions: JSON.parse(JSON.stringify(confessions))}),
      ...(!isConfession && {news: JSON.parse(JSON.stringify(news))}),

    };
  } catch (error) {
    return {
      success: false,
      message: "Error in getHomeData",
      error: error.message,
    };
  }
};
