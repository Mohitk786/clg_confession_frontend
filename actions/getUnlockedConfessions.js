"use server"

import {dbConnect} from "@/lib/dbConnect"
import User from "@/models/User"
import Confession from "@/models/Confession";
import "@/models/College"
import { auth } from "@/auth";

export const getUnlockedConfessions = async () => {
  try {
    const session = await auth();

    if (!session) {
      return { success: false, message: "UNAUTHORIZED" };
    }

    const {user} = session;

    if (!user || !user.userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const { userId } = user;

    await dbConnect();

    const userData = await User.findById(userId).select("paidFor").lean();

    if (!userData || !userData.paidFor) {
      return {
        success: true,
        data: [],
      };
    }

    const confessions = await Confession.find({
        _id: { $in: userData.paidFor },
      })
        .select("content likesCount commentsCount tags") 
        .populate({
          path: "createdBy",
          select: "name gender college",
          populate: {
            path: "name",
            select: "name",
          },
        });
      
      
    return {
      success: true,
      data: confessions,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Something went wrong",
    };
  }
};
