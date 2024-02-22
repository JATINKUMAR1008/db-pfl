import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utlis/verify-token";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  if (token && pathname.includes("auth")) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  if (!token && !pathname.includes("auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
