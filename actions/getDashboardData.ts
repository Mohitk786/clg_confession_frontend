"use server";

import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import Confession from "@/models/Confession";
import News from "@/models/News";
import { auth } from "@/auth";
import "@/models/Like"


export interface Post {
  _id: string
  content: string
  tags: string[]
  reactions?: any[]
  likesCount: number
  commentsCount: number
  isLiked: boolean
  createdBy: string
}

export const getDashboardData = async (): Promise<{
  confessions: Post[];
  news: Post[];
  success: boolean;
  message: string;
  error?: string;
}> => {

  const session = await auth();

  if (!session) {
    return {
      success: false,
      message: "Not authenticated",
      confessions: [],
      news: [],
      error: "No active session",
    };
  }

  try {
    const user = session.user;

    await dbConnect();

    const confessionLimit = 4;
    const newsLimit = 2;

    const foundUser = await User.findById(user.userId);
    if (!foundUser) {
      return {
        success: false,
        message: "User not found",
        confessions: [],
        news: [],
        error: "User not found in DB",
      };
    }

    const collegeId = foundUser.college;

    const confessions = await Confession.find({ college: collegeId })
      .select("content commentsCount likesCount tags reactions createdAt likes createdBy")
      .sort({ createdAt: -1 })
      .limit(confessionLimit)
      .populate({
        path: "likes",
        select: "userId",
      });

    const news = await News.find({ college: collegeId })
      .select("content commentsCount likesCount image tags reactions createdAt likes createdBy")
      .sort({ createdAt: -1 })
      .limit(newsLimit)
      .populate({
        path: "likes",
        select: "userId",
      });


    const confessionsWithIsLiked = confessions.map((confession) => {
      const isLiked = confession.likes.some(
        (like: any) => like.userId.toString() === user.userId.toString()
      );
      return {
        ...confession.toObject(),
        isLiked,
      };
    });

    const newsWithIsLiked = news.map((newsItem) => {
      const isLiked = newsItem.likes.some(
        (like: any) => like.userId.toString() === user.userId.toString()
      );
      return {
        ...newsItem.toObject(),
        isLiked,
      };
    });

    return {
      success: true,
      message: "Dashboard data fetched successfully",
      confessions: JSON.parse(JSON.stringify(confessionsWithIsLiked)),
      news: JSON.parse(JSON.stringify(newsWithIsLiked)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Error in getDashboardData",
      error: error?.message,
      confessions: [],
      news: [],
    };
  }
};
