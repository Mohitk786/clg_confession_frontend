"use server"

import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import Confession from "@/models/Confession";
import News from "@/models/News";
import { auth } from "@/auth";

export const getDashboardData = async () => {
  const session = await auth();
  
  if (!session) {
    return {
      success: false,
      message: "Not authenticated",
      confessions: [],
      news: [],
    };
  }

  try {
    const user = session.user;
    
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
      .select("content commentsCount likesCount tags reactions")
      .sort({ createdAt: -1 })
      .limit(confessionLimit)
      .populate({
        path: "likes",
        select: "userId",
      })

    const news = await News.find({ college: collegeId })
      .select("content commentsCount likesCount image tags reactions, likes")
      .sort({ createdAt: -1 })
      .limit(newsLimit)
      .populate({
        path: "likes",
        select: "userId",
      })

      const confessionsWithIsLiked = confessions.map((confession) => {
        const isLiked = confession.likes.some(
          (like) => like.userId.toString() === user.userId.toString()
        );
        return {
          ...confession.toObject(),
          isLiked,
        };
      });

      const newsWithIsLiked = news.map((newsItem) => {
        const isLiked = newsItem.likes.some(
          (like) => like.userId.toString() === user.userId.toString()
        );
        return {
          ...newsItem.toObject(),
          isLiked,
        };
      });
   

      return {
        confessions: JSON.parse(JSON.stringify(confessionsWithIsLiked)),
        news: JSON.parse(JSON.stringify(newsWithIsLiked)),
      };
  } catch (error) {
    return {
      success: false,
      message: "Error in getHomeData",
      error: error.message,
    };
  }
};

