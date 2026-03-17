"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  WC26_TOURNAMENT_PLAYERS,
  WC26_EVENTS,
  WC26_SCORECARDS,
  WC26_EVENT_PARS,
} from "@/lib/wc26-data";
import { signOut } from "@/lib/player";
import AppNav from "@/components/AppNav";

// Players who haven't entered Round 2 yet
const DNS_ROUND2 = new Set(["Niko", "Milla", "Mika R.", "Pasi K.", "Arttu", "Roope"]);

function holeColor(strokes: number, par: number): string {
  const diff = strokes - par;
  if (diff <= -2) return "rgba(201,169,110,0.35)"; // eagle — gold
  if (diff === -1) return "rgba(34,197,94,0.22)";   // birdie — green
  if (diff === 0)  return "transparent";              // par
  if (diff === 1)  return "rgba(251,191,36,0.2)";    // bogey — amber
  return "rgba(239,68,68,0.2)";                      // double+ — red
}

function holeLabel(strokes: number, par: number): string {
  const diff = strokes - par;
  if (diff <= -2) return "E";
  if (diff === -1) return "B";
  return String(strokes);
}

function ScorecardTable({ eventId }: { eventId: number }) {
  const pars = WC26_EVENT_PARS[eventId];
  const totalPar = pars ? pars.reduce((a, b) => a + b, 0) : 0;
  const front9Par = pars ? pars.slice(0, 9).reduce((a, b) => a + b, 0) : 0;
  const back9Par  = pars ? pars.slice(9).reduce((a, b) => a + b, 0) : 0;

  // Sort players: team 1 first, then team 2; within team alphabetically
  const players = [...WC26_TOURNAMENT_PLAYERS].sort((a, b) => {
    if (a.team !== b.team) return a.team - b.team;
    return a.name.localeCompare(b.name);
  });

  const tdBase: React.CSSProperties = {
    padding: "4px 6px",
    textAlign: "center",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    borderRight: "1px solid var(--border)",
    minWidth: "28px",
  };

  const thBase: React.CSSProperties = {
    ...tdBase,
    color: "var(--text-muted)",
    background: "var(--surface)",
    fontSize: "11px",
    letterSpacing: "0.05em",
    position: "sticky",
    top: 0,
    zIndex: 2,
  };

  return (
    <div style={{ overflowX: "auto", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "900px" }}>
        <thead>
          <tr>
            <th style={{ ...thBase, textAlign: "left", minWidth: "110px", paddingLeft: "12px", position: "sticky", left: 0, zIndex: 3, background: "var(--surface)" }}>
              PELAAJA
            </th>
            <th style={{ ...thBase, minWidth: "28px", color: "var(--text-muted)" }}>HCP</th>
            {/* Holes 1–9 */}
            {Array.from({ length: 9 }, (_, i) => (
              <th key={i + 1} style={thBase}>{i + 1}</th>
            ))}
            <th style={{ ...thBase, background: "rgba(0,0,0,0.04)", fontWeight: 700, color: "var(--text)" }}>OUT</th>
            {/* Holes 10–18 */}
            {Array.from({ length: 9 }, (_, i) => (
              <th key={i + 10} style={thBase}>{i + 10}</th>
            ))}
            <th style={{ ...thBase, background: "rgba(0,0,0,0.04)", fontWeight: 700, color: "var(--text)" }}>IN</th>
            <th style={{ ...thBase, background: "rgba(0,0,0,0.06)", fontWeight: 700, color: "var(--text)", minWidth: "40px" }}>GROSS</th>
            <th style={{ ...thBase, background: "rgba(0,0,0,0.06)", fontWeight: 700, color: "var(--text)", minWidth: "40px" }}>NET</th>
          </tr>
          {/* Par row */}
          {pars && (
            <tr style={{ background: "rgba(201,169,110,0.08)" }}>
              <td style={{ ...tdBase, textAlign: "left", paddingLeft: "12px", fontWeight: 700, color: "var(--text-muted)", fontSize: "11px", position: "sticky", left: 0, background: "rgba(201,169,110,0.08)" }}>
                PAR
              </td>
              <td style={{ ...tdBase, color: "var(--text-muted)", fontSize: "11px" }}>—</td>
              {pars.slice(0, 9).map((p, i) => (
                <td key={i} style={{ ...tdBase, color: "var(--text-muted)", fontSize: "11px" }}>{p}</td>
              ))}
              <td style={{ ...tdBase, fontWeight: 700, color: "var(--text)", background: "rgba(0,0,0,0.04)" }}>{front9Par}</td>
              {pars.slice(9).map((p, i) => (
                <td key={i + 9} style={{ ...tdBase, color: "var(--text-muted)", fontSize: "11px" }}>{p}</td>
              ))}
              <td style={{ ...tdBase, fontWeight: 700, color: "var(--text)", background: "rgba(0,0,0,0.04)" }}>{back9Par}</td>
              <td style={{ ...tdBase, fontWeight: 700, color: "var(--text)", background: "rgba(0,0,0,0.06)" }}>{totalPar}</td>
              <td style={{ ...tdBase, color: "var(--text-muted)", background: "rgba(0,0,0,0.06)", fontSize: "11px" }}>—</td>
            </tr>
          )}
        </thead>
        <tbody>
          {players.map((player) => {
            const scorecard = WC26_SCORECARDS.find(
              (s) => s.playerName === player.name && s.eventId === eventId
            );
            const isDNS = !scorecard && (eventId > 1 ? DNS_ROUND2.has(player.name) : false);
            const teamColor = player.team === 1 ? "var(--blue-team)" : "var(--red-team)";

            if (!scorecard) {
              // DNS row
              return (
                <tr key={player.id} style={{ opacity: 0.45, borderTop: "1px solid var(--border)" }}>
                  <td style={{ ...tdBase, textAlign: "left", paddingLeft: "12px", position: "sticky", left: 0, background: "var(--bg)" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: teamColor, display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-muted)" }}>{player.name}</span>
                    </span>
                  </td>
                  <td style={{ ...tdBase, color: "var(--text-muted)" }}>{player.handicap}</td>
                  {Array.from({ length: 20 }, (_, i) => (
                    <td key={i} style={{ ...tdBase, color: "var(--text-muted)" }}>—</td>
                  ))}
                  <td style={{ ...tdBase, fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", background: "rgba(0,0,0,0.06)", letterSpacing: "0.05em" }}>DNS</td>
                  <td style={{ ...tdBase, color: "var(--text-muted)", background: "rgba(0,0,0,0.06)" }}>—</td>
                </tr>
              );
            }

            const front9 = scorecard.holes.slice(0, 9).reduce((a, b) => a + b, 0);
            const back9  = scorecard.holes.slice(9).reduce((a, b) => a + b, 0);
            const netScore = Math.round(scorecard.gross - player.handicap * 0.5);

            return (
              <tr key={player.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ ...tdBase, textAlign: "left", paddingLeft: "12px", position: "sticky", left: 0, background: "var(--bg)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: teamColor, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text)" }}>{player.name}</span>
                  </span>
                </td>
                <td style={{ ...tdBase, color: "var(--text-muted)", fontSize: "11px" }}>{player.handicap}</td>
                {scorecard.holes.slice(0, 9).map((strokes, i) => (
                  <td key={i} style={{ ...tdBase, background: pars ? holeColor(strokes, pars[i]) : "transparent", color: "var(--text)", fontWeight: strokes - (pars?.[i] ?? 0) <= -1 ? 700 : 400 }}>
                    {pars ? holeLabel(strokes, pars[i]) : strokes}
                  </td>
                ))}
                <td style={{ ...tdBase, fontWeight: 700, color: "var(--text)", background: "rgba(0,0,0,0.04)" }}>{front9}</td>
                {scorecard.holes.slice(9).map((strokes, i) => (
                  <td key={i + 9} style={{ ...tdBase, background: pars ? holeColor(strokes, pars[i + 9]) : "transparent", color: "var(--text)", fontWeight: strokes - (pars?.[i + 9] ?? 0) <= -1 ? 700 : 400 }}>
                    {pars ? holeLabel(strokes, pars[i + 9]) : strokes}
                  </td>
                ))}
                <td style={{ ...tdBase, fontWeight: 700, color: "var(--text)", background: "rgba(0,0,0,0.04)" }}>{back9}</td>
                <td style={{ ...tdBase, fontWeight: 700, color: "var(--text)", background: "rgba(0,0,0,0.06)" }}>{scorecard.gross}</td>
                <td style={{ ...tdBase, fontWeight: 700, color: "var(--text)", background: "rgba(0,0,0,0.06)" }}>{netScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function AttendanceGrid() {
  const players = [...WC26_TOURNAMENT_PLAYERS].sort((a, b) => {
    if (a.team !== b.team) return a.team - b.team;
    return a.name.localeCompare(b.name);
  });

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "4px 8px", textAlign: "left", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>PELAAJA</th>
            {WC26_EVENTS.map((e) => (
              <th key={e.id} style={{ padding: "4px 6px", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.06em", textAlign: "center", whiteSpace: "nowrap" }}>
                K{e.id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            const teamColor = player.team === 1 ? "var(--blue-team)" : "var(--red-team)";
            return (
              <tr key={player.id}>
                <td style={{ padding: "3px 8px 3px 0", whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: teamColor, display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--text-muted)" }}>{player.name}</span>
                  </span>
                </td>
                {WC26_EVENTS.map((e) => {
                  const played = WC26_SCORECARDS.some(
                    (s) => s.playerName === player.name && s.eventId === e.id
                  );
                  const isFuture = e.id > 2;
                  return (
                    <td key={e.id} style={{ padding: "3px 6px", textAlign: "center" }}>
                      {isFuture ? (
                        <span style={{ color: "var(--text-dim)", fontSize: "11px" }}>○</span>
                      ) : played ? (
                        <span style={{ color: "rgba(34,197,94,0.9)", fontSize: "13px" }}>✓</span>
                      ) : (
                        <span style={{ color: "rgba(239,68,68,0.6)", fontSize: "11px" }}>–</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function ScorecardsPage() {
  const router = useRouter();
  const playedEventIds = [1, 2];
  const [activeEvent, setActiveEvent] = useState(1);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  const activeEventData = WC26_EVENTS.find((e) => e.id === activeEvent);
  const isPlayed = playedEventIds.includes(activeEvent);

  const MONTH_LABELS: Record<string, string> = {
    "2026-01": "Tammikuu",
    "2026-02": "Helmikuu",
    "2026-03": "Maaliskuu",
    "2026-04": "Huhtikuu",
    "2026-05": "Toukokuu",
    "2026-06": "Kesäkuu",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppNav activePage="scorecards" onSignOut={handleSignOut} />

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "48px 32px 80px" }}>
        {/* Title */}
        <div style={{ marginBottom: "48px", animation: "fadeUp 0.4s ease both" }}>
          <div className="section-label" style={{ marginBottom: "12px" }}>Winter Cup 2026</div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: "clamp(48px, 8vw, 80px)", color: "var(--text)",
            lineHeight: 1, letterSpacing: "0.02em",
          }}>
            TULOSKORTIT
          </h1>
          <p style={{ marginTop: "12px", fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Reikäkohtaiset tulokset jokaiselta kierrokselta. Värikoodit: <span style={{ color: "#c9a96e", fontWeight: 700 }}>kultainen</span> = kotka, <span style={{ color: "rgba(34,197,94,1)", fontWeight: 700 }}>vihreä</span> = birdie, keltainen = bogey, punainen = tupla+.
          </p>
        </div>

        <div className="divider" style={{ marginBottom: "32px" }} />

        {/* Attendance grid */}
        <div style={{ marginBottom: "40px" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>Osallistuminen</div>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: "20px 24px",
          }}>
            <AttendanceGrid />
          </div>
        </div>

        {/* Course tabs */}
        <div className="section-label" style={{ marginBottom: "16px" }}>Kierrokset</div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {WC26_EVENTS.map((e) => {
            const isActive = activeEvent === e.id;
            const played = playedEventIds.includes(e.id);
            return (
              <button
                key={e.id}
                onClick={() => setActiveEvent(e.id)}
                disabled={!played}
                style={{
                  background: isActive ? "var(--text)" : "var(--surface)",
                  color: isActive ? "var(--bg)" : played ? "var(--text-muted)" : "var(--text-dim)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "8px 16px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  cursor: played ? "pointer" : "default",
                  opacity: played ? 1 : 0.45,
                  transition: "all 0.15s ease",
                }}
              >
                K{e.id} — {e.course_name}
              </button>
            );
          })}
        </div>

        {/* Active event info */}
        {activeEventData && (
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <span className="badge badge-blue">
                {activeEventData.format === "fourball" ? "Fourball" : "Singles"}
              </span>
              <span className="badge badge-blue">
                {MONTH_LABELS[activeEventData.event_month] ?? activeEventData.event_month}
              </span>
              {WC26_EVENT_PARS[activeEvent] && (
                <span className="badge badge-blue">
                  Par {WC26_EVENT_PARS[activeEvent].reduce((a, b) => a + b, 0)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Scorecard table */}
        {isPlayed ? (
          <ScorecardTable eventId={activeEvent} />
        ) : (
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: "48px",
            textAlign: "center",
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
              EI VIELÄ PELATTU
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-dim)", marginTop: "8px" }}>
              Tuloskortit lisätään kierroksen jälkeen.
            </div>
          </div>
        )}

        {/* Legend */}
        {isPlayed && (
          <div style={{ marginTop: "24px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.06em" }}>VÄRIKOODIT:</span>
            {[
              { label: "E = Kotka", bg: "rgba(201,169,110,0.35)" },
              { label: "B = Birdie", bg: "rgba(34,197,94,0.22)" },
              { label: "Par", bg: "var(--surface)" },
              { label: "Bogey", bg: "rgba(251,191,36,0.2)" },
              { label: "Tupla+", bg: "rgba(239,68,68,0.2)" },
            ].map(({ label, bg }) => (
              <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "20px", height: "14px", borderRadius: "3px", background: bg, border: "1px solid var(--border)", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>{label}</span>
              </span>
            ))}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>| DNS = Ei pelattu</span>
          </div>
        )}
      </main>
    </div>
  );
}
