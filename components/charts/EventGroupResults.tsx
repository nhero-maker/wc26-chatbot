"use client";
import { useState } from "react";
import type { Matchup, TournamentPlayer } from "@/lib/player";
import type { PlayerRoundScorecard, PlayerRoundStats } from "@/lib/wc26-data";
import MatchupScorecardTable from "./MatchupScorecardTable";

interface Props {
  matchups: Matchup[];
  format: "fourball" | "singles";
  // Scorecard props (optional — if omitted, no expand toggle)
  scorecards?: PlayerRoundScorecard[];
  pars?: number[];
  roundStats?: PlayerRoundStats[];
  players?: TournamentPlayer[];
  eventId?: number;
}

export default function EventGroupResults({ matchups, format, scorecards, pars, roundStats, players, eventId }: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const canExpand = !!(scorecards && pars && roundStats && players && eventId);

  function toggle(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (matchups.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px", fontFamily: "var(--font-mono)",
        fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em",
      }}>
        {format === "fourball" ? "Parit julkaistaan pian" : "Tulokset julkaistaan pian"}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {matchups.map((m) => {
        const noResult = m.team1_points === 0 && m.team2_points === 0;
        const t1win = m.team1_points > m.team2_points;
        const t2win = m.team2_points > m.team1_points;
        const t1label = [m.t1p1, m.t1p2].filter(Boolean).join(" / ");
        const t2label = [m.t2p1, m.t2p2].filter(Boolean).join(" / ");
        const isOpen = expanded.has(m.id);

        return (
          <div key={m.id} style={{
            border: "1px solid var(--border)", borderRadius: "6px", overflow: "hidden",
          }}>
            {/* Matchup row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr" }}>
              {/* Team 1 side */}
              <div style={{
                padding: "10px 14px", display: "flex", alignItems: "center",
                justifyContent: "space-between",
                background: t1win ? "rgba(45,74,110,0.08)" : "transparent",
                borderLeft: t1win ? "3px solid var(--blue-team)" : "3px solid transparent",
              }}>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "13px",
                  color: t1win ? "var(--blue-team)" : "var(--text)",
                  fontWeight: t1win ? 700 : 400,
                }}>{t1label}</span>
                {!noResult && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700,
                    color: t1win ? "var(--blue-team)" : "var(--text-muted)", marginLeft: "8px",
                  }}>{m.team1_points}</span>
                )}
              </div>
              {/* Center — VS + expand toggle */}
              <div
                onClick={canExpand ? () => toggle(m.id) : undefined}
                style={{
                  padding: "10px 12px", display: "flex", alignItems: "center", gap: "4px",
                  background: "var(--border)",
                  fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em",
                  color: "var(--text-muted)", whiteSpace: "nowrap",
                  cursor: canExpand ? "pointer" : "default",
                  userSelect: "none",
                }}>
                {noResult ? "EI TULOSTA" : "VS"}
                {canExpand && (
                  <span style={{ fontSize: "8px", marginLeft: "2px", opacity: 0.7 }}>
                    {isOpen ? "▲" : "▼"}
                  </span>
                )}
              </div>
              {/* Team 2 side */}
              <div style={{
                padding: "10px 14px", display: "flex", alignItems: "center",
                justifyContent: "space-between", flexDirection: "row-reverse",
                background: t2win ? "rgba(139,50,50,0.08)" : "transparent",
                borderRight: t2win ? "3px solid var(--red-team)" : "3px solid transparent",
              }}>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "13px",
                  color: t2win ? "var(--red-team)" : "var(--text)",
                  fontWeight: t2win ? 700 : 400,
                }}>{t2label}</span>
                {!noResult && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700,
                    color: t2win ? "var(--red-team)" : "var(--text-muted)", marginRight: "8px",
                  }}>{m.team2_points}</span>
                )}
              </div>
            </div>

            {/* Expanded scorecard */}
            {canExpand && isOpen && (
              <div style={{
                padding: "0 16px 16px",
                borderTop: "1px solid var(--border)",
                background: "var(--surface)",
              }}>
                <MatchupScorecardTable
                  matchup={m}
                  scorecards={scorecards!}
                  pars={pars!}
                  roundStats={roundStats!}
                  players={players!}
                  eventId={eventId!}
                  format={format}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
