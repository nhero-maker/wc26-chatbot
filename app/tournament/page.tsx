"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getTournament,
  signOut,
  type TournamentData,
} from "@/lib/player";
import CardPanel from "@/components/CardPanel";
import TeamScoreCircles from "@/components/charts/TeamScoreCircles";
import PlayerContributionBars from "@/components/charts/PlayerContributionBars";
import StrokeLeaderboardBars from "@/components/charts/StrokeLeaderboardBars";
import MatchupBracket from "@/components/charts/MatchupBracket";
import CourseConditions from "@/components/charts/CourseConditions";

const MONTH_LABELS: Record<string, string> = {
  "2026-01": "Tammikuu",
  "2026-02": "Helmikuu",
  "2026-03": "Maaliskuu",
  "2026-04": "Huhtikuu",
  "2026-05": "Toukokuu",
  "2026-06": "Kesäkuu",
};

export default function TournamentPage() {
  const router = useRouter();
  const [data, setData] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  useEffect(() => {
    getTournament()
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
          // Auto-expand latest event
          if (res.data.events.length > 0) {
            setExpandedEvent(res.data.events[res.data.events.length - 1].id);
          }
        } else {
          if (res.error?.includes("kirjautunut")) {
            router.replace("/signin");
            return;
          }
          setError(res.error ?? "Lataus epäonnistui.");
        }
      })
      .catch(() => setError("Verkkovirhe."))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "13px",
          color: "var(--text-muted)", letterSpacing: "0.1em",
        }}>
          LADATAAN TURNAUSDATAA...
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
          background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)",
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

  const { players, events, matchups, bonusPoints, teamStandings } = data;

  // Compute gross scores per player from matchups (aggregate team points)
  // For the stroke leaderboard we need actual round data — use bonus MVP as proxy for now
  // Actually, compute per-event team point totals
  const perEventStandings = events.map((event) => {
    const eventMatchups = matchups.filter((m) => m.event_id === event.id);
    const t1 = eventMatchups.reduce((s, m) => s + m.team1_points, 0);
    const t2 = eventMatchups.reduce((s, m) => s + m.team2_points, 0);
    return { event, team1: t1, team2: t2 };
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid var(--border)", padding: "18px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.9)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <a href="/" style={{ textDecoration: "none" }}><img src="/wc26-logo.png" alt="WC26" style={{ height: "36px", width: "auto" }} /></a>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/dashboard" style={{
            fontFamily: "var(--font-mono)", fontSize: "13px",
            color: "var(--text-muted)", letterSpacing: "0.1em", textDecoration: "none",
          }}>
            HALLINTAPANEELI
          </a>
          <a href="/leaderboards" style={{
            fontFamily: "var(--font-mono)", fontSize: "13px",
            color: "var(--text-muted)", letterSpacing: "0.1em", textDecoration: "none",
          }}>
            TULOKSET
          </a>
          <button onClick={handleSignOut} style={{
            background: "none", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "6px 12px",
            fontFamily: "var(--font-mono)", fontSize: "12px",
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
            TURNAUS
          </h1>
          <div style={{
            display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap",
          }}>
            <span className="badge badge-blue">{players.length} pelaajaa</span>
            <span className="badge badge-blue">{events.length} kierrosta</span>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: "32px" }} />

        {/* Team Score Overview */}
        <CardPanel title="Joukkuepisteet — Yhteensä" delay={0.05}>
          <TeamScoreCircles
            team1Total={teamStandings.team1_total}
            team2Total={teamStandings.team2_total}
          />
        </CardPanel>

        <div style={{ height: "20px" }} />

        {/* Per-Event Standings */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}>
          {perEventStandings.map(({ event, team1, team2 }) => (
            <CardPanel
              key={event.id}
              title={`${event.course_name} — ${MONTH_LABELS[event.event_month] ?? event.event_month}`}
              delay={0.1}
            >
              <div style={{ marginBottom: "12px" }}>
                <span className="badge badge-blue" style={{ marginRight: "8px" }}>
                  {event.format === "fourball" ? "Fourball" : "Singles"}
                </span>
              </div>
              <TeamScoreCircles team1Total={team1} team2Total={team2} />
              <div style={{ marginTop: "16px" }}>
                <button
                  onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                  style={{
                    background: "none", border: "1px solid var(--border)",
                    borderRadius: "var(--radius)", padding: "8px 16px",
                    fontFamily: "var(--font-mono)", fontSize: "12px",
                    letterSpacing: "0.1em", color: "var(--text-muted)",
                    cursor: "pointer", width: "100%",
                  }}
                >
                  {expandedEvent === event.id ? "PIILOTA TIEDOT" : "NÄYTÄ TIEDOT"}
                </button>
              </div>
            </CardPanel>
          ))}
        </div>

        {/* Expanded Event Details */}
        {expandedEvent && (() => {
          const event = events.find((e) => e.id === expandedEvent);
          if (!event) return null;
          const eventMatchups = matchups.filter((m) => m.event_id === expandedEvent);
          return (
            <div style={{ marginBottom: "20px", animation: "fadeUp 0.3s ease both" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}>
                <CardPanel title={`Parit — ${event.course_name}`} delay={0}>
                  <MatchupBracket
                    matchups={eventMatchups}
                    format={event.format}
                  />
                </CardPanel>
                <CardPanel title="Pelaajien pisteet" delay={0.05}>
                  <PlayerContributionBars
                    matchups={matchups}
                    eventId={expandedEvent}
                  />
                </CardPanel>
              </div>
              {event.course_settings && Object.keys(event.course_settings).length > 0 && (
                <CardPanel title="Kentän asetukset" delay={0.1}>
                  <CourseConditions settings={event.course_settings} />
                </CardPanel>
              )}
            </div>
          );
        })()}

        <div className="divider" style={{ marginBottom: "32px" }} />

        {/* Player Rankings */}
        <div className="section-label" style={{ marginBottom: "16px" }}>
          Pelaajat
        </div>
        <CardPanel title="Joukkueet" delay={0.2}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px",
          }}>
            {[1, 2].map((teamNum) => (
              <div key={teamNum}>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 900,
                  fontSize: "14px", letterSpacing: "0.1em",
                  color: teamNum === 1 ? "#3f5b7b" : "#6b8db5",
                  marginBottom: "12px",
                }}>
                  JOUKKUE {teamNum}
                </div>
                {players
                  .filter((p) => p.team === teamNum)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((p) => (
                    <div key={p.id} style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-body)", fontSize: "13px",
                        color: "var(--text)",
                      }}>
                        {p.name}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "12px",
                        color: "var(--text-muted)",
                      }}>
                        HCP {p.handicap}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </CardPanel>
      </main>
    </div>
  );
}
