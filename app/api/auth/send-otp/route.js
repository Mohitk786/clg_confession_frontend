import { NextResponse } from "next/server";
import { sendOTP } from "@/utils/sendOTP";

export async function POST(req) {
  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json({ error: "Phone number is required!" }, { status: 400 });
  }
  try {
    const response = await sendOTP(phone);
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
