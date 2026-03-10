"use client";

import { scaleLinear, COLORS, niceScale } from "@/lib/chart-utils";

interface Props {
  grossScores: { name: string; total: number }[];
  highlightPlayer?: string;
}

export default function RankingHistogram({ grossScores, highlightPlayer }: Props) {
  if (grossScores.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        No score data
      </div>
    );
  }

  // Sort ascending by total (best score = position 1)
  const sorted = [...grossScores].sort((a, b) => a.total - b.total);
  const maxPos = Math.min(sorted.length, 24);
  const data = sorted.slice(0, maxPos);

  const scores = data.map((d) => d.total);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const ticks = niceScale(minScore - 5, maxScore, 4);
  const yMin = ticks[0];
  const yMax = ticks[ticks.length - 1];

  const W = 400;
  const H = 220;
  const pad = { top: 15, right: 10, bottom: 40, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const y = scaleLinear([yMin, yMax], [chartH, 0]);
  const barGroupW = chartW / maxPos;
  const barWidth = Math.min(barGroupW * 0.7, 14);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="rh-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blueBright} />
          <stop offset="100%" stopColor={COLORS.blueMid} />
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
              fill={COLORS.textMuted} fontSize={7} fontFamily="Space Mono" textAnchor="end"
            >
              {v}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const isHighlight = highlightPlayer != null && d.name === highlightPlayer;
          const cx = barGroupW * i + barGroupW / 2;
          const bx = cx - barWidth / 2;
          const barH = chartH - y(d.total);

          return (
            <g key={i}>
              <rect
                x={bx} y={y(d.total)}
                width={barWidth} height={barH}
                fill={isHighlight ? "url(#rh-highlight)" : COLORS.textDim}
                rx={2}
                opacity={isHighlight ? 1 : 0.35}
              />

              {/* Score label on highlighted bar */}
              {isHighlight && (
                <text
                  x={cx} y={y(d.total) - 5}
                  fill={COLORS.blueBright} fontSize={9} fontFamily="Barlow Condensed"
                  fontWeight={700} textAnchor="middle"
                >
                  {d.total}
                </text>
              )}

              {/* Position number on x-axis */}
              <text
                x={cx} y={chartH + 12}
                fill={isHighlight ? COLORS.blueBright : COLORS.textMuted}
                fontSize={7} fontFamily="Space Mono" textAnchor="middle"
                fontWeight={isHighlight ? 700 : 400}
              >
                {i + 1}
              </text>

              {/* Player name under highlighted position */}
              {isHighlight && (
                <text
                  x={cx} y={chartH + 22}
                  fill={COLORS.blueBright} fontSize={6} fontFamily="Barlow"
                  textAnchor="middle"
                >
                  {d.name.length > 12 ? d.name.slice(0, 10) + "…" : d.name}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
