"use server";

import { dbConnect } from "@/lib/dbConnect";
import { getUserAuth } from "@/lib/auth";
import User from "@/models/User";
import Confession from "@/models/Confession";
import News from "@/models/News";
import Like from "@/models/Like";

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
    const skip = (page - 1) * limit;

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
    const likedPosts = await Like.find({ userId: user.userId, postType: isConfession ? "confession" : "news" });
    const likedPostIds = new Set(
      likedPosts.map((like) => like.postId.toString())
    );
    let data;
    let hasMore = false;

    if (isConfession) {
      const confessions = await Confession.find({ college: collegeId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const confessionCount = await Confession.countDocuments({
        college: collegeId,
      });
      hasMore = confessionCount > skip + confessions?.length;

      const confessionsWithIsLiked = confessions.map((conf) => ({
        ...conf,
        isLiked: likedPostIds.has(conf._id.toString()),
      }));

      data = { confessions: confessionsWithIsLiked };
    } else {
      const news = await News.find({ college: collegeId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const newsCount = await News.countDocuments({ college: collegeId });
      hasMore = newsCount > skip + news?.length;

      const newsWithIsLiked = news.map((n) => ({
        ...n,
        isLiked: likedPostIds.has(n._id.toString()),
      }));

      data = { news: newsWithIsLiked };
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
