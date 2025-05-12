import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("clg_app_cookie")?.value;
  const isOnboardingPage = req.nextUrl.pathname === "/onboarding";

  if (isOnboardingPage && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !isOnboardingPage) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/confessions", "/campus-corner", "/onboarding"],
};
