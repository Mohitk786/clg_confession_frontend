import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Verification token is required." },
    );
  }

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() }, 
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Token is invalid or has expired. Please request a new verification link." },
    );
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  return NextResponse.json({
    success: true,
    message: "Your email has been successfully verified. You can now complete your registration.",
    email: user.email
  });
}
