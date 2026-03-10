"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getTournament,
  signOut,
  type TournamentData,
  type TournamentEvent,
  type Matchup,
  type BonusPointEntry,
} from "@/lib/player";

type Tab = "events" | "matchups" | "bonus" | "players";

const MONTH_OPTIONS = [
  { value: "2026-01", label: "Tammikuu" },
  { value: "2026-02", label: "Helmikuu" },
  { value: "2026-03", label: "Maaliskuu" },
  { value: "2026-04", label: "Huhtikuu" },
  { value: "2026-05", label: "Toukokuu" },
  { value: "2026-06", label: "Kesäkuu" },
];

const BONUS_TYPES = ["mvp", "birdman", "skill_drive", "skill_pin"] as const;

// ─── Shared inline styles ────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: "8px 12px",
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  color: "var(--text)",
  width: "100%",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none" as const,
  cursor: "pointer",
};

const btnPrimary: React.CSSProperties = {
  background: "var(--blue-mid)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--radius)",
  padding: "8px 20px",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "13px",
  letterSpacing: "0.08em",
  cursor: "pointer",
  textTransform: "uppercase",
};

const btnDanger: React.CSSProperties = {
  background: "rgba(220,38,38,0.15)",
  color: "var(--red-bright)",
  border: "1px solid rgba(220,38,38,0.25)",
  borderRadius: "var(--radius)",
  padding: "6px 12px",
  fontFamily: "var(--font-mono)",
  fontWeight: 700,
  fontSize: "10px",
  letterSpacing: "0.08em",
  cursor: "pointer",
  textTransform: "uppercase",
};

const btnOutline: React.CSSProperties = {
  background: "none",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: "6px 12px",
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  letterSpacing: "0.1em",
  color: "var(--text-muted)",
  cursor: "pointer",
  textTransform: "uppercase",
};

const cellStyle: React.CSSProperties = {
  padding: "8px 12px",
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  color: "var(--text)",
  borderBottom: "1px solid var(--border)",
};

const thStyle: React.CSSProperties = {
  ...cellStyle,
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  letterSpacing: "0.1em",
  color: "var(--text-muted)",
  textTransform: "uppercase" as const,
  fontWeight: 700,
};

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  padding: "24px",
  marginBottom: "20px",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [data, setData] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("events");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  // ─── Event form state ──────────────────────────────────────────────────────
  const [editingEvent, setEditingEvent] = useState<TournamentEvent | null>(null);
  const [eventForm, setEventForm] = useState({
    course_name: "",
    event_month: "2026-01",
    format: "fourball" as "fourball" | "singles",
    course_settings: {} as Record<string, string>,
  });

  // ─── Matchup form state ────────────────────────────────────────────────────
  const [editingMatchup, setEditingMatchup] = useState<Matchup | null>(null);
  const [matchupForm, setMatchupForm] = useState({
    event_id: 0,
    t1p1: "",
    t1p2: "",
    t2p1: "",
    t2p2: "",
    team1_points: 0,
    team2_points: 0,
  });

  // ─── Bonus form state ─────────────────────────────────────────────────────
  const [bonusForm, setBonusForm] = useState({
    player: "",
    event_id: 0,
    type: "mvp" as BonusPointEntry["type"],
    points: 1,
  });

  // ─── Player email state ─────────────────────────────────────────────────
  const [playerEmails, setPlayerEmails] = useState<Record<number, string>>({});
  const [savingPlayerId, setSavingPlayerId] = useState<number | null>(null);

  // ─── Load data ─────────────────────────────────────────────────────────────
  const loadData = async () => {
    try {
      const res = await getTournament();
      if (res.success && res.data) {
        setData(res.data);
      } else {
        if (res.error?.includes("kirjautunut")) {
          router.replace("/signin");
          return;
        }
        setError(res.error ?? "Lataus epäonnistui.");
      }
    } catch {
      setError("Verkkovirhe.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [router]);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  function flash(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 3000);
  }

  // ─── Event CRUD ────────────────────────────────────────────────────────────

  function resetEventForm() {
    setEditingEvent(null);
    setEventForm({
      course_name: "",
      event_month: "2026-01",
      format: "fourball",
      course_settings: {},
    });
  }

  function startEditEvent(e: TournamentEvent) {
    setEditingEvent(e);
    setEventForm({
      course_name: e.course_name,
      event_month: e.event_month,
      format: e.format,
      course_settings: e.course_settings ? { ...e.course_settings } : {},
    });
  }

  async function saveEvent() {
    setSaving(true);
    try {
      const method = editingEvent ? "PATCH" : "POST";
      const body = editingEvent
        ? { id: editingEvent.id, ...eventForm }
        : eventForm;
      const res = await fetch("/api/admin/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        flash(editingEvent ? "Tapahtuma päivitetty." : "Tapahtuma luotu.");
        resetEventForm();
        await loadData();
      } else {
        flash(json.error ?? "Virhe tallennuksessa.");
      }
    } catch {
      flash("Verkkovirhe.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEvent(id: number) {
    if (!confirm("Poista tapahtuma?")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (json.success) {
        flash("Tapahtuma poistettu.");
        await loadData();
      } else {
        flash(json.error ?? "Virhe poistossa.");
      }
    } catch {
      flash("Verkkovirhe.");
    } finally {
      setSaving(false);
    }
  }

  // ─── Matchup CRUD ─────────────────────────────────────────────────────────

  function resetMatchupForm() {
    setEditingMatchup(null);
    setMatchupForm({
      event_id: data?.events[0]?.id ?? 0,
      t1p1: "",
      t1p2: "",
      t2p1: "",
      t2p2: "",
      team1_points: 0,
      team2_points: 0,
    });
  }

  function startEditMatchup(m: Matchup) {
    setEditingMatchup(m);
    setMatchupForm({
      event_id: m.event_id,
      t1p1: m.t1p1,
      t1p2: m.t1p2 ?? "",
      t2p1: m.t2p1,
      t2p2: m.t2p2 ?? "",
      team1_points: m.team1_points,
      team2_points: m.team2_points,
    });
  }

  async function saveMatchup() {
    setSaving(true);
    try {
      const method = editingMatchup ? "PATCH" : "POST";
      const body = editingMatchup
        ? { id: editingMatchup.id, ...matchupForm }
        : matchupForm;
      const res = await fetch("/api/admin/matchups", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        flash(editingMatchup ? "Pari päivitetty." : "Pari luotu.");
        resetMatchupForm();
        await loadData();
      } else {
        flash(json.error ?? "Virhe tallennuksessa.");
      }
    } catch {
      flash("Verkkovirhe.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteMatchup(id: number) {
    if (!confirm("Poista pari?")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/matchups", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (json.success) {
        flash("Pari poistettu.");
        await loadData();
      } else {
        flash(json.error ?? "Virhe poistossa.");
      }
    } catch {
      flash("Verkkovirhe.");
    } finally {
      setSaving(false);
    }
  }

  // ─── Bonus CRUD ───────────────────────────────────────────────────────────

  function resetBonusForm() {
    setBonusForm({
      player: "",
      event_id: data?.events[0]?.id ?? 0,
      type: "mvp",
      points: 1,
    });
  }

  async function saveBonus() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/bonus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bonusForm),
      });
      const json = await res.json();
      if (json.success) {
        flash("Bonuspiste lisätty.");
        resetBonusForm();
        await loadData();
      } else {
        flash(json.error ?? "Virhe tallennuksessa.");
      }
    } catch {
      flash("Verkkovirhe.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteBonus(entry: BonusPointEntry) {
    if (!confirm("Poista bonuspiste?")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/bonus", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player: entry.player,
          event_id: entry.event_id,
          type: entry.type,
        }),
      });
      const json = await res.json();
      if (json.success) {
        flash("Bonuspiste poistettu.");
        await loadData();
      } else {
        flash(json.error ?? "Virhe poistossa.");
      }
    } catch {
      flash("Verkkovirhe.");
    } finally {
      setSaving(false);
    }
  }

  // ─── Player email CRUD ───────────────────────────────────────────────────

  async function savePlayerEmail(tournamentPlayerId: number) {
    setSavingPlayerId(tournamentPlayerId);
    try {
      const email = (playerEmails[tournamentPlayerId] ?? "").trim();
      const res = await fetch("/api/admin/players", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tournament_player_id: tournamentPlayerId, email }),
      });
      const json = await res.json();
      if (json.success) {
        flash(email ? "Sähköposti tallennettu." : "Sähköposti poistettu.");
        await loadData();
      } else {
        flash(json.error ?? "Virhe tallennuksessa.");
      }
    } catch {
      flash("Verkkovirhe.");
    } finally {
      setSavingPlayerId(null);
    }
  }

  // ─── Loading / Error states ────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "11px",
          color: "var(--text-muted)", letterSpacing: "0.1em",
        }}>
          LADATAAN ADMINDATAA...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
      }}>
        <div style={{
          background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)",
          borderRadius: "var(--radius-lg)", padding: "24px", maxWidth: "400px", textAlign: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-body)", fontSize: "14px",
            color: "var(--red-bright)", marginBottom: "16px",
          }}>
            {error || "Lataus epäonnistui."}
          </div>
          <a href="/dashboard" style={{
            display: "inline-block", background: "var(--blue-mid)", color: "#fff",
            padding: "10px 20px", borderRadius: "var(--radius)",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px",
            letterSpacing: "0.08em", textDecoration: "none",
          }}>
            TAKAISIN
          </a>
        </div>
      </div>
    );
  }

  const { players, events, matchups, bonusPoints } = data;

  const tabBtn = (t: Tab, label: string): React.CSSProperties => ({
    background: tab === t ? "var(--blue-mid)" : "transparent",
    color: tab === t ? "#fff" : "var(--text-muted)",
    border: tab === t ? "none" : "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "8px 20px",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "13px",
    letterSpacing: "0.08em",
    cursor: "pointer",
    textTransform: "uppercase",
  });

  // ─── Course settings helper ────────────────────────────────────────────────
  const courseSettingKeys = [
    "male_tee", "female_tee", "scoring", "holes",
    "putting", "pins", "mulligans", "wind",
    "fairway_firmness", "green_firmness", "green_stimp",
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid var(--border)", padding: "18px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: "blur(8px)", background: "rgba(6,8,14,0.8)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <a href="/" style={{ textDecoration: "none" }}><img src="/wc26-logo.png" alt="WC26" style={{ height: "36px", width: "auto" }} /></a>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/dashboard" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "var(--text-muted)", letterSpacing: "0.1em", textDecoration: "none",
          }}>
            HALLINTAPANEELI
          </a>
          <a href="/tournament" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "var(--text-muted)", letterSpacing: "0.1em", textDecoration: "none",
          }}>
            TURNAUS
          </a>
          <a href="/leaderboards" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "var(--text-muted)", letterSpacing: "0.1em", textDecoration: "none",
          }}>
            TULOKSET
          </a>
          <button onClick={handleSignOut} style={{
            background: "none", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "6px 12px",
            fontFamily: "var(--font-mono)", fontSize: "10px",
            letterSpacing: "0.1em", color: "var(--text-muted)", cursor: "pointer",
          }}>
            KIRJAUDU ULOS
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 80px" }}>
        {/* Title */}
        <div style={{ marginBottom: "48px", animation: "fadeUp 0.4s ease both" }}>
          <div className="section-label" style={{ marginBottom: "12px" }}>
            Winter Cup 2026
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: "clamp(48px, 8vw, 80px)", color: "var(--text)",
            lineHeight: 1, letterSpacing: "0.02em",
          }}>
            ADMIN
          </h1>
          <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
            <span className="badge badge-blue">{events.length} tapahtumaa</span>
            <span className="badge badge-blue">{matchups.length} paria</span>
            <span className="badge badge-gold">{bonusPoints.length} bonuspistettä</span>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: "32px" }} />

        {/* Feedback */}
        {feedback && (
          <div style={{
            background: "rgba(63,91,123,0.1)", border: "1px solid rgba(63,91,123,0.25)",
            borderRadius: "var(--radius)", padding: "10px 16px", marginBottom: "20px",
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "var(--blue-bright)", letterSpacing: "0.05em",
          }}>
            {feedback}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          <button onClick={() => setTab("events")} style={tabBtn("events", "TAPAHTUMAT")}>
            TAPAHTUMAT
          </button>
          <button onClick={() => setTab("matchups")} style={tabBtn("matchups", "PARIT")}>
            PARIT
          </button>
          <button onClick={() => setTab("bonus")} style={tabBtn("bonus", "BONUSPISTEET")}>
            BONUSPISTEET
          </button>
          <button onClick={() => setTab("players")} style={tabBtn("players", "PELAAJAT")}>
            PELAAJAT
          </button>
        </div>

        {/* ─── EVENTS TAB ─────────────────────────────────────────────────────── */}
        {tab === "events" && (
          <div style={{ animation: "fadeUp 0.3s ease both" }}>
            {/* Event Form */}
            <div style={cardStyle}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "16px",
                letterSpacing: "0.08em", color: "var(--text)", marginBottom: "20px",
                textTransform: "uppercase",
              }}>
                {editingEvent ? "MUOKKAA TAPAHTUMAA" : "UUSI TAPAHTUMA"}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label style={{ ...thStyle, display: "block", marginBottom: "4px", padding: 0, border: "none" }}>Kenttä</label>
                  <input
                    style={inputStyle}
                    value={eventForm.course_name}
                    onChange={(e) => setEventForm({ ...eventForm, course_name: e.target.value })}
                    placeholder="esim. Espoo Golf"
                  />
                </div>
                <div>
                  <label style={{ ...thStyle, display: "block", marginBottom: "4px", padding: 0, border: "none" }}>Kuukausi</label>
                  <select
                    style={selectStyle}
                    value={eventForm.event_month}
                    onChange={(e) => setEventForm({ ...eventForm, event_month: e.target.value })}
                  >
                    {MONTH_OPTIONS.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ ...thStyle, display: "block", marginBottom: "4px", padding: 0, border: "none" }}>Formaatti</label>
                  <select
                    style={selectStyle}
                    value={eventForm.format}
                    onChange={(e) => setEventForm({ ...eventForm, format: e.target.value as "fourball" | "singles" })}
                  >
                    <option value="fourball">Fourball</option>
                    <option value="singles">Singles</option>
                  </select>
                </div>
              </div>

              {/* Course Settings */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ ...thStyle, padding: 0, border: "none", marginBottom: "8px" }}>Kentän asetukset</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {courseSettingKeys.map((key) => (
                    <div key={key}>
                      <label style={{
                        fontFamily: "var(--font-mono)", fontSize: "9px",
                        color: "var(--text-muted)", letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}>
                        {key.replace(/_/g, " ")}
                      </label>
                      <input
                        style={{ ...inputStyle, fontSize: "12px", padding: "6px 8px" }}
                        value={eventForm.course_settings[key] ?? ""}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            course_settings: {
                              ...eventForm.course_settings,
                              [key]: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={saveEvent} disabled={saving} style={btnPrimary}>
                  {saving ? "TALLENNETAAN..." : editingEvent ? "PÄIVITÄ" : "LUO TAPAHTUMA"}
                </button>
                {editingEvent && (
                  <button onClick={resetEventForm} style={btnOutline}>PERUUTA</button>
                )}
              </div>
            </div>

            {/* Events Table */}
            <div style={cardStyle}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "16px",
                letterSpacing: "0.08em", color: "var(--text)", marginBottom: "16px",
                textTransform: "uppercase",
              }}>
                TAPAHTUMAT ({events.length})
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>ID</th>
                      <th style={thStyle}>Kenttä</th>
                      <th style={thStyle}>Kuukausi</th>
                      <th style={thStyle}>Formaatti</th>
                      <th style={thStyle}>Toiminnot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev.id}>
                        <td style={cellStyle}>{ev.id}</td>
                        <td style={cellStyle}>{ev.course_name}</td>
                        <td style={cellStyle}>
                          {MONTH_OPTIONS.find((m) => m.value === ev.event_month)?.label ?? ev.event_month}
                        </td>
                        <td style={cellStyle}>
                          <span className={`badge ${ev.format === "fourball" ? "badge-blue" : "badge-gold"}`}>
                            {ev.format}
                          </span>
                        </td>
                        <td style={cellStyle}>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button onClick={() => startEditEvent(ev)} style={btnOutline}>MUOKKAA</button>
                            <button onClick={() => deleteEvent(ev.id)} style={btnDanger}>POISTA</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {events.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ ...cellStyle, textAlign: "center", color: "var(--text-muted)" }}>
                          Ei tapahtumia.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── MATCHUPS TAB ───────────────────────────────────────────────────── */}
        {tab === "matchups" && (
          <div style={{ animation: "fadeUp 0.3s ease both" }}>
            {/* Matchup Form */}
            <div style={cardStyle}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "16px",
                letterSpacing: "0.08em", color: "var(--text)", marginBottom: "20px",
                textTransform: "uppercase",
              }}>
                {editingMatchup ? "MUOKKAA PARIA" : "UUSI PARI"}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label style={{ ...thStyle, display: "block", marginBottom: "4px", padding: 0, border: "none" }}>Tapahtuma</label>
                  <select
                    style={selectStyle}
                    value={matchupForm.event_id}
                    onChange={(e) => setMatchupForm({ ...matchupForm, event_id: Number(e.target.value) })}
                  >
                    <option value={0}>Valitse...</option>
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>{ev.course_name} ({ev.event_month})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "16px",
              }}>
                {/* Team 1 */}
                <div style={{
                  background: "rgba(63,91,123,0.05)", border: "1px solid rgba(63,91,123,0.15)",
                  borderRadius: "var(--radius)", padding: "12px",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "12px",
                    color: "#3f5b7b", letterSpacing: "0.1em", marginBottom: "8px",
                  }}>
                    JOUKKUE 1
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input
                      style={inputStyle}
                      placeholder="Pelaaja 1"
                      value={matchupForm.t1p1}
                      onChange={(e) => setMatchupForm({ ...matchupForm, t1p1: e.target.value })}
                    />
                    <input
                      style={inputStyle}
                      placeholder="Pelaaja 2 (valinnainen)"
                      value={matchupForm.t1p2}
                      onChange={(e) => setMatchupForm({ ...matchupForm, t1p2: e.target.value })}
                    />
                    <div>
                      <label style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                        PISTEET
                      </label>
                      <input
                        style={inputStyle}
                        type="number"
                        value={matchupForm.team1_points}
                        onChange={(e) => setMatchupForm({ ...matchupForm, team1_points: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>

                {/* Team 2 */}
                <div style={{
                  background: "rgba(107,141,181,0.05)", border: "1px solid rgba(107,141,181,0.15)",
                  borderRadius: "var(--radius)", padding: "12px",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "12px",
                    color: "#6b8db5", letterSpacing: "0.1em", marginBottom: "8px",
                  }}>
                    JOUKKUE 2
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input
                      style={inputStyle}
                      placeholder="Pelaaja 1"
                      value={matchupForm.t2p1}
                      onChange={(e) => setMatchupForm({ ...matchupForm, t2p1: e.target.value })}
                    />
                    <input
                      style={inputStyle}
                      placeholder="Pelaaja 2 (valinnainen)"
                      value={matchupForm.t2p2}
                      onChange={(e) => setMatchupForm({ ...matchupForm, t2p2: e.target.value })}
                    />
                    <div>
                      <label style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                        PISTEET
                      </label>
                      <input
                        style={inputStyle}
                        type="number"
                        value={matchupForm.team2_points}
                        onChange={(e) => setMatchupForm({ ...matchupForm, team2_points: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={saveMatchup} disabled={saving} style={btnPrimary}>
                  {saving ? "TALLENNETAAN..." : editingMatchup ? "PÄIVITÄ" : "LUO PARI"}
                </button>
                {editingMatchup && (
                  <button onClick={resetMatchupForm} style={btnOutline}>PERUUTA</button>
                )}
              </div>
            </div>

            {/* Matchups Table */}
            <div style={cardStyle}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "16px",
                letterSpacing: "0.08em", color: "var(--text)", marginBottom: "16px",
                textTransform: "uppercase",
              }}>
                PARIT ({matchups.length})
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Tapahtuma</th>
                      <th style={thStyle}>Joukkue 1</th>
                      <th style={thStyle}>Pisteet</th>
                      <th style={thStyle}>Joukkue 2</th>
                      <th style={thStyle}>Pisteet</th>
                      <th style={thStyle}>Toiminnot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchups.map((m) => {
                      const ev = events.find((e) => e.id === m.event_id);
                      return (
                        <tr key={m.id}>
                          <td style={cellStyle}>{ev?.course_name ?? m.event_id}</td>
                          <td style={cellStyle}>
                            {m.t1p1}{m.t1p2 ? ` & ${m.t1p2}` : ""}
                          </td>
                          <td style={{ ...cellStyle, fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                            {m.team1_points}
                          </td>
                          <td style={cellStyle}>
                            {m.t2p1}{m.t2p2 ? ` & ${m.t2p2}` : ""}
                          </td>
                          <td style={{ ...cellStyle, fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                            {m.team2_points}
                          </td>
                          <td style={cellStyle}>
                            <div style={{ display: "flex", gap: "6px" }}>
                              <button onClick={() => startEditMatchup(m)} style={btnOutline}>MUOKKAA</button>
                              <button onClick={() => deleteMatchup(m.id)} style={btnDanger}>POISTA</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {matchups.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ ...cellStyle, textAlign: "center", color: "var(--text-muted)" }}>
                          Ei pareja.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── BONUS POINTS TAB ───────────────────────────────────────────────── */}
        {tab === "bonus" && (
          <div style={{ animation: "fadeUp 0.3s ease both" }}>
            {/* Bonus Form */}
            <div style={cardStyle}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "16px",
                letterSpacing: "0.08em", color: "var(--text)", marginBottom: "20px",
                textTransform: "uppercase",
              }}>
                LISÄÄ BONUSPISTE
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label style={{ ...thStyle, display: "block", marginBottom: "4px", padding: 0, border: "none" }}>Pelaaja</label>
                  <select
                    style={selectStyle}
                    value={bonusForm.player}
                    onChange={(e) => setBonusForm({ ...bonusForm, player: e.target.value })}
                  >
                    <option value="">Valitse...</option>
                    {players.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ ...thStyle, display: "block", marginBottom: "4px", padding: 0, border: "none" }}>Tapahtuma</label>
                  <select
                    style={selectStyle}
                    value={bonusForm.event_id}
                    onChange={(e) => setBonusForm({ ...bonusForm, event_id: Number(e.target.value) })}
                  >
                    <option value={0}>Valitse...</option>
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>{ev.course_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ ...thStyle, display: "block", marginBottom: "4px", padding: 0, border: "none" }}>Tyyppi</label>
                  <select
                    style={selectStyle}
                    value={bonusForm.type}
                    onChange={(e) => setBonusForm({ ...bonusForm, type: e.target.value as BonusPointEntry["type"] })}
                  >
                    {BONUS_TYPES.map((t) => (
                      <option key={t} value={t}>{t.replace(/_/g, " ").toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ ...thStyle, display: "block", marginBottom: "4px", padding: 0, border: "none" }}>Pisteet</label>
                  <input
                    style={inputStyle}
                    type="number"
                    value={bonusForm.points}
                    onChange={(e) => setBonusForm({ ...bonusForm, points: Number(e.target.value) })}
                  />
                </div>
              </div>

              <button onClick={saveBonus} disabled={saving} style={btnPrimary}>
                {saving ? "TALLENNETAAN..." : "LISÄÄ BONUSPISTE"}
              </button>
            </div>

            {/* Bonus Table */}
            <div style={cardStyle}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "16px",
                letterSpacing: "0.08em", color: "var(--text)", marginBottom: "16px",
                textTransform: "uppercase",
              }}>
                BONUSPISTEET ({bonusPoints.length})
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Pelaaja</th>
                      <th style={thStyle}>Tapahtuma</th>
                      <th style={thStyle}>Tyyppi</th>
                      <th style={thStyle}>Pisteet</th>
                      <th style={thStyle}>Toiminnot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bonusPoints.map((bp, idx) => {
                      const ev = events.find((e) => e.id === bp.event_id);
                      return (
                        <tr key={`${bp.player}-${bp.event_id}-${bp.type}-${idx}`}>
                          <td style={cellStyle}>{bp.player}</td>
                          <td style={cellStyle}>{ev?.course_name ?? bp.event_id}</td>
                          <td style={cellStyle}>
                            <span className="badge badge-gold">
                              {bp.type.replace(/_/g, " ").toUpperCase()}
                            </span>
                          </td>
                          <td style={{ ...cellStyle, fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                            {bp.points}
                          </td>
                          <td style={cellStyle}>
                            <button onClick={() => deleteBonus(bp)} style={btnDanger}>POISTA</button>
                          </td>
                        </tr>
                      );
                    })}
                    {bonusPoints.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ ...cellStyle, textAlign: "center", color: "var(--text-muted)" }}>
                          Ei bonuspisteitä.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── PLAYERS TAB ──────────────────────────────────────────────────── */}
        {tab === "players" && (
          <div style={{ animation: "fadeUp 0.3s ease both" }}>
            <div style={cardStyle}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "16px",
                letterSpacing: "0.08em", color: "var(--text)", marginBottom: "8px",
                textTransform: "uppercase",
              }}>
                PELAAJIEN SÄHKÖPOSTIT
              </div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: "var(--text-muted)", marginBottom: "20px",
              }}>
                Yhdistä turnauspelaaja rekisteröityyn käyttäjään syöttämällä sähköpostiosoite.
                Linkitys tapahtuu automaattisesti kun pelaaja rekisteröityy samalla osoitteella.
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Nimi</th>
                      <th style={thStyle}>Joukkue</th>
                      <th style={thStyle}>Sähköposti</th>
                      <th style={thStyle}>Tila</th>
                      <th style={thStyle}>Toiminnot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p) => {
                      const emailVal = playerEmails[p.id] ?? p.email ?? "";
                      const isLinked = !!p.linked_player_id;
                      const isDirty = (playerEmails[p.id] !== undefined) && (playerEmails[p.id] !== (p.email ?? ""));
                      return (
                        <tr key={p.id}>
                          <td style={{ ...cellStyle, fontWeight: 600 }}>{p.name}</td>
                          <td style={cellStyle}>
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: "6px",
                            }}>
                              <span style={{
                                width: "8px", height: "8px", borderRadius: "50%",
                                background: p.team === 1 ? "#3f5b7b" : "#6b8db5",
                              }} />
                              {p.team}
                            </span>
                          </td>
                          <td style={{ ...cellStyle, minWidth: "220px" }}>
                            <input
                              style={{ ...inputStyle, fontSize: "12px", padding: "6px 8px" }}
                              type="email"
                              placeholder="email@esimerkki.fi"
                              value={emailVal}
                              onChange={(e) => setPlayerEmails({ ...playerEmails, [p.id]: e.target.value })}
                            />
                          </td>
                          <td style={cellStyle}>
                            {isLinked ? (
                              <span style={{
                                display: "inline-flex", alignItems: "center", gap: "4px",
                                fontFamily: "var(--font-mono)", fontSize: "10px",
                                letterSpacing: "0.08em", color: "#22c55e",
                              }}>
                                <span style={{
                                  width: "6px", height: "6px", borderRadius: "50%",
                                  background: "#22c55e",
                                }} />
                                YHDISTETTY
                              </span>
                            ) : p.email ? (
                              <span style={{
                                fontFamily: "var(--font-mono)", fontSize: "10px",
                                letterSpacing: "0.08em", color: "var(--gold)",
                              }}>
                                ODOTTAA
                              </span>
                            ) : (
                              <span style={{
                                fontFamily: "var(--font-mono)", fontSize: "10px",
                                letterSpacing: "0.08em", color: "var(--text-muted)",
                              }}>
                                EI ASETETTU
                              </span>
                            )}
                          </td>
                          <td style={cellStyle}>
                            <button
                              onClick={() => savePlayerEmail(p.id)}
                              disabled={savingPlayerId === p.id || !isDirty}
                              style={{
                                ...btnPrimary,
                                fontSize: "10px",
                                padding: "5px 12px",
                                opacity: (!isDirty || savingPlayerId === p.id) ? 0.4 : 1,
                              }}
                            >
                              {savingPlayerId === p.id ? "..." : "TALLENNA"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
