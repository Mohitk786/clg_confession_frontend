import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";


export async function GET(req) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "UNAUTHORIZED"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "User fetched",
      data: req.user
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Error while getting user"
    }, { status: 500 });
  }
}
