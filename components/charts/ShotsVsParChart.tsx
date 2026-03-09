"use client";

import type { Round } from "@/lib/player";
import { scaleLinear, pointsToPath, COLORS } from "@/lib/chart-utils";

// Average shots per hole grouped by par (3, 4, 5)
export default function ShotsVsParChart({ rounds }: { rounds: Round[] }) {
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

  const parGroups = [3, 4, 5];

  // For each round, compute avg strokes on par-3, par-4, par-5 holes
  const lines = roundsWithHoles.map((r) => {
    const holes = r.holes!;
    return parGroups.map((par) => {
      const matching = holes.filter((h) => h.par === par);
      if (matching.length === 0) return par; // fallback
      return matching.reduce((sum, h) => sum + h.strokes, 0) / matching.length;
    });
  });

  // Average across all rounds
  const avg = parGroups.map((_, pi) => {
    const vals = lines.map((l) => l[pi]);
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  });

  const allVals = lines.flat().concat(avg).concat(parGroups);
  const minVal = Math.min(...allVals) - 0.5;
  const maxVal = Math.max(...allVals) + 0.5;

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
        {/* Par reference line */}
        {parGroups.map((par, i) => (
          <g key={`par-${par}`}>
            <circle cx={x(i)} cy={y(par)} r={3} fill={COLORS.textDim} opacity={0.4} />
          </g>
        ))}
        <path
          d={pointsToPath(parGroups.map((par, i) => [x(i), y(par)] as [number, number]))}
          fill="none" stroke={COLORS.textDim} strokeWidth={1} strokeDasharray="3,3" opacity={0.5}
        />

        {/* Grid */}
        {[2, 3, 4, 5, 6, 7, 8].filter((v) => v >= minVal && v <= maxVal).map((v) => (
          <g key={v}>
            <line x1={0} y1={y(v)} x2={chartW} y2={y(v)} stroke={COLORS.border} strokeWidth={0.3} />
            <text x={-6} y={y(v) + 3} fill={COLORS.textDim} fontSize={7} fontFamily="Space Mono" textAnchor="end">
              {v}
            </text>
          </g>
        ))}

        {/* Individual round lines */}
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
        {parGroups.map((par, i) => (
          <text
            key={i} x={x(i)} y={chartH + 18}
            fill={COLORS.textMuted} fontSize={10} fontFamily="Barlow Condensed" fontWeight={700} textAnchor="middle"
          >
            Par {par}
          </text>
        ))}

        {/* Legend */}
        <g transform={`translate(0, ${chartH + 26})`}>
          <circle cx={4} cy={2} r={3} fill={COLORS.blueBright} />
          <text x={12} y={5} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Viimeisin kierros</text>
          <line x1={115} y1={2} x2={125} y2={2} stroke={COLORS.textDim} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
          <text x={130} y={5} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Par</text>
        </g>
      </g>
    </svg>
  );
}
