"use client";

import { COLORS } from "@/lib/chart-utils";

interface Props {
  team1Total: number;
  team2Total: number;
}

export default function TeamScoreCircles({ team1Total, team2Total }: Props) {
  const W = 420;
  const H = 210;
  const r = 60;
  const cx1 = W * 0.25;
  const cx2 = W * 0.75;
  const cy = 95;

  const t1Wins = team1Total > team2Total;
  const t2Wins = team2Total > team1Total;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="team1-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={COLORS.blueTeamGlow} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="team2-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={COLORS.redTeamGlow} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Team 1 glow */}
      <circle cx={cx1} cy={cy} r={r + 20} fill="url(#team1-glow)" />
      {/* Team 1 circle */}
      <circle
        cx={cx1} cy={cy} r={r}
        fill={COLORS.surface2}
        stroke={COLORS.blueTeam}
        strokeWidth={t1Wins ? 3.5 : 2}
        opacity={t1Wins ? 1 : 0.7}
      />
      {/* Score */}
      <text
        x={cx1} y={cy - 6}
        fill={COLORS.blueTeam}
        fontSize={38} fontFamily="var(--font-display)" fontWeight={900}
        textAnchor="middle" dominantBaseline="central"
      >
        {team1Total}
      </text>
      {/* PISTETTÄ label */}
      <text
        x={cx1} y={cy + 26}
        fill={COLORS.textMuted}
        fontSize={9} fontFamily="Space Mono" fontWeight={700}
        textAnchor="middle"
        letterSpacing="2"
      >
        PISTETTÄ
      </text>
      {/* Team name */}
      <text
        x={cx1} y={cy + r + 22}
        fill={COLORS.blueTeam}
        fontSize={12} fontFamily="Space Mono" fontWeight={700}
        textAnchor="middle"
        letterSpacing="2"
      >
        SINISET
      </text>

      {/* Team 2 glow */}
      <circle cx={cx2} cy={cy} r={r + 20} fill="url(#team2-glow)" />
      {/* Team 2 circle */}
      <circle
        cx={cx2} cy={cy} r={r}
        fill={COLORS.surface2}
        stroke={COLORS.redTeam}
        strokeWidth={t2Wins ? 3.5 : 2}
        opacity={t2Wins ? 1 : 0.7}
      />
      {/* Score */}
      <text
        x={cx2} y={cy - 6}
        fill={COLORS.redTeam}
        fontSize={38} fontFamily="var(--font-display)" fontWeight={900}
        textAnchor="middle" dominantBaseline="central"
      >
        {team2Total}
      </text>
      {/* PISTETTÄ label */}
      <text
        x={cx2} y={cy + 26}
        fill={COLORS.textMuted}
        fontSize={9} fontFamily="Space Mono" fontWeight={700}
        textAnchor="middle"
        letterSpacing="2"
      >
        PISTETTÄ
      </text>
      {/* Team name */}
      <text
        x={cx2} y={cy + r + 22}
        fill={COLORS.redTeam}
        fontSize={12} fontFamily="Space Mono" fontWeight={700}
        textAnchor="middle"
        letterSpacing="2"
      >
        PUNAISET
      </text>

      {/* VS divider */}
      <text
        x={W / 2} y={cy}
        fill={COLORS.textDim}
        fontSize={13} fontFamily="Space Mono" fontWeight={700}
        textAnchor="middle" dominantBaseline="central"
        opacity={0.6}
      >
        VS
      </text>
    </svg>
  );
}
