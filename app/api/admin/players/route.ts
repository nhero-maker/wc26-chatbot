import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

async function handleRequest(req: NextRequest) {
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
    const body = await req.json();
    const response = await fetch(`${baseUrl}/wc26/admin/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-wc26-secret": webhookSecret,
        "Authorization": `Bearer ${session}`,
      },
      body: JSON.stringify({ _method: req.method, ...body }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Admin players error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

export async function PATCH(req: NextRequest) {
  return handleRequest(req);
}
