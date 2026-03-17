import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "wc26_session";
export const ADMIN_COOKIE = "wc26_admin";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Compute HMAC of sessionToken using ADMIN_COOKIE_SECRET.
// An attacker who knows their session token cannot forge the admin cookie
// without also knowing this server-side secret.
function computeAdminToken(sessionToken: string): string {
  const secret = process.env.ADMIN_COOKIE_SECRET ?? "";
  return crypto.createHmac("sha256", secret).update(sessionToken).digest("hex");
}

export function getSession(req: NextRequest): string | null {
  return req.cookies.get(SESSION_COOKIE)?.value ?? null;
}

export function isAdmin(req: NextRequest): boolean {
  const sessionToken = req.cookies.get(SESSION_COOKIE)?.value;
  const adminToken = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!sessionToken || !adminToken) return false;
  return adminToken === computeAdminToken(sessionToken);
}

export function setSessionCookie(res: NextResponse, token: string): void {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export function setAdminCookie(res: NextResponse, sessionToken: string): void {
  res.cookies.set(ADMIN_COOKIE, computeAdminToken(sessionToken), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  res.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
}
