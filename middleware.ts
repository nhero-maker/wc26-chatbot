import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("wc26_session")?.value;
  if (!token) {
    const loginUrl = new URL("/signin", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes require the admin cookie in addition to a session.
  // API routes return JSON 403; UI routes redirect to dashboard.
  const path = req.nextUrl.pathname;
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    const adminToken = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!adminToken) {
      if (path.startsWith("/api/")) {
        return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leaderboards",
    "/tournament",
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
