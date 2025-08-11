import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  user.isVerified = true;
  await user.save();

  return NextResponse.redirect(new URL(`/register?email=${user.email}`, request.url));
}
