import { NextRequest, NextResponse } from "next/server";

// Rate limit: 5 registration attempts per minute per IP
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

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Liian monta pyyntöä. Odota hetki." },
      { status: 429 }
    );
  }

  const baseUrl = process.env.N8N_BASE_URL?.trim();
  const webhookSecret = process.env.N8N_PLAYER_SECRET?.trim();
  if (!baseUrl || !webhookSecret) {
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Virheellinen pyyntö" }, { status: 400 });
  }

  const { name, email, phone, handicap } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ success: false, error: "Nimi puuttuu tai on liian lyhyt" }, { status: 400 });
  }
  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ success: false, error: "Sähköposti puuttuu tai on virheellinen" }, { status: 400 });
  }
  if (!phone || typeof phone !== "string" || phone.trim().length < 5) {
    return NextResponse.json({ success: false, error: "Puhelinnumero puuttuu" }, { status: 400 });
  }
  if (typeof handicap !== "number" || handicap < 0 || handicap > 54) {
    return NextResponse.json({ success: false, error: "Tasoitus puuttuu tai on virheellinen (0–54)" }, { status: 400 });
  }

  try {
    const appBaseUrl = new URL(req.url).origin;
    const response = await fetch(`${baseUrl}/wc26/player/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-wc26-secret": webhookSecret,
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        handicap,
        base_url: appBaseUrl,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.ok ? 200 : response.status });
  } catch (error) {
    console.error("Register error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { success: false, error: "Palvelinvirhe. Yritä uudelleen." },
      { status: 502 }
    );
  }
}
