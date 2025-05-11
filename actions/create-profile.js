"use server";

import User from "@/models/User";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import College from "@/models/College";

export async function createProfile(formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const collegeId = formData.get("college");
  const gender = formData.get("gender");
  const hookupInterest = formData.get("hookupInterest") === "on";

  if (!name || !phone || !gender || !collegeId) {
    throw new Error("Missing required fields!");
  }

  const college = await College.findById(collegeId);
  if (!college) {
    throw new Error("Invalid college ID!");
  }

  console.log("College found:", college);

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      throw new Error("User already exists!");
    }

    console.log("No existing user found, creating new user...");

    const username =
      name.slice(0, 3).toLowerCase() +
      Math.floor(Math.random() * 1000) +
      phone.slice(-4);

    let updatedPhone = "+91" + phone;
    const newUser = new User({
      name,
      phone: updatedPhone,
      gender,
      college: collegeId,
      username,
      hookupInterest,
    });

    console.log("New user created:", newUser);

    await newUser.save();

    const token = jwt.sign(
      {
        gender,
        name,
        username,
        userId: newUser._id,
        collegeName: college.name,
        logoUrl: college.logoUrl,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set HTTP-only cookie using Next.js `cookies` API
    const cookieStore = await cookies();
    await cookieStore.set("clg_app_cookie", token, {
      httpOnly: true,
      secure: process.env.MODE === "PRODUCTION",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    redirect("/");

  } catch (error) {
    if (error?.message === "NEXT_REDIRECT") redirect("/");
    console.error("Error creating profile:", error);
    throw new Error(error?.message || "Something went wrong");

  }
}
