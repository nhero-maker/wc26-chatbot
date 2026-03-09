"use client";

import type { Round } from "@/lib/player";
import { COLORS } from "@/lib/chart-utils";

export default function PinTargetViz({ rounds }: { rounds: Round[] }) {
  const pins = rounds
    .filter((r) => r.closest_to_pin != null && r.closest_to_pin > 0)
    .sort((a, b) => a.date_played.localeCompare(b.date_played))
    .map((r) => ({
      distance: r.closest_to_pin!,
      course: r.course_name ?? r.course_name_custom ?? "?",
    }));

  if (pins.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        Ei lähimmäs lippua -dataa
      </div>
    );
  }

  const best = Math.min(...pins.map((p) => p.distance));
  const maxDist = Math.max(...pins.map((p) => p.distance), 500);

  const W = 300;
  const H = 300;
  const cx = W / 2;
  const cy = H / 2;
  const maxRadius = 120;

  const rings = [50, 100, 200, 500].filter((v) => v <= maxDist + 100);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <filter id="glow-pin">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="target-gradient">
          <stop offset="0%" stopColor={COLORS.blueMid} stopOpacity={0.15} />
          <stop offset="100%" stopColor={COLORS.blueMid} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx={cx} cy={cy} r={maxRadius} fill="url(#target-gradient)" />

      {/* Concentric rings */}
      {rings.map((dist) => {
        const r = (dist / maxDist) * maxRadius;
        return (
          <g key={dist}>
            <circle
              cx={cx} cy={cy} r={r}
              fill="none" stroke={COLORS.border} strokeWidth={0.7}
              strokeDasharray="3,3"
            />
            <text
              x={cx + r + 4} y={cy - 2}
              fill={COLORS.textDim} fontSize={7} fontFamily="Space Mono"
            >
              {dist} cm
            </text>
          </g>
        );
      })}

      {/* Center flag */}
      <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 2} stroke={COLORS.textMuted} strokeWidth={1} />
      <polygon
        points={`${cx},${cy - 12} ${cx + 8},${cy - 8} ${cx},${cy - 4}`}
        fill={COLORS.redBright} opacity={0.7}
      />
      <circle cx={cx} cy={cy} r={2} fill={COLORS.text} />

      {/* Pin dots */}
      {pins.map((p, i) => {
        const isBest = p.distance === best;
        const r = (p.distance / maxDist) * maxRadius;
        // Spread dots around the circle
        const angle = (i / pins.length) * Math.PI * 2 - Math.PI / 2;
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        const color = isBest ? COLORS.goldBright : COLORS.blueBright;

        return (
          <g key={i}>
            <circle
              cx={px} cy={py}
              r={isBest ? 6 : 4}
              fill={color}
              opacity={isBest ? 1 : 0.6}
              filter={isBest ? "url(#glow-pin)" : undefined}
            />
            <text
              x={px} y={py - (isBest ? 10 : 7)}
              fill={color} fontSize={isBest ? 10 : 8}
              fontFamily="Barlow Condensed" fontWeight={isBest ? 900 : 600}
              textAnchor="middle"
              opacity={isBest ? 1 : 0.7}
            >
              {p.distance} cm
            </text>
          </g>
        );
      })}
    </svg>
  );
}
