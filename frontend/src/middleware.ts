import { NextResponse, NextRequest } from "next/server";
import { isDevToken, DEV_USER_EMAIL } from "./utils/devMode";

export const runtime = "experimental-edge";

export function middleware(request: NextRequest) {
  // ✅ CORRECT WAY: Read cookies directly from the request
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;

  // 1. Handle Dev Mode
  if (token && isDevToken(token)) {
    if (!user) {
      const response = NextResponse.next();
      response.cookies.set("user", DEV_USER_EMAIL, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        path: "/",
      });
      return response;
    }
    return NextResponse.next();
  }
  
  // 2. Protect App Routes
  // If the user tries to visit /app/* without a token OR user cookie, kick them out.
  if (request.nextUrl.pathname.startsWith("/app")) {
    if (!token || !user) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // 3. Redirect Root "/" to Dashboard if logged in
  if (request.nextUrl.pathname === "/") {
    if (token && user) {
      return NextResponse.redirect(new URL("/app/timetable", request.url));
    }
    // Otherwise go to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on /app routes and the home page
  matcher: ["/app/:path*", "/"],
};
