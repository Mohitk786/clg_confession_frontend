import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import College from "@/models/College";
import { SP_REWARD } from "@/constants/spCost";

function getRandomString(length = 2) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function generateReferCode(name, phone, collegeId) {
  const usernamePart = name?.slice(0, 2).toUpperCase() || "XX";
  const phonePart = phone?.slice(-2) || "00";
  const collegePart = collegeId?.slice(-2).toUpperCase() || "YY";

  let code;
  do {
    const randomPart = getRandomString(2);
    code = `${usernamePart}${phonePart}${collegePart}${randomPart}`;
  } while (await User.findOne({ referCode: code }));

  return code;
}

export async function POST(req) {
  await dbConnect();

  const { name, phone, collegeId, gender, referCode } = await req.json();

  if (!name || !phone || !gender || !collegeId) {
    return NextResponse.json({ error: "Missing required fields!" }, { status: 400 });
  }

  const college = await College.findById(collegeId);
  if (!college) {
    return NextResponse.json({ error: "Invalid college ID!" }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists!" }, { status: 409 });
    }

    // Reward referrer
    if (referCode) {
      const referringUser = await User.findOne({ referCode });
      if (referringUser) {
        referringUser.sp += SP_REWARD.REFER;
        await referringUser.save();
      }
    }

    const code = await generateReferCode(name, phone, collegeId);

    const newUser = new User({
      name,
      phone,
      gender,
      college: collegeId,
      referCode: code,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        name,
        userId: newUser._id,
        college: college?.name,
        profileCompleted: false,
      },
      process.env.JWT_SECRET
    );

    const response = NextResponse.json(
      {
        message: "Profile created successfully!",
        data: {
          name,
          college: college?.name,
        },
      },
      { status: 201 }
    );

    response.cookies.set("clg_app_cookie", token, {
      secure: process.env.MODE === "PRODUCTION",
      sameSite: "strict",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
