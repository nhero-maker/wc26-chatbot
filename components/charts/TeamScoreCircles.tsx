"use client";

import { COLORS } from "@/lib/chart-utils";

interface Props {
  team1Total: number;
  team2Total: number;
}

export default function TeamScoreCircles({ team1Total, team2Total }: Props) {
  const W = 400;
  const H = 200;
  const r = 55;
  const cx1 = W * 0.25;
  const cx2 = W * 0.75;
  const cy = 90;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="team1-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={COLORS.blueGlow} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="team2-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(107, 141, 181, 0.2)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Team 1 circle */}
      <circle cx={cx1} cy={cy} r={r + 12} fill="url(#team1-glow)" />
      <circle
        cx={cx1} cy={cy} r={r}
        fill={COLORS.surface2}
        stroke={COLORS.blueMid}
        strokeWidth={2.5}
      />
      <text
        x={cx1} y={cy - 4}
        fill={COLORS.text}
        fontSize={32} fontFamily="Barlow Condensed" fontWeight={900}
        textAnchor="middle" dominantBaseline="central"
      >
        {team1Total}
      </text>
      <text
        x={cx1} y={cy + 24}
        fill={COLORS.textMuted}
        fontSize={8} fontFamily="Barlow" fontWeight={500}
        textAnchor="middle"
        letterSpacing="1.5"
      >
        PISTETTÄ
      </text>
      <text
        x={cx1} y={cy + r + 20}
        fill={COLORS.blueMid}
        fontSize={11} fontFamily="Barlow Condensed" fontWeight={700}
        textAnchor="middle"
        letterSpacing="2"
      >
        JOUKKUE 1
      </text>

      {/* Team 2 circle */}
      <circle cx={cx2} cy={cy} r={r + 12} fill="url(#team2-glow)" />
      <circle
        cx={cx2} cy={cy} r={r}
        fill={COLORS.surface2}
        stroke={COLORS.blueBright}
        strokeWidth={2.5}
      />
      <text
        x={cx2} y={cy - 4}
        fill={COLORS.text}
        fontSize={32} fontFamily="Barlow Condensed" fontWeight={900}
        textAnchor="middle" dominantBaseline="central"
      >
        {team2Total}
      </text>
      <text
        x={cx2} y={cy + 24}
        fill={COLORS.textMuted}
        fontSize={8} fontFamily="Barlow" fontWeight={500}
        textAnchor="middle"
        letterSpacing="1.5"
      >
        PISTETTÄ
      </text>
      <text
        x={cx2} y={cy + r + 20}
        fill={COLORS.blueBright}
        fontSize={11} fontFamily="Barlow Condensed" fontWeight={700}
        textAnchor="middle"
        letterSpacing="2"
      >
        JOUKKUE 2
      </text>

      {/* VS divider */}
      <text
        x={W / 2} y={cy}
        fill={COLORS.textMuted}
        fontSize={14} fontFamily="Barlow Condensed" fontWeight={700}
        textAnchor="middle" dominantBaseline="central"
        opacity={0.5}
      >
        VS
      </text>
    </svg>
  );
}
