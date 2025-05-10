import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { name, phone, collegeId, gender } = await req.json();

  if (!name || !phone || !gender || !collegeId) {
    return NextResponse.json({ error: "Missing required fields!" }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists!" }, { status: 409 });
    }


    const username = name.slice(0, 3) + Math.floor(Math.random() * 1000) + phone.slice(-4);
    const newUser = new User({ name, phone, gender, college: collegeId, username });
    await newUser.save();

    const token = jwt.sign({ gender, name, username, userId: newUser._id}, process.env.JWT_SECRET);

    const response = NextResponse.json({ message: "Profile created successfully!" }, { status: 201 });

    response.cookies.set("clg_app_cookie", token, {
      secure: process.env.MODE === "PRODUCTION",
      sameSite: "strict",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
