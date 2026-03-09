"use client";

import type { Round } from "@/lib/player";
import { scaleLinear, pointsToPath, COLORS } from "@/lib/chart-utils";

export default function ScoreTrendLine({ rounds }: { rounds: Round[] }) {
  const sorted = rounds
    .filter((r) => r.total_shots > 0)
    .slice()
    .sort((a, b) => a.date_played.localeCompare(b.date_played));

  if (sorted.length < 1) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        Ei dataa
      </div>
    );
  }

  const scores = sorted.map((r) => r.total_shots);
  const minScore = Math.min(...scores) - 5;
  const maxScore = Math.max(...scores) + 5;
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  const W = 300;
  const H = 220;
  const pad = { top: 15, right: 15, bottom: 40, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const x = scaleLinear([0, Math.max(sorted.length - 1, 1)], [0, chartW]);
  const y = scaleLinear([minScore, maxScore], [chartH, 0]);

  const linePoints: [number, number][] = sorted.map((r, i) => [x(i), y(r.total_shots)]);
  const areaPath = pointsToPath(linePoints) +
    ` L${x(sorted.length - 1)},${chartH} L${x(0)},${chartH} Z`;
  const linePath = pointsToPath(linePoints);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blueMid} stopOpacity={0.3} />
          <stop offset="100%" stopColor={COLORS.blueMid} stopOpacity={0} />
        </linearGradient>
        <filter id="glow-trend">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={`translate(${pad.left},${pad.top})`}>
        {/* Y grid */}
        {[minScore, avg, maxScore].map((v) => (
          <g key={v}>
            <line x1={0} y1={y(v)} x2={chartW} y2={y(v)} stroke={COLORS.border} strokeWidth={0.5} />
            <text x={-6} y={y(v) + 3} fill={COLORS.textMuted} fontSize={7} fontFamily="Space Mono" textAnchor="end">
              {Math.round(v)}
            </text>
          </g>
        ))}

        {/* Average line */}
        <line
          x1={0} y1={y(avg)} x2={chartW} y2={y(avg)}
          stroke={COLORS.goldBright} strokeWidth={0.8} strokeDasharray="4,4" opacity={0.5}
        />
        <text
          x={chartW + 2} y={y(avg) + 3}
          fill={COLORS.goldBright} fontSize={7} fontFamily="Space Mono" opacity={0.6}
        >
          ka {avg}
        </text>

        {/* Area fill */}
        <path d={areaPath} fill="url(#area-gradient)" />

        {/* Line */}
        <path d={linePath} fill="none" stroke={COLORS.blueBright} strokeWidth={2} />

        {/* Data points */}
        {sorted.map((r, i) => (
          <g key={i}>
            <circle
              cx={x(i)} cy={y(r.total_shots)}
              r={4} fill={COLORS.blueBright}
              filter="url(#glow-trend)"
            />
            <text
              x={x(i)} y={y(r.total_shots) - 8}
              fill={COLORS.text} fontSize={9} fontFamily="Barlow Condensed"
              fontWeight={700} textAnchor="middle"
            >
              {r.total_shots}
            </text>
            {/* X label (course name short) */}
            <text
              x={x(i)} y={chartH + 14}
              fill={COLORS.textMuted} fontSize={6} fontFamily="Barlow"
              textAnchor="middle" transform={`rotate(-25, ${x(i)}, ${chartH + 14})`}
            >
              {(r.course_name ?? r.course_name_custom ?? "?").slice(0, 10)}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
