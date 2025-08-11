"use server";

import { dbConnect } from "@/lib/dbConnect";
import { verifySession } from "@/lib/dal";
import User from "@/models/User";
import Confession from "@/models/Confession";
import News from "@/models/News";
import Like from "@/models/Like";

export const getPosts = async (req, isConfession) => {
  try {
    const {user} = await verifySession();
    
    if (!user) return { success: false, message: "Not authenticated" };

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = 5;
    const skip = (page - 1) * limit;

    if (isNaN(page) || page < 1) {
      return {
        success: false,
        message: "Invalid page number",
      };
    }

    const [foundUser] = await Promise.all([
      User.findById(user.userId).lean().select("name college"),
    ]);

    if (!foundUser) {
      return { success: false, message: "User not found" };
    }

    const collegeId = foundUser.college;

    // Define models and fields based on post type
    const Model = isConfession ? Confession : News;
    const selectFields = isConfession
      ? "content tags likesCount commentsCount createdAt hasTargetUser"
      : "title content tags image likesCount commentsCount createdAt";

    // Run post query and likes in parallel
    const [posts, likes] = await Promise.all([
      Model.find({ college: collegeId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(selectFields)
        .lean(),

      Like.find({
        userId: user.userId,
        postType: isConfession ? "confession" : "news",
      }).select("postId"),
    ]);

    const likedPostIds = new Set(likes.map((like) => like.postId.toString()));

    let postsWithIsLiked = posts.map((post) => ({
      ...post,
      isLiked: likedPostIds.has(post._id.toString()),
    }));

   

    // Check if more posts exist without an extra count call
    const hasMore =
      posts.length === limit
        ? (await Model.exists({ college: collegeId }).skip(skip + limit).limit(1))
          ? true
          : false
        : false;


    return {
      success: true,
      hasMore,
      ...(isConfession
        ? { confessions: postsWithIsLiked }
        : { news: postsWithIsLiked }),
    };
  } catch (error) {
    return {
      success: false,
      message: "Error fetching posts",
      error: error.message,
    };
  }
};
