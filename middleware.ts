import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface ExtendedNextRequest extends NextRequest {
    user?: any;
}

export async function middleware(req:ExtendedNextRequest) {
  const token = req.cookies.get("clg_app_cookie")?.value;
  console.log("Token from middleware:", token);
  if (!token) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/confessions", "/campus-corner"], 
};
