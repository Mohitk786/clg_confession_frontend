import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";


export async function GET(req) {
  try {
    let {user} = await verifySession();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "UNAUTHORIZED"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "User fetched",
      data: user
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Error while getting user"
    }, { status: 500 });
  }
}
