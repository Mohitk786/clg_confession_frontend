import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import razorpayInstance from "@/utils/razorpay";
import { PAYMENTS } from "@/constants/payment";
import User from "@/models/User";
import Payment from "@/models/Payment";
import Confession from "@/models/Confession";
import { dbConnect } from "@/lib/dbConnect";

export const POST = async (req) => {
  try {
    const {user} = await verifySession();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const dbUser = await User.findById(user.userId);
    if (!dbUser)
      return NextResponse.json({ message: "User not found" }, { status: 400 });

    const {confessionId} = await req.json();
    if (!confessionId)
      return NextResponse.json({ message: "Confession ID is required" }, { status: 400 });

    await dbConnect();
    const confession = await Confession.findById(confessionId);
    if (!confession)
      return NextResponse.json({ message: "Confession not found" }, { status: 404 });

    if(confession.isAnonymous){
      return NextResponse.json({ message: "Poster doesn't allow the identity reveal" }, { status: 400 });
    }
     
    const order = await razorpayInstance.orders.create({
      amount: PAYMENTS.REVEAL_IDENTITY * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: dbUser.name,
        confessionId,
      },
    });


    const paymentData = {
      orderId: order.id,
      userId: dbUser._id,
      amount: Number(order.amount),
      currency: order.currency,
      status: order.status,
      receipt: order.receipt || "",
      notes: order.notes,
      confessionId
    };


    const payment = await Payment.create(paymentData);

    const data = {
      key : process.env.RAZORPAY_KEY_ID,
      order_id: payment.orderId,
      amount:payment.amount,
      currency:payment.currency,
    }

    return NextResponse.json({ data });

  } catch (err) {
    console.log("Error in creating payment", err);  
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
};
