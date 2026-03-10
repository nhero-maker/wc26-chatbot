"use client";

import type { Matchup } from "@/lib/player";
import { scaleLinear, COLORS, niceScale } from "@/lib/chart-utils";

interface Props {
  matchups: Matchup[];
  eventId: number;
}

export default function PlayerContributionBars({ matchups, eventId }: Props) {
  const filtered = matchups.filter((m) => m.event_id === eventId);

  if (filtered.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        No matchup data
      </div>
    );
  }

  const data = filtered.map((m) => ({
    label: [m.t1p1, m.t1p2].filter(Boolean).join(" / ") +
      " vs " +
      [m.t2p1, m.t2p2].filter(Boolean).join(" / "),
    t1: m.team1_points,
    t2: m.team2_points,
  }));

  const maxPts = Math.max(...data.flatMap((d) => [d.t1, d.t2]), 1);
  const ticks = niceScale(0, maxPts, 4);
  const yMax = ticks[ticks.length - 1];

  const W = 400;
  const H = 250;
  const pad = { top: 20, right: 10, bottom: 60, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const y = scaleLinear([0, yMax], [chartH, 0]);
  const groupWidth = chartW / data.length;
  const barWidth = Math.min(groupWidth * 0.3, 30);
  const gap = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="pcb-team1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blueMid} stopOpacity={0.95} />
          <stop offset="100%" stopColor={COLORS.blueMid} stopOpacity={0.6} />
        </linearGradient>
        <linearGradient id="pcb-team2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blueBright} />
          <stop offset="100%" stopColor={COLORS.blueBright} stopOpacity={0.6} />
        </linearGradient>
      </defs>

      <g transform={`translate(${pad.left},${pad.top})`}>
        {/* Y-axis grid lines */}
        {ticks.map((v) => (
          <g key={v}>
            <line
              x1={0} y1={y(v)} x2={chartW} y2={y(v)}
              stroke={COLORS.border} strokeWidth={0.5}
            />
            <text
              x={-6} y={y(v) + 3}
              fill={COLORS.textMuted} fontSize={8} fontFamily="Space Mono" textAnchor="end"
            >
              {v}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const cx = groupWidth * i + groupWidth / 2;
          const t1x = cx - barWidth - gap / 2;
          const t2x = cx + gap / 2;

          return (
            <g key={i}>
              {/* Team 1 bar */}
              <rect
                x={t1x} y={y(d.t1)}
                width={barWidth} height={chartH - y(d.t1)}
                fill="url(#pcb-team1)" rx={2}
              />
              <text
                x={t1x + barWidth / 2} y={y(d.t1) - 4}
                fill={COLORS.blueMid} fontSize={9} fontFamily="Barlow Condensed"
                fontWeight={700} textAnchor="middle"
              >
                {d.t1}
              </text>

              {/* Team 2 bar */}
              <rect
                x={t2x} y={y(d.t2)}
                width={barWidth} height={chartH - y(d.t2)}
                fill="url(#pcb-team2)" rx={2}
              />
              <text
                x={t2x + barWidth / 2} y={y(d.t2) - 4}
                fill={COLORS.blueBright} fontSize={9} fontFamily="Barlow Condensed"
                fontWeight={700} textAnchor="middle"
              >
                {d.t2}
              </text>

              {/* X label (player names) */}
              <text
                x={cx} y={chartH + 14}
                fill={COLORS.textMuted} fontSize={6} fontFamily="Barlow"
                textAnchor="middle" transform={`rotate(-20, ${cx}, ${chartH + 14})`}
              >
                {d.label.length > 28 ? d.label.slice(0, 26) + "…" : d.label}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${chartW - 120}, -10)`}>
          <rect x={0} y={0} width={10} height={10} fill={COLORS.blueMid} rx={1} />
          <text x={14} y={8} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Team 1</text>
          <rect x={60} y={0} width={10} height={10} fill={COLORS.blueBright} rx={1} />
          <text x={74} y={8} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Team 2</text>
        </g>
      </g>
    </svg>
  );
}
