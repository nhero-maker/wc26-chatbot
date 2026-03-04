import { NextRequest, NextResponse } from "next/server";

// Rate limit: 5 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // Return 200 even when rate limited \u2014 don't reveal rate limiting to potential attackers
  if (isRateLimited(ip)) {
    return NextResponse.json({ success: true });
  }

  const baseUrl = process.env.N8N_BASE_URL;
  const webhookSecret = process.env.N8N_PLAYER_SECRET;
  if (!baseUrl || !webhookSecret) {
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Virheellinen pyynt\u00f6" }, { status: 400 });
  }

  const { email } = body as Record<string, unknown>;
  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ success: false, error: "S\u00e4hk\u00f6posti puuttuu" }, { status: 400 });
  }

  try {
    // Fire and forget \u2014 always return 200 to avoid revealing if email exists
    fetch(`${baseUrl}/wc26/auth/signin-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-wc26-secret": webhookSecret,
      },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signin request error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 502 });
  }
}
