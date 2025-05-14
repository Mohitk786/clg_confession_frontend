import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Confession from "@/models/Confession";
import User from "@/models/User";
import College from "@/models/College";
import { verifySession } from "@/lib/dal";
import Notification from "@/models/Notification";
import { Notifications_Types } from "@/constants/data";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const {user} = await verifySession();
 
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 404 }
      );
    }

    await dbConnect();
    const body = await req.json();
    const { content, taggedUserId:targetUser, tags, isAnonymous, spForRevealIdentity } =
      body;
  
    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, message: "Confession content is required" },
        { status: 400 }
      );
    }

    const foundUser = await User.findById(user.userId);

    if (!foundUser){
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
     

    if(!isAnonymous){
      const profileCompleted = foundUser.profileCompleted;
      if(!profileCompleted){
        return NextResponse.json(
          { success: false, message: "Please complete your profile first" },
          { status: 400 }
        );
      }
    }

    const confession = new Confession({
      content: content.trim(),
      createdBy: user.userId,
      college: foundUser.college,
      tags: tags || [],
      isAnonymous: isAnonymous || false,
      ...(targetUser && { targetUser}),
      ...(!isAnonymous && { spForRevealIdentity }),
      ...(targetUser && { hasTargetUser: true }),
    });

    foundUser.sp = (foundUser.sp || 0) + 5;
    await Promise.all([confession.save(), foundUser.save()]);


    if(targetUser && !isAnonymous && targetUser !== user.userId){
      await Notification.create({
        from: user.userId,
        to: targetUser,
        type: Notifications_Types.CONFESSION_POSTED,
        message: `Anonymous has posted a confession for you`,
        refModel: "Confession",
        refId: confession._id,
        data: {
          content: content.trim(),
          tags
        },
      })
    }

    await College.findByIdAndUpdate(foundUser.college, {
      $push: { confessions: confession._id },
    });

    revalidatePath('/')

    return NextResponse.json(
      { success: true, message: "Confession created", data: confession },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating confession:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
