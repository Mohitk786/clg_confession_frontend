"use server";

import User from "@/models/User";
import { redirect } from "next/navigation";
import College from "@/models/College";
import { dbConnect } from "@/lib/dbConnect";
import { createSession } from "@/lib/session";

export async function createProfile(formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const collegeId = formData.get("college");
  const gender = formData.get("gender");
  const referCode = formData.get("referCode");
  const hookupInterest = formData.get("hookupInterest") === "on";

  if (!name || !phone || !gender || !collegeId) {
    throw new Error("Missing required fields!");
  }
  await dbConnect();
  const college = await College.findById(collegeId);
  if (!college) {
    throw new Error("Invalid college ID!");
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      throw new Error("User already exists!");
    }

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


    await newUser.save();


    await createSession({
      name,
      userId: newUser._id,
      profileCompleted: newUser.profileCompleted,
      college: college.name,
      gender
    })

    redirect("/");

  } catch (error) {
    if (error?.message === "NEXT_REDIRECT") redirect("/");
    throw new Error(error?.message || "Something went wrong");

  }
}
