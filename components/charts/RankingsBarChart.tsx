"use client";

import type { LeaderboardData } from "@/lib/player";
import { scaleLinear, COLORS } from "@/lib/chart-utils";

interface Props {
  playerName: string;
  leaderboardData: LeaderboardData;
}

export default function RankingsBarChart({ playerName, leaderboardData }: Props) {
  // Compute rank per category
  const categories: { label: string; rank: number; total: number }[] = [];

  // Best Score rank
  const bestScores = leaderboardData.bestScores;
  if (bestScores.length > 0) {
    const sorted = [...bestScores].sort((a, b) => a.total_shots - b.total_shots);
    const idx = sorted.findIndex((s) => s.player_name === playerName);
    categories.push({ label: "Bruttotulos", rank: idx >= 0 ? idx + 1 : sorted.length, total: sorted.length });
  }

  // Net Score rank
  const netScores = leaderboardData.netScores;
  if (netScores.length > 0) {
    const sorted = [...netScores].sort((a, b) => a.net_score - b.net_score);
    const idx = sorted.findIndex((s) => s.player_name === playerName);
    categories.push({ label: "Nettotulos", rank: idx >= 0 ? idx + 1 : sorted.length, total: sorted.length });
  }

  // Longest Drive rank (higher is better)
  const drives = leaderboardData.longestDrives;
  if (drives.length > 0) {
    const sorted = [...drives].sort((a, b) => b.longest_drive - a.longest_drive);
    const idx = sorted.findIndex((s) => s.player_name === playerName);
    categories.push({ label: "Pisin lyönti", rank: idx >= 0 ? idx + 1 : sorted.length, total: sorted.length });
  }

  // Closest to pin rank (lower is better)
  const pins = leaderboardData.closestToPin;
  if (pins.length > 0) {
    const sorted = [...pins].sort((a, b) => a.closest_to_pin - b.closest_to_pin);
    const idx = sorted.findIndex((s) => s.player_name === playerName);
    categories.push({ label: "Lähimpänä", rank: idx >= 0 ? idx + 1 : sorted.length, total: sorted.length });
  }

  if (categories.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        Ei dataa
      </div>
    );
  }

  const maxTotal = Math.max(...categories.map((c) => c.total), 24);

  const W = 500;
  const H = categories.length * 45 + 20;
  const pad = { left: 90, right: 30, top: 10, bottom: 10 };
  const chartW = W - pad.left - pad.right;

  const x = scaleLinear([0, maxTotal], [0, chartW]);
  const barH = 20;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <g transform={`translate(${pad.left},${pad.top})`}>
        {categories.map((cat, i) => {
          const cy = i * 45 + barH / 2;
          const isTop3 = cat.rank <= 3;
          const barColor = cat.rank === 1
            ? COLORS.goldBright
            : isTop3
              ? COLORS.blueBright
              : COLORS.grey;
          const barW = x(maxTotal - cat.rank + 1);

          return (
            <g key={i}>
              {/* Category label */}
              <text
                x={-8} y={cy + 4}
                fill={COLORS.textMuted} fontSize={9} fontFamily="Barlow"
                textAnchor="end"
              >
                {cat.label}
              </text>

              {/* Background bar */}
              <rect
                x={0} y={cy - barH / 2}
                width={chartW} height={barH}
                fill={COLORS.surface2} rx={3}
              />

              {/* Rank bar */}
              <rect
                x={0} y={cy - barH / 2}
                width={barW} height={barH}
                fill={barColor} rx={3}
                opacity={isTop3 ? 0.9 : 0.5}
              />

              {/* Rank number */}
              <text
                x={barW + 8} y={cy + 4}
                fill={isTop3 ? barColor : COLORS.textMuted}
                fontSize={12} fontFamily="Barlow Condensed" fontWeight={900}
              >
                #{cat.rank}
              </text>

              {/* Medal for top 3 */}
              {cat.rank === 1 && (
                <text x={barW + 36} y={cy + 4} fill={COLORS.goldBright} fontSize={10}>
                  ●
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
