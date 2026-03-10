"use client";

import type { Matchup } from "@/lib/player";
import { COLORS } from "@/lib/chart-utils";

interface Props {
  matchups: Matchup[];
  format: "fourball" | "singles";
}

export default function MatchupBracket({ matchups, format }: Props) {
  if (matchups.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        Ei otteluita
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {matchups.map((m) => {
        const t1Wins = m.team1_points > m.team2_points;
        const t2Wins = m.team2_points > m.team1_points;
        const isDraw = m.team1_points === m.team2_points;

        const t1Label = format === "fourball" && m.t1p2
          ? `${m.t1p1} + ${m.t1p2}`
          : m.t1p1;
        const t2Label = format === "fourball" && m.t2p2
          ? `${m.t2p1} + ${m.t2p2}`
          : m.t2p1;

        return (
          <div
            key={m.id}
            style={{
              display: "flex",
              alignItems: "stretch",
              borderRadius: "6px",
              overflow: "hidden",
              border: `1px solid ${COLORS.border}`,
              background: COLORS.surface2,
              fontFamily: "Barlow, sans-serif",
            }}
          >
            {/* Team 1 side */}
            <div style={{
              flex: 1,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: t1Wins
                ? "rgba(63, 91, 123, 0.12)"
                : "transparent",
              borderLeft: `3px solid ${t1Wins ? COLORS.blueMid : isDraw ? COLORS.textMuted : "transparent"}`,
            }}>
              <span style={{
                fontSize: "12px",
                color: t1Wins ? COLORS.text : COLORS.textMuted,
                fontWeight: t1Wins ? 700 : 400,
                lineHeight: 1.3,
              }}>
                {t1Label}
              </span>
              <span style={{
                fontSize: "16px",
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 900,
                color: t1Wins ? COLORS.blueMid : COLORS.textMuted,
                marginLeft: "8px",
                minWidth: "24px",
                textAlign: "center",
              }}>
                {m.team1_points}
              </span>
            </div>

            {/* VS divider */}
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "0 6px",
              background: COLORS.surface,
              color: COLORS.textMuted,
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1px",
            }}>
              VS
            </div>

            {/* Team 2 side */}
            <div style={{
              flex: 1,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              background: t2Wins
                ? "rgba(107, 141, 181, 0.12)"
                : "transparent",
              borderRight: `3px solid ${t2Wins ? COLORS.blueBright : isDraw ? COLORS.textMuted : "transparent"}`,
            }}>
              <span style={{
                fontSize: "12px",
                color: t2Wins ? COLORS.text : COLORS.textMuted,
                fontWeight: t2Wins ? 700 : 400,
                textAlign: "right",
                lineHeight: 1.3,
              }}>
                {t2Label}
              </span>
              <span style={{
                fontSize: "16px",
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 900,
                color: t2Wins ? COLORS.blueBright : COLORS.textMuted,
                marginRight: "8px",
                minWidth: "24px",
                textAlign: "center",
              }}>
                {m.team2_points}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
