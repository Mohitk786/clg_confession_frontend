"use server"

import { createSession, deleteSession, encrypt } from '@/lib/session'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import User from "@/models/User";
import { generateToken } from "@/lib/auth";
import { sendEmail } from "@/lib/send-email";
import { SP_REWARD } from "@/constants/spCost";
import { registerSchema } from "@/lib/validations/auth";
import { z } from 'zod';
import { getRandomString } from '@/utils/helper';
import "@/models/College"; 
 
export async function logout() {
  await deleteSession()
  redirect('/login')
}


interface GenerateReferCodeProps {
  name: string;
  phone?: string;
  collegeId: string;
}

async function generateReferCode({ name, phone, collegeId }: GenerateReferCodeProps) {
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

export async function register(formData:z.infer<typeof registerSchema>) {
  const {
    email,
    name,
    college,
    gender,
    relationshipStatus,
    password,
    confirmPassword,
    referCode: referrer,
    phone,
    policyAccepted,
  } = formData;

  if (
    !name ||
    !college ||
    !gender ||
    !relationshipStatus ||
    !policyAccepted ||
    !email ||
    !password
  ) {
    return {
      success: false,
      message: "Please fill in all required fields and accept the policy",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match",
    };
  }

  try {
    const referCode = await generateReferCode({ name, phone, collegeId: college });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      name,
      college,
      gender,
      password:hashedPassword,
      relationshipStatus,
      referCode,
      isVerified: false,
      verificationToken: await generateToken(),
      verificationTokenExpires: Date.now() + 1000 * 60 * 60, // 1 hour
    });

    await user.save();

    if (referrer) {
      const referrerUser = await User.findOne({ referCode: referrer });
      if (!referrerUser) {
        return {
          success: false,
          message: "Invalid referral code",
        };
      }
      referrerUser.sp = referrerUser.sp + SP_REWARD.REFER;
      await referrerUser.save();
    }

    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${user.verificationToken}`;

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

    return {
      success: true,
      message: "Profile created successfully. Please verify your email.",
    };
  } catch (error) {
    console.error("Error creating profile:", error);
  }
}


interface LoginUserProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

import { dbConnect } from "@/lib/dbConnect";

interface LoginUserProps {
  email: string;
  password: string;
}

export async function loginUser(formData: LoginUserProps) {
  const { email, password } = formData;

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  await dbConnect();
  const user = await User.findOne({ email }).select("+password").populate("college");

  if (!user) return { success: false, message: "User not found" };

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return { success: false, message: "Invalid password" };


  await createSession({
    name: user.name,
    userId: user._id,
    college: user.college?.name || "",
    profileCompleted: user.profileCompleted,
    gender: user?.gender
  })

  return { success: true, message: "Login successful" }; 
}


