"use client";

import type { TournamentPlayer } from "@/lib/player";
import { scaleLinear, COLORS } from "@/lib/chart-utils";

interface Props {
  players: TournamentPlayer[];
  grossScores: { name: string; total: number }[];
}

export default function StrokeLeaderboardBars({ players, grossScores }: Props) {
  if (grossScores.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        Ei tuloksia
      </div>
    );
  }

  // Build lookup for team by player name
  const teamByName: Record<string, number> = {};
  for (const p of players) {
    teamByName[p.name] = p.team;
  }

  // Sort ascending (lower score = better = first)
  const sorted = [...grossScores].sort((a, b) => a.total - b.total);

  const minScore = sorted[0].total;
  const maxScore = sorted[sorted.length - 1].total;

  const barH = 18;
  const rowH = 22;
  const podiumH = 80;
  const W = 500;
  const pad = { left: 120, right: 50, top: podiumH + 10, bottom: 10 };
  const H = pad.top + sorted.length * rowH + pad.bottom;
  const chartW = W - pad.left - pad.right;

  // Scale bar width: minimum score gets full width, maximum gets partial
  const barMin = minScore - 5 > 0 ? minScore - 5 : 0;
  const x = scaleLinear([barMin, maxScore], [0, chartW]);

  const top3 = sorted.slice(0, 3);

  const teamColor = (name: string) =>
    teamByName[name] === 2 ? COLORS.blueBright : COLORS.blueMid;

  // Podium positions: 2nd | 1st | 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
  const podiumXPositions = top3.length >= 3
    ? [W * 0.25, W * 0.5, W * 0.75]
    : top3.length === 2
      ? [W * 0.35, W * 0.65]
      : [W * 0.5];
  const podiumRanks = top3.length >= 3 ? [2, 1, 3] : top3.length === 2 ? [2, 1] : [1];
  const podiumSizes = top3.length >= 3 ? [22, 28, 20] : top3.length === 2 ? [22, 28] : [28];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="slb-team1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.blueMid} />
          <stop offset="100%" stopColor={COLORS.blueMid} stopOpacity={0.6} />
        </linearGradient>
        <linearGradient id="slb-team2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.blueBright} />
          <stop offset="100%" stopColor={COLORS.blueBright} stopOpacity={0.6} />
        </linearGradient>
      </defs>

      {/* Podium indicators */}
      {podiumOrder.map((entry, i) => {
        if (!entry) return null;
        const cx = podiumXPositions[i];
        const r = podiumSizes[i];
        const rank = podiumRanks[i];
        const color = teamColor(entry.name);
        const isFirst = rank === 1;

        return (
          <g key={`podium-${i}`}>
            {isFirst && (
              <circle cx={cx} cy={podiumH / 2} r={r + 6} fill={COLORS.goldGlow} />
            )}
            <circle
              cx={cx} cy={podiumH / 2} r={r}
              fill={COLORS.surface2}
              stroke={isFirst ? COLORS.goldBright : color}
              strokeWidth={isFirst ? 2.5 : 1.5}
            />
            <text
              x={cx} y={podiumH / 2 - 2}
              fill={isFirst ? COLORS.goldBright : COLORS.text}
              fontSize={isFirst ? 14 : 11}
              fontFamily="Barlow Condensed" fontWeight={900}
              textAnchor="middle" dominantBaseline="central"
            >
              {entry.total}
            </text>
            <text
              x={cx} y={podiumH / 2 + r + 12}
              fill={COLORS.textMuted}
              fontSize={8} fontFamily="Barlow"
              textAnchor="middle"
            >
              {entry.name.length > 16 ? entry.name.slice(0, 14) + "..." : entry.name}
            </text>
            <text
              x={cx} y={podiumH / 2 - r - 6}
              fill={isFirst ? COLORS.goldBright : COLORS.textMuted}
              fontSize={9} fontFamily="Barlow Condensed" fontWeight={700}
              textAnchor="middle"
            >
              #{rank}
            </text>
          </g>
        );
      })}

      {/* Bar chart */}
      <g transform={`translate(${pad.left},${pad.top})`}>
        {sorted.map((entry, i) => {
          const cy = i * rowH + barH / 2;
          const team = teamByName[entry.name] ?? 1;
          const barW = Math.max(x(entry.total), 2);
          const gradId = team === 2 ? "slb-team2" : "slb-team1";

          return (
            <g key={i}>
              {/* Background bar */}
              <rect
                x={0} y={cy - barH / 2}
                width={chartW} height={barH}
                fill={COLORS.surface2} rx={3}
              />

              {/* Score bar */}
              <rect
                x={0} y={cy - barH / 2}
                width={barW} height={barH}
                fill={`url(#${gradId})`} rx={3}
                opacity={0.85}
              />

              {/* Player name */}
              <text
                x={-8} y={cy + 4}
                fill={COLORS.text}
                fontSize={9} fontFamily="Barlow"
                textAnchor="end"
              >
                {entry.name.length > 18 ? entry.name.slice(0, 16) + "..." : entry.name}
              </text>

              {/* Score value */}
              <text
                x={barW + 6} y={cy + 4}
                fill={teamColor(entry.name)}
                fontSize={10} fontFamily="Barlow Condensed" fontWeight={700}
              >
                {entry.total}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
