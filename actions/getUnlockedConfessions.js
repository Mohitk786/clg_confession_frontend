"use server"

import {verifySession} from "@/lib/dal"
import {dbConnect} from "@/lib/dbConnect"
import User from "@/models/User"
import Confession from "@/models/Confession";
import "@/models/College"


export const getUnlockedConfessions = async () => {
  try {
    const { user } = await verifySession();

    if (!user || !user.userId) {
      return {
        success: false,
        message: "UNAUTHORIZED",
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
            path: "college",
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
