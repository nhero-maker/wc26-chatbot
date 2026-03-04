import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
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

  const { token } = body as Record<string, unknown>;
  if (!token || typeof token !== "string" || token.length < 10) {
    return NextResponse.json({ success: false, error: "Token puuttuu" }, { status: 400 });
  }

  try {
    const response = await fetch(`${baseUrl}/wc26/auth/signin-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-wc26-secret": webhookSecret,
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Linkki on vanhentunut tai jo k\u00e4ytetty." },
        { status: 401 }
      );
    }

    const data = await response.json();
    if (!data.success || !data.data?.sessionToken) {
      return NextResponse.json(
        { success: false, error: "Kirjautuminen ep\u00e4onnistui." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({
      success: true,
      data: { player: data.data.player },
    });
    setSessionCookie(res, data.data.sessionToken);
    return res;
  } catch (error) {
    console.error("Signin verify error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { success: false, error: "Palvelinvirhe. Yrit\u00e4 uudelleen." },
      { status: 502 }
    );
  }
}
