import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { verifySession } from "@/lib/dal";
import User from "@/models/User";
import News from "@/models/News";
import College from "@/models/College";
import uploadCloudinaryBase64 from "@/utils/uploadCloudinary";
import { SP_REWARD } from "@/constants/spCost";

export async function POST(req) {
  try {
    const {user} = await verifySession();
    if (!user || !user.userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, tags, content, image } = await req.json();

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { success: false, message: "News title is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const foundUser = await User.findById(user.userId);
    if (!foundUser || !foundUser.college) {
      return NextResponse.json(
        { success: false, message: "User or college not found" },
        { status: 400 }
      );
    }

    let picture = null;
    if (image) {
      try {
        const uploadResult = await uploadCloudinaryBase64(image);
        picture = uploadResult || "";
      } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
          { success: false, message: "Error uploading image" },
          { status: 500 }
        );
      }
    }

    const news = new News({
      content: content?.trim() || "",
      title,
      createdBy: user.userId,
      tags,
      college: foundUser.college,
      ...(picture && { image: picture }),
    });

    await news.save();

    await College.findByIdAndUpdate(foundUser.college, {
      $push: { news: news._id },
    });

    foundUser.sp += SP_REWARD.POST_NEWS;
    await foundUser.save();

    return NextResponse.json(
      { success: true, message: "News created", data: news },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
