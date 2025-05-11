import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import OTPVerification from "@/models/Otp";


export async function POST(req) {
  await dbConnect();
  const { phone, otp } = await req.json();

  if (!phone || !otp) {
    return NextResponse.json({ error: "Phone number and OTP are required!" });
  }


  try {
    const otpRecord = await OTPVerification.findOne({ phone: phone, otp: otp });
    if (!otpRecord) {
      return NextResponse.json({ error: "Invalid OTP." });
    }

    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json({ error: "OTP has expired." });
    }

    otpRecord.verified = true;
    await otpRecord.save();

    const user = await User.findOne({ phone }).populate("college", "name");
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          userId: user._id,
          college: user.college.name || "",
          profileCompleted: user.profileCompleted,
        },
        process.env.JWT_SECRET
      );

      const response = NextResponse.json({ message: "OTP verified successfully!", redirect: "/" });

      response.cookies.set("clg_app_cookie", token, {
        secure: process.env.MODE === "PRODUCTION",
        sameSite: "strict",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ message: "OTP Verified Successfull" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
