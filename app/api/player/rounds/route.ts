import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = getSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: "Ei kirjautunut" }, { status: 401 });
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

  if (!body || typeof body !== "object") {
    return NextResponse.json({ success: false, error: "Virheellinen pyyntö" }, { status: 400 });
  }

  const { course_id, course_name_custom, date_played, total_shots, longest_drive, closest_to_pin, notes, handicap_at_time } = body as Record<string, unknown>;

  // Required fields
  if (!date_played || typeof date_played !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date_played)) {
    return NextResponse.json({ success: false, error: "Päivämäärä puuttuu tai on virheellinen" }, { status: 400 });
  }
  if (typeof total_shots !== "number" || total_shots < 18 || total_shots > 200) {
    return NextResponse.json({ success: false, error: "Lyöntimäärä puuttuu tai on virheellinen" }, { status: 400 });
  }
  if (typeof handicap_at_time !== "number" || handicap_at_time < 0 || handicap_at_time > 54) {
    return NextResponse.json({ success: false, error: "Tasoitus puuttuu tai on virheellinen" }, { status: 400 });
  }

  const sanitized: Record<string, unknown> = { date_played, total_shots, handicap_at_time };

  // Optional fields
  if (course_id !== undefined) {
    if (typeof course_id !== "number") return NextResponse.json({ success: false, error: "Virheellinen kenttä" }, { status: 400 });
    sanitized.course_id = course_id;
  }
  if (course_name_custom !== undefined) {
    if (typeof course_name_custom !== "string" || course_name_custom.length > 200) return NextResponse.json({ success: false, error: "Virheellinen kenttänimi" }, { status: 400 });
    sanitized.course_name_custom = course_name_custom.trim();
  }
  if (longest_drive !== undefined) {
    if (typeof longest_drive !== "number" || longest_drive < 0 || longest_drive > 500) return NextResponse.json({ success: false, error: "Virheellinen arvo" }, { status: 400 });
    sanitized.longest_drive = longest_drive;
  }
  if (closest_to_pin !== undefined) {
    if (typeof closest_to_pin !== "number" || closest_to_pin < 0 || closest_to_pin > 10000) return NextResponse.json({ success: false, error: "Virheellinen arvo" }, { status: 400 });
    sanitized.closest_to_pin = closest_to_pin;
  }
  if (notes !== undefined) {
    if (typeof notes !== "string" || notes.length > 1000) return NextResponse.json({ success: false, error: "Muistiinpano liian pitkä" }, { status: 400 });
    sanitized.notes = notes.trim();
  }

  try {
    const response = await fetch(`${baseUrl}/wc26/rounds/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-wc26-secret": webhookSecret,
        "Authorization": `Bearer ${session}`,
      },
      body: JSON.stringify(sanitized),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.ok ? 201 : response.status });
  } catch (error) {
    console.error("Create round error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 502 });
  }
}
