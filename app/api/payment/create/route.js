import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import razorpayInstance from "@/utils/razorpay";
import { PAYMENTS } from "@/constants/payment";
import User from "@/models/User";
import Payment from "@/models/Payment";
import UnlockedConfessions from "@/models/UnlockedConfessions";

export const POST = async (req) => {
  try {
    const user = await getAuthUser(req);
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const dbUser = await User.findById(user.userId);
    if (!dbUser)
      return NextResponse.json({ message: "User not found" }, { status: 400 });

    const {confessionId} = await req.json();
    if (!confessionId)
      return NextResponse.json({ message: "Confession ID is required" }, { status: 400 });

    const order = await razorpayInstance.orders.create({
      amount: PAYMENTS.ADD_TO_WALLET * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: dbUser.name,
      },
      confessionId,
    });

    const paymentData = {
      userId: dbUser._id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      receipt: order.receipt || "",
      notes: order.notes,
      confessionId
    };

    const payment = Payment.create(paymentData);
    await UnlockedConfessions.create({
      userId: dbUser._id,
      confessionId,
    });

    return NextResponse.json({ ...payment, keyId: process.env.RAZORPAY_KEY_ID });

  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
};
