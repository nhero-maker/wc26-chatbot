"use client";

import type { Round } from "@/lib/player";
import { scaleLinear, pointsToPath, COLORS } from "@/lib/chart-utils";

// Strokes over par per hole group (1-6, 7-12, 13-18)
export default function GameProgressChart({ rounds }: { rounds: Round[] }) {
  const roundsWithHoles = rounds.filter((r) => r.holes && r.holes.length === 18);

  if (roundsWithHoles.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        Ei väyläkohtaista dataa
      </div>
    );
  }

  const groups = ["1–6", "7–12", "13–18"];

  // Calculate strokes over par per group for each round
  const lines = roundsWithHoles.map((r) => {
    const holes = r.holes!;
    return [
      holes.slice(0, 6).reduce((sum, h) => sum + (h.strokes - h.par), 0) / 6,
      holes.slice(6, 12).reduce((sum, h) => sum + (h.strokes - h.par), 0) / 6,
      holes.slice(12, 18).reduce((sum, h) => sum + (h.strokes - h.par), 0) / 6,
    ];
  });

  // Also compute average across all rounds
  const avg = [0, 1, 2].map((gi) => {
    const vals = lines.map((l) => l[gi]);
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  });

  const allVals = lines.flat().concat(avg);
  const minVal = Math.min(...allVals) - 0.3;
  const maxVal = Math.max(...allVals) + 0.3;

  const W = 300;
  const H = 220;
  const pad = { top: 15, right: 15, bottom: 35, left: 45 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const x = scaleLinear([0, 2], [0, chartW]);
  const y = scaleLinear([minVal, maxVal], [chartH, 0]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <g transform={`translate(${pad.left},${pad.top})`}>
        {/* Zero line (par) */}
        <line x1={0} y1={y(0)} x2={chartW} y2={y(0)} stroke={COLORS.textMuted} strokeWidth={0.7} strokeDasharray="3,3" />
        <text x={-6} y={y(0) + 3} fill={COLORS.textMuted} fontSize={7} fontFamily="Space Mono" textAnchor="end">
          Par
        </text>

        {/* Grid */}
        {[-1, -0.5, 0.5, 1, 1.5, 2].filter((v) => v >= minVal && v <= maxVal).map((v) => (
          <g key={v}>
            <line x1={0} y1={y(v)} x2={chartW} y2={y(v)} stroke={COLORS.border} strokeWidth={0.3} />
            <text x={-6} y={y(v) + 3} fill={COLORS.textDim} fontSize={6} fontFamily="Space Mono" textAnchor="end">
              {v > 0 ? `+${v.toFixed(1)}` : v.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Individual round lines (faded) */}
        {lines.map((line, i) => {
          const isLatest = i === lines.length - 1;
          const pts: [number, number][] = line.map((v, gi) => [x(gi), y(v)]);
          return (
            <g key={i}>
              <path
                d={pointsToPath(pts)}
                fill="none"
                stroke={isLatest ? COLORS.blueBright : COLORS.textDim}
                strokeWidth={isLatest ? 2 : 1}
                opacity={isLatest ? 1 : 0.3}
              />
              {pts.map(([px, py], j) => (
                <circle
                  key={j} cx={px} cy={py}
                  r={isLatest ? 3.5 : 2}
                  fill={isLatest ? COLORS.blueBright : COLORS.textDim}
                  opacity={isLatest ? 1 : 0.3}
                />
              ))}
            </g>
          );
        })}

        {/* X labels */}
        {groups.map((g, i) => (
          <text
            key={i} x={x(i)} y={chartH + 18}
            fill={COLORS.textMuted} fontSize={9} fontFamily="Barlow" textAnchor="middle"
          >
            Väylät {g}
          </text>
        ))}

        {/* Legend */}
        <g transform={`translate(0, ${chartH + 26})`}>
          <circle cx={4} cy={2} r={3} fill={COLORS.blueBright} />
          <text x={12} y={5} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Viimeisin kierros</text>
          <circle cx={120} cy={2} r={2} fill={COLORS.textDim} opacity={0.4} />
          <text x={128} y={5} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Aiemmat kierrokset</text>
        </g>
      </g>
    </svg>
  );
}
