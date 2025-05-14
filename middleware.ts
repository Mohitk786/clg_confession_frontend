import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const protectedRoutes = [
  "/",
  "/confessions",
  "/campus-corner",
  "/profile",
  "/notifications",
  "/unlocked-confessions",
];
const publicRoutes = ["/onboarding"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("clg_app_cookie")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL("/onboarding", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.user &&
    req.nextUrl.pathname.startsWith("/onboarding")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
