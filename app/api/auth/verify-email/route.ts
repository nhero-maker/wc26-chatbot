import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token || token.length < 10) {
    return NextResponse.redirect(new URL("/auth/verified?error=missing", req.url));
  }

  const baseUrl = process.env.N8N_BASE_URL?.trim();
  const webhookSecret = process.env.N8N_PLAYER_SECRET?.trim();
  if (!baseUrl || !webhookSecret) {
    return NextResponse.redirect(new URL("/auth/verified?error=config", req.url));
  }

  try {
    const response = await fetch(
      `${baseUrl}/wc26/player/verify-email?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: { "x-wc26-secret": webhookSecret },
      }
    );

    const data = await response.json();
    if (!response.ok || !data.success) {
      return NextResponse.redirect(new URL("/auth/verified?error=invalid", req.url));
    }

    return NextResponse.redirect(new URL("/auth/verified", req.url));
  } catch (error) {
    console.error("Verify email error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.redirect(new URL("/auth/verified?error=server", req.url));
  }
}
