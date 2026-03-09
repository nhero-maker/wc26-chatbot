"use client";

import type { Round } from "@/lib/player";
import { COLORS } from "@/lib/chart-utils";

export default function DriveArcViz({ rounds }: { rounds: Round[] }) {
  const drives = rounds
    .filter((r) => r.longest_drive != null && r.longest_drive > 0)
    .sort((a, b) => a.date_played.localeCompare(b.date_played))
    .map((r) => ({
      distance: r.longest_drive!,
      course: r.course_name ?? r.course_name_custom ?? "?",
    }));

  if (drives.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        Ei draividata
      </div>
    );
  }

  const maxDrive = Math.max(...drives.map((d) => d.distance));
  const bestIdx = drives.findIndex((d) => d.distance === maxDrive);

  const W = 400;
  const H = 200;
  const groundY = H - 30;
  const startX = 40;
  const endX = W - 20;
  const rangeX = endX - startX;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <filter id="glow-drive">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ground line */}
      <line
        x1={startX} y1={groundY} x2={endX} y2={groundY}
        stroke={COLORS.border} strokeWidth={1}
      />

      {/* Golfer silhouette (simple) */}
      <g transform={`translate(${startX - 10}, ${groundY - 35})`} opacity={0.3}>
        <circle cx={8} cy={4} r={4} fill={COLORS.blueBright} />
        <line x1={8} y1={8} x2={8} y2={22} stroke={COLORS.blueBright} strokeWidth={2} />
        <line x1={8} y1={14} x2={3} y2={20} stroke={COLORS.blueBright} strokeWidth={1.5} />
        <line x1={8} y1={14} x2={16} y2={10} stroke={COLORS.blueBright} strokeWidth={1.5} />
        <line x1={8} y1={22} x2={3} y2={30} stroke={COLORS.blueBright} strokeWidth={1.5} />
        <line x1={8} y1={22} x2={13} y2={30} stroke={COLORS.blueBright} strokeWidth={1.5} />
      </g>

      {/* Drive arcs */}
      {drives.map((d, i) => {
        const ratio = d.distance / maxDrive;
        const landX = startX + rangeX * ratio;
        const peakY = groundY - 60 - ratio * 60;
        const peakX = startX + (landX - startX) * 0.45;
        const isBest = i === bestIdx;
        const opacity = isBest ? 1 : 0.4 + (i / drives.length) * 0.3;
        const color = isBest ? COLORS.goldBright : COLORS.blueBright;

        return (
          <g key={i}>
            <path
              d={`M${startX},${groundY} Q${peakX},${peakY} ${landX},${groundY}`}
              fill="none"
              stroke={color}
              strokeWidth={isBest ? 2.5 : 1.5}
              opacity={opacity}
              filter={isBest ? "url(#glow-drive)" : undefined}
            />
            {/* Landing dot */}
            <circle
              cx={landX} cy={groundY} r={isBest ? 4 : 2.5}
              fill={color} opacity={opacity}
            />
            {/* Distance label */}
            <text
              x={peakX + 5} y={peakY - 4}
              fill={color} fontSize={isBest ? 11 : 9}
              fontFamily="Barlow Condensed" fontWeight={isBest ? 900 : 600}
              opacity={opacity}
            >
              {d.distance} m
            </text>
          </g>
        );
      })}

      {/* Scale markers */}
      {[100, 200, 300].filter((v) => v <= maxDrive + 30).map((v) => {
        const x = startX + rangeX * (v / maxDrive);
        return (
          <g key={v}>
            <line x1={x} y1={groundY} x2={x} y2={groundY + 4} stroke={COLORS.textMuted} strokeWidth={0.5} />
            <text
              x={x} y={groundY + 14}
              fill={COLORS.textMuted} fontSize={7} fontFamily="Space Mono" textAnchor="middle"
            >
              {v}m
            </text>
          </g>
        );
      })}
    </svg>
  );
}
