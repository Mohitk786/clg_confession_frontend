import { NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import UnlockedConfessions from "@/models/UnlockedConfessions";
import { dbConnect } from "@/lib/dbConnect";

export const POST = async (req) => {
  try {
    await dbConnect();

    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { msg: "Webhook signature is invalid" },
        { status: 400 }
      );
    }

    const isValid = validateWebhookSignature(
      rawBody,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET || ""
    );

    if (!isValid) {
      return NextResponse.json(
        { msg: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    const body = JSON.parse(rawBody);
    const paymentDetails = body.payload.payment.entity;

    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });

    if (!payment) {
      return NextResponse.json({ msg: "Payment not found" }, { status: 404 });
    }

    payment.status = paymentDetails.status;
    payment.notes = paymentDetails.notes;
    await payment.save();

    await UnlockedConfessions.updateOne(
      { userId: payment.userId, confessionId: paymentDetails?.confessionId },
      {
        $set: {
          canView: true,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ msg: "Webhook received successfully" });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 500 });
  }
};
