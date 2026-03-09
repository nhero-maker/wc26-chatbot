"use client";

import type { Round } from "@/lib/player";
import { scaleLinear, COLORS } from "@/lib/chart-utils";

export default function ScoreBarChart({ rounds }: { rounds: Round[] }) {
  if (rounds.length === 0) {
    return <NoData />;
  }

  const data = rounds
    .slice()
    .sort((a, b) => a.date_played.localeCompare(b.date_played))
    .map((r) => ({
      label: r.course_name ?? r.course_name_custom ?? "?",
      brutto: r.total_shots,
      netto: Math.round(r.total_shots - r.handicap_at_time),
    }));

  const maxScore = Math.max(...data.map((d) => d.brutto), 100);
  const W = 400;
  const H = 220;
  const pad = { top: 20, right: 10, bottom: 50, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const y = scaleLinear([0, maxScore], [chartH, 0]);
  const groupWidth = chartW / data.length;
  const barWidth = Math.min(groupWidth * 0.3, 28);
  const gap = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="bar-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blueBright} />
          <stop offset="100%" stopColor={COLORS.blueMid} />
        </linearGradient>
      </defs>

      <g transform={`translate(${pad.left},${pad.top})`}>
        {/* Y-axis grid lines */}
        {[0, 25, 50, 75, 100, 125, 150].filter((v) => v <= maxScore).map((v) => (
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
          const bx = cx - barWidth - gap / 2;
          const nx = cx + gap / 2;

          return (
            <g key={i}>
              {/* Brutto bar (grey) */}
              <rect
                x={bx} y={y(d.brutto)}
                width={barWidth} height={chartH - y(d.brutto)}
                fill={COLORS.grey} rx={2} opacity={0.7}
              />
              <text
                x={bx + barWidth / 2} y={y(d.brutto) - 4}
                fill={COLORS.greyLight} fontSize={9} fontFamily="Barlow Condensed"
                fontWeight={700} textAnchor="middle"
              >
                {d.brutto}
              </text>

              {/* Netto bar (blue) */}
              <rect
                x={nx} y={y(d.netto)}
                width={barWidth} height={chartH - y(d.netto)}
                fill="url(#bar-blue)" rx={2}
              />
              <text
                x={nx + barWidth / 2} y={y(d.netto) - 4}
                fill={COLORS.blueBright} fontSize={9} fontFamily="Barlow Condensed"
                fontWeight={700} textAnchor="middle"
              >
                {d.netto}
              </text>

              {/* X label */}
              <text
                x={cx} y={chartH + 14}
                fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow"
                textAnchor="middle"
              >
                {d.label.length > 14 ? d.label.slice(0, 12) + "…" : d.label}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${chartW - 100}, -10)`}>
          <rect x={0} y={0} width={10} height={10} fill={COLORS.grey} rx={1} opacity={0.7} />
          <text x={14} y={8} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Brutto</text>
          <rect x={50} y={0} width={10} height={10} fill={COLORS.blueMid} rx={1} />
          <text x={64} y={8} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Netto</text>
        </g>
      </g>
    </svg>
  );
}

function NoData() {
  return (
    <div style={{
      textAlign: "center", padding: "32px 0",
      fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
    }}>
      Ei kierroksia
    </div>
  );
}
