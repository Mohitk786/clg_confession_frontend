"use server";

import { dbConnect } from "@/lib/dbConnect";
import { getUserAuth } from "@/lib/auth";
import User from "@/models/User";
import Confession from "@/models/Confession";
import News from "@/models/News";

export const getPosts = async (isConfession) => {
  try {
    const user = await getUserAuth();

    if (!user) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }

    await dbConnect();

    const foundUser = await User.findById(user.userId);
    if (!foundUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const collegeId = foundUser.college;
    let data;

    if (isConfession) {
      const confessions = await Confession.find({ college: collegeId });
      data = { confessions: JSON.parse(JSON.stringify(confessions)) };
    } else {
      const news = await News.find({ college: collegeId });
      data = { news: JSON.parse(JSON.stringify(news)) };
    }

    return {
      success: true,
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
