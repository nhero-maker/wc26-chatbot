import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = getSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: "Ei kirjautunut" }, { status: 401 });
  }

  const baseUrl = process.env.N8N_BASE_URL?.trim();
  const webhookSecret = process.env.N8N_PLAYER_SECRET?.trim();
  if (!baseUrl || !webhookSecret) {
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 500 });
  }

  try {
    const response = await fetch(`${baseUrl}/wc26/leaderboards`, {
      method: "GET",
      headers: {
        "x-wc26-secret": webhookSecret,
        "Authorization": `Bearer ${session}`,
      },
    });

    if (response.status === 401) {
      return NextResponse.json({ success: false, error: "Istunto vanhentunut" }, { status: 401 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Leaderboards error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 502 });
  }
}
