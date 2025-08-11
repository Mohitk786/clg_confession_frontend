"use server";

import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { generateToken } from "@/lib/auth";
import { sendEmail } from "@/lib/send-email";
import { redirect } from "next/navigation";
import { SP_REWARD } from "@/constants/spCost";

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

export async function createProfile({ email }) {
  if (!email) throw new Error("Email is required!");

  await dbConnect();

  let user = await User.findOne({ email });
  if (!user) {
    const verificationToken = await generateToken();

    user = new User({
      email,
      verificationToken,
      isVerified: false,
    });

    await user.save();

    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Welcome! Please Verify Your Email 🎉",
      html: `
        <h2>Welcome to Our Community 🎉</h2>
        <p>We're excited to have you! Please click the link below to verify your email and continue:</p>
        <a href="${verificationLink}" style="color: white; background: #f43f5e; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Verify Email</a>
        <p>If the button doesn't work, copy this link into your browser:</p>
        <p>${verificationLink}</p>
      `,
    });
  }

  return true;
}

export async function register(formData) {
  const email = formData.get("email");
  const name = formData.get("name");
  const college = formData.get("college");
  const gender = formData.get("gender");
  const relationshipStatus = formData.get("relationshipStatus");
  const referrer = formData.get("referCode");
  const phone = formData.get("phone");
  const policyAccepted = formData.get("policyAccepted") === "on";

  if (
    !name ||
    !college ||
    !gender ||
    !relationshipStatus ||
    !policyAccepted ||
    !email
  ) {
    throw new Error("Please fill in all required fields and accept the policy");
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const referCode = await generateReferCode(name, phone, college);

    user = {
      name,
      college,
      gender,
      relationshipStatus,
      referCode,
      ...(phone && { phone }),
      policyAccepted,
      createdAt: new Date().toISOString(),
    };

    await user.save();

    if (referrer) {
      const referrerUser = await User.findOne({ referCode: referrer });
      if (referrerUser) {
        referrerUser = {
          ...referrerUser,
          sp: sp + SP_REWARD.REFER
        }
        await referrerUser.save();
      }
    }

    redirect("/welcome");
  } catch (error) {
    console.error("Error creating profile:", error);
    throw new Error("Failed to create profile. Please try again.");
  }
}
