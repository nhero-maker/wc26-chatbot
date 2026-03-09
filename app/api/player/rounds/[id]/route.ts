import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = getSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: "Ei kirjautunut" }, { status: 401 });
  }

  const { id } = await params;
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
  const sanitized: Record<string, unknown> = {};

  if (course_id !== undefined) {
    if (typeof course_id !== "number") return NextResponse.json({ success: false, error: "Virheellinen kenttä" }, { status: 400 });
    sanitized.course_id = course_id;
  }
  if (course_name_custom !== undefined) {
    if (typeof course_name_custom !== "string" || course_name_custom.length > 200) return NextResponse.json({ success: false, error: "Virheellinen kenttänimi" }, { status: 400 });
    sanitized.course_name_custom = course_name_custom.trim();
  }
  if (date_played !== undefined) {
    if (typeof date_played !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date_played)) return NextResponse.json({ success: false, error: "Virheellinen päivämäärä" }, { status: 400 });
    sanitized.date_played = date_played;
  }
  if (total_shots !== undefined) {
    if (typeof total_shots !== "number" || total_shots < 18 || total_shots > 200) return NextResponse.json({ success: false, error: "Virheellinen lyöntimäärä" }, { status: 400 });
    sanitized.total_shots = total_shots;
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
  if (handicap_at_time !== undefined) {
    if (typeof handicap_at_time !== "number" || handicap_at_time < 0 || handicap_at_time > 54) return NextResponse.json({ success: false, error: "Virheellinen tasoitus" }, { status: 400 });
    sanitized.handicap_at_time = handicap_at_time;
  }

  const { holes } = body as Record<string, unknown>;
  if (holes !== undefined) {
    if (!Array.isArray(holes) || holes.length !== 18) {
      return NextResponse.json({ success: false, error: "Väyläkohtaiset tulokset vaativat 18 väylää" }, { status: 400 });
    }
    for (const h of holes) {
      if (!h || typeof h !== "object") return NextResponse.json({ success: false, error: "Virheellinen väylätieto" }, { status: 400 });
      const { hole_number, par, strokes } = h as Record<string, unknown>;
      if (typeof hole_number !== "number" || hole_number < 1 || hole_number > 18) return NextResponse.json({ success: false, error: "Virheellinen väylänumero" }, { status: 400 });
      if (typeof par !== "number" || par < 3 || par > 5) return NextResponse.json({ success: false, error: "Virheellinen par-arvo" }, { status: 400 });
      if (typeof strokes !== "number" || strokes < 1 || strokes > 20) return NextResponse.json({ success: false, error: "Virheellinen lyöntimäärä väylällä" }, { status: 400 });
    }
    sanitized.holes = holes;
  }

  try {
    const response = await fetch(`${baseUrl}/wc26/rounds/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-wc26-secret": webhookSecret,
        "Authorization": `Bearer ${session}`,
      },
      body: JSON.stringify({ roundId: id, ...sanitized }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Update round error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 502 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = getSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: "Ei kirjautunut" }, { status: 401 });
  }

  const { id } = await params;
  const baseUrl = process.env.N8N_BASE_URL?.trim();
  const webhookSecret = process.env.N8N_PLAYER_SECRET?.trim();
  if (!baseUrl || !webhookSecret) {
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 500 });
  }

  try {
    const response = await fetch(`${baseUrl}/wc26/rounds/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-wc26-secret": webhookSecret,
        "Authorization": `Bearer ${session}`,
      },
      body: JSON.stringify({ roundId: id }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Delete round error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Palvelinvirhe" }, { status: 502 });
  }
}
