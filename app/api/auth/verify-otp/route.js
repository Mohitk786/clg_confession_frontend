import { NextResponse } from "next/server";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import "@/models/College"; 
import OTPVerification from "@/models/Otp";
import { createSession } from "@/lib/session";


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

      await createSession({
        name: user.name,
        userId: user._id,
        college: user.college.name || "",
        profileCompleted: user.profileCompleted,
        gender: user?.gender
      })

      const response = NextResponse.json({ message: "OTP verified successfully!", redirect: "/" });
      return response;
    }

    return NextResponse.json({ message: "OTP Verified Successfull" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
