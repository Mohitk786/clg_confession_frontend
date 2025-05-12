import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await req.cookies.get("clg_app_cookie")?.value;
  const path = req.nextUrl.pathname;

  const isOnboardingPage = path === "/onboarding";
  const isProtectedRoute = ["/", "/confessions", "/campus-corner"].includes(path);

  if (token && isOnboardingPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/confessions", "/campus-corner", "/onboarding"], 
};
