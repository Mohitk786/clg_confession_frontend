"use server";

import { dbConnect } from "@/lib/dbConnect";
import { getUserAuth } from "@/lib/auth";
import User from "@/models/User";
import Confession from "@/models/Confession";
import News from "@/models/News";

export const getPosts = async (req, isConfession) => {
  try {
    const user = await getUserAuth();

    if (!user) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 5;
    const skip = (page-1)*limit;

    if (page < 1) {
      return {
        success: false,
        message: "Invalid page number",
      };
    }
    if (isNaN(page)) {
      return {
        success: false,
        message: "Page number must be a number",
      };
    }
    
    const foundUser = await User.findById(user.userId);
    if (!foundUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const collegeId = foundUser.college;
    let data;
    let hasMore = false;

    if (isConfession) {
      const confessions = await Confession.find({ college: collegeId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
      const confessionCount = await Confession.countDocuments({ college: collegeId });
      hasMore  = confessionCount > (skip + confessions?.length);
      data = { confessions: JSON.parse(JSON.stringify(confessions)) };
    } else {
      const news = await News.find({ college: collegeId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
      const newsCount = await News.countDocuments({ college: collegeId });
      hasMore  = newsCount > (skip + news?.length);
      data = { news: JSON.parse(JSON.stringify(news)) };
    }

    return {
      success: true,
      hasMore,
      ...data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error fetching posts",
      error: error.message,
    };
  }
};
