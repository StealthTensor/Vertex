import { NextResponse, NextRequest } from "next/server";
import { getCookie } from "./utils/getCookieServer";
import { isDevToken, DEV_USER_EMAIL } from "./utils/devMode";

export const runtime = "experimental-edge";

export async function middleware(request: NextRequest) {
  const cookie = await getCookie();
  
  // Allow dev tokens in any environment
  if (isDevToken(cookie.token)) {
    if (!cookie.user) {
      const response = NextResponse.next();
      response.cookies.set("user", DEV_USER_EMAIL, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        path: "/",
      });
      return response;
    }
    return NextResponse.next();
  }
  
  // Redirect to login if no token
  if (!cookie.token || !cookie.user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/"],
};
