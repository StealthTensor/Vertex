import { NextResponse, NextRequest } from "next/server";
import { isDevToken, DEV_USER_EMAIL } from "./utils/devMode";

export const runtime = "experimental-edge";

// frontend/src/middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;
  const isApp = request.nextUrl.pathname.startsWith("/app");
  const isAuth = request.nextUrl.pathname.startsWith("/auth");

  // If on auth page but already have valid session, go to dashboard
  if (isAuth && token && user) {
    return NextResponse.redirect(new URL("/app/timetable", request.url));
  }

  // If on app page but token/user missing or invalid, clear cookies and go to login
  if (isApp && (!token || !user)) {
    const res = NextResponse.redirect(new URL("/auth/login", request.url));
    res.cookies.delete("token");
    res.cookies.delete("user");
    return res;
  }

  // Root path logic
  if (request.nextUrl.pathname === "/") {
    if (token && user) {
      return NextResponse.redirect(new URL("/app/timetable", request.url));
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}


export const config = {
  // Only run middleware on /app routes and the home page
  matcher: ["/app/:path*", "/"],
};
