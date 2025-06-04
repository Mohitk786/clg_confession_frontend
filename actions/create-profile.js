"use server";

import User from "@/models/User";
import { redirect } from "next/navigation";
import College from "@/models/College";
import { dbConnect } from "@/lib/dbConnect";
import { createSession } from "@/lib/session";

function getRandomString(length = 2) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
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

export async function createProfile(formData) {
  console.log("Creating profile with data:")
  const name = formData.get("name");
  const phone = formData.get("phone");
  const collegeId = formData.get("college");
  const gender = formData.get("gender");
  const referCode = formData.get("referCode");
  const hookupInterest = formData.get("hookupInterest") === "on";
  const relationshipStatus = formData.get("relationshipStatus");
  const policyAccepted = formData.get("policyAccepted") === "on";


  if (!policyAccepted) {
      throw new Error("Please accept the policy!")
  }


  if (!name || !phone || !gender || !collegeId) {
      throw new Error("Please fill all the fields!")
  }
  await dbConnect();

 
  const college = await College.findById(collegeId);
  if (!college) {
    throw new Error("College not found!")
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      if (existingUser.college.toString() !== collegeId) {
        throw new Error("You are already registered with a different college!")
      }
    }
    const code = await generateReferCode(name, phone, collegeId);
      
    let updatedPhone = "+91" + phone;
    const newUser = new User({
      name,
      phone: updatedPhone,
      gender,
      college: collegeId,
      referCode:code,
      policyAccepted,
      relationshipStatus,
      ...(hookupInterest ? { interestedInHookup: hookupInterest } : {}),
    });

    await newUser.save();

    if (referCode) {
      const referringUser = await User.findOne({ referCode });
      if (referringUser) {
        referringUser.sp += SP_REWARD.REFER;
        await referringUser.save();
      }
    }

    await createSession({
      name,
      userId: newUser._id,
      profileCompleted: newUser.profileCompleted,
      college: college.name,
      gender,
    });

    redirect("/");
  } catch (error) {
    if (error?.message === "NEXT_REDIRECT") redirect("/");
    throw new Error(error?.message || "Something went wrong");
  }
}
