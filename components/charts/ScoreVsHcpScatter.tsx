"use client";

import type { NetEntry } from "@/lib/player";
import { scaleLinear, COLORS } from "@/lib/chart-utils";

export default function ScoreVsHcpScatter({
  currentPlayerName,
  netScores,
}: {
  currentPlayerName: string;
  netScores: NetEntry[];
}) {
  if (netScores.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        Ei dataa
      </div>
    );
  }

  // Group by unique player+score combos
  const points = netScores.map((s) => ({
    hcp: s.handicap_at_time,
    score: s.total_shots,
    isCurrent: s.player_name === currentPlayerName,
  }));

  const hcps = points.map((p) => p.hcp);
  const scores = points.map((p) => p.score);
  const minHcp = Math.max(0, Math.min(...hcps) - 2);
  const maxHcp = Math.max(...hcps) + 2;
  const minScore = Math.min(...scores) - 5;
  const maxScore = Math.max(...scores) + 5;

  const W = 300;
  const H = 250;
  const pad = { top: 15, right: 15, bottom: 35, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const x = scaleLinear([minHcp, maxHcp], [0, chartW]);
  const y = scaleLinear([minScore, maxScore], [chartH, 0]);

  // HCP 100% trend line (score = 72 + hcp, approximate)
  const trendY1 = y(72 + minHcp);
  const trendY2 = y(72 + maxHcp);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <filter id="glow-scatter">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={`translate(${pad.left},${pad.top})`}>
        {/* Grid lines */}
        {[minScore, minScore + (maxScore - minScore) * 0.25, minScore + (maxScore - minScore) * 0.5, minScore + (maxScore - minScore) * 0.75, maxScore].map((v, i) => {
          const rounded = Math.round(v);
          return (
            <g key={i}>
              <line x1={0} y1={y(rounded)} x2={chartW} y2={y(rounded)} stroke={COLORS.border} strokeWidth={0.5} />
              <text x={-6} y={y(rounded) + 3} fill={COLORS.textMuted} fontSize={7} fontFamily="Space Mono" textAnchor="end">
                {rounded}
              </text>
            </g>
          );
        })}

        {/* HCP trend line */}
        <line
          x1={x(minHcp)} y1={trendY1} x2={x(maxHcp)} y2={trendY2}
          stroke={COLORS.textDim} strokeWidth={1} strokeDasharray="4,4"
        />
        <text
          x={x(maxHcp) - 2} y={trendY2 - 6}
          fill={COLORS.textDim} fontSize={7} fontFamily="Space Mono" textAnchor="end"
        >
          HCP 100%
        </text>

        {/* Other players */}
        {points.filter((p) => !p.isCurrent).map((p, i) => (
          <circle
            key={i}
            cx={x(p.hcp)} cy={y(p.score)}
            r={3} fill={COLORS.grey} opacity={0.5}
          />
        ))}

        {/* Current player (on top) */}
        {points.filter((p) => p.isCurrent).map((p, i) => (
          <circle
            key={`c${i}`}
            cx={x(p.hcp)} cy={y(p.score)}
            r={6} fill={COLORS.blueBright}
            filter="url(#glow-scatter)"
          />
        ))}

        {/* X axis label */}
        <text
          x={chartW / 2} y={chartH + 28}
          fill={COLORS.textMuted} fontSize={8} fontFamily="Barlow" textAnchor="middle"
        >
          HCP
        </text>

        {/* Y axis label */}
        <text
          x={-chartH / 2} y={-28}
          fill={COLORS.textMuted} fontSize={8} fontFamily="Barlow" textAnchor="middle"
          transform="rotate(-90)"
        >
          Tulos
        </text>

        {/* Legend */}
        <g transform={`translate(${chartW - 75}, ${chartH + 18})`}>
          <circle cx={4} cy={4} r={3} fill={COLORS.blueBright} />
          <text x={12} y={7} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Sinä</text>
          <circle cx={42} cy={4} r={3} fill={COLORS.grey} opacity={0.5} />
          <text x={50} y={7} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Muut</text>
        </g>
      </g>
    </svg>
  );
}
