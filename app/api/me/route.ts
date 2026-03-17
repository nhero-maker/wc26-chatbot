import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { WC26_TOURNAMENT_PLAYERS } from "@/lib/wc26-data";

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
    const response = await fetch(`${baseUrl}/wc26/dashboard`, {
      method: "GET",
      headers: {
        "x-wc26-secret": webhookSecret,
        "Authorization": `Bearer ${session}`,
      },
    });

    if (response.status === 401) {
      return NextResponse.json({ success: false, error: "Ei kirjautunut" }, { status: 401 });
    }

    const data = await response.json();
    if (!data?.player?.name) {
      return NextResponse.json({ success: false, error: "Ei löydy" }, { status: 404 });
    }

    const name: string = data.player.name;
    const tournamentPlayer = WC26_TOURNAMENT_PLAYERS.find((p) => p.name === name);
    const team = tournamentPlayer?.team ?? null;

    return NextResponse.json({ success: true, data: { name, team } });
  } catch {
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 502 });
  }
}
