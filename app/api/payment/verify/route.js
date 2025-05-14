
import { NextResponse } from "next/server";
import crypto from "crypto";
import razorpay from "@/utils/razorpay"; 
import { verifySession } from "@/lib/dal";
import {dbConnect} from "@/lib/dbConnect";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    const { user } = await verifySession();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();


    const secret = process.env.RAZORPAY_KEY_SECRET;

    

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    await dbConnect();

    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    const confessionId = razorpayOrder.notes.confessionId;

    await User.findByIdAndUpdate(
      user.userId,
      { $addToSet: { paidFor: confessionId } }, 
      { new: true }
    );

    return NextResponse.json({ success: true, confessionId });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
