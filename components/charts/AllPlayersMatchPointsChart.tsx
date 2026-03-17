"use client";
import type { Matchup } from "@/lib/player";
import type { SkillPoints } from "@/lib/wc26-data";
import { scaleLinear, COLORS, niceScale } from "@/lib/chart-utils";

interface Props {
  matchups: Matchup[]; // sorted by id, filtered to eventId
  skillPoints: SkillPoints;
}

export default function AllPlayersMatchPointsChart({ matchups, skillPoints }: Props) {
  const sorted = [...matchups].sort((a, b) => a.id - b.id);
  const hasScores = sorted.some((m) => m.team1_points > 0 || m.team2_points > 0);

  if (!hasScores) {
    return (
      <div style={{
        textAlign: "center", padding: "32px", fontFamily: "var(--font-mono)",
        fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em",
      }}>
        Tulokset lisätään kierroksen jälkeen
      </div>
    );
  }

  // Build bar data: each matchup produces 2 bars (J1 player, J2 player)
  interface BarItem {
    label: string;
    value: number;
    team: 1 | 2;
    matchupIdx: number;
    isSkill?: boolean;
  }

  const bars: BarItem[] = [];
  sorted.forEach((m, mi) => {
    bars.push({ label: m.t1p1, value: m.team1_points, team: 1, matchupIdx: mi });
    bars.push({ label: m.t2p1, value: m.team2_points, team: 2, matchupIdx: mi });
  });
  // Skillipelit bars
  const skIdx = sorted.length;
  const sk1 = skillPoints.team1_ld + skillPoints.team1_ss;
  const sk2 = skillPoints.team2_ld + skillPoints.team2_ss;
  bars.push({ label: "Skilli J1", value: sk1, team: 1, matchupIdx: skIdx, isSkill: true });
  bars.push({ label: "Skilli J2", value: sk2, team: 2, matchupIdx: skIdx, isSkill: true });

  const maxVal = Math.max(...bars.map((b) => b.value), 1);
  const ticks = niceScale(0, maxVal, 5);
  const yMax = ticks[ticks.length - 1];

  const W = 700;
  const H = 260;
  const pad = { top: 24, right: 16, bottom: 56, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  // Each matchup group occupies a slot; bars are 2 per group with a small gap
  const groupCount = sorted.length + 1; // +1 for skill
  const groupW = chartW / groupCount;
  const barW = Math.min(groupW * 0.38, 18);
  const barGap = 2;

  const y = scaleLinear([0, yMax], [chartH, 0]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <g transform={`translate(${pad.left},${pad.top})`}>
        {/* Grid */}
        {ticks.map((v) => (
          <g key={v}>
            <line x1={0} y1={y(v)} x2={chartW} y2={y(v)} stroke={COLORS.border} strokeWidth={0.5} />
            <text x={-6} y={y(v) + 3} fill={COLORS.textMuted} fontSize={7} fontFamily="Space Mono" textAnchor="end">{v}</text>
          </g>
        ))}

        {/* Bars — pairs */}
        {sorted.map((m, mi) => {
          const cx = groupW * mi + groupW / 2;
          const b1x = cx - barW - barGap / 2;
          const b2x = cx + barGap / 2;
          const h1 = chartH - y(m.team1_points);
          const h2 = chartH - y(m.team2_points);

          return (
            <g key={m.id}>
              {/* J1 bar */}
              <rect x={b1x} y={y(m.team1_points)} width={barW} height={Math.max(h1, 1)}
                fill={COLORS.blueTeam} fillOpacity={0.85} rx={2} />
              {m.team1_points > 0 && (
                <text x={b1x + barW / 2} y={y(m.team1_points) - 3}
                  fill={COLORS.blueTeam} fontSize={7} fontFamily="Space Mono" fontWeight={700} textAnchor="middle">
                  {m.team1_points}
                </text>
              )}
              {/* J2 bar */}
              <rect x={b2x} y={y(m.team2_points)} width={barW} height={Math.max(h2, 1)}
                fill={COLORS.redTeam} fillOpacity={0.85} rx={2} />
              {m.team2_points > 0 && (
                <text x={b2x + barW / 2} y={y(m.team2_points) - 3}
                  fill={COLORS.redTeam} fontSize={7} fontFamily="Space Mono" fontWeight={700} textAnchor="middle">
                  {m.team2_points}
                </text>
              )}
              {/* Pair separator dot */}
              {mi < sorted.length - 1 && (
                <circle cx={cx + groupW / 2} cy={chartH / 2} r={1.5} fill={COLORS.greyLight} />
              )}
              {/* X label */}
              <text x={cx} y={chartH + 14} fill={COLORS.textMuted} fontSize={6} fontFamily="Barlow"
                textAnchor="middle" transform={`rotate(-30, ${cx}, ${chartH + 14})`}>
                {m.t1p1} / {m.t2p1}
              </text>
            </g>
          );
        })}

        {/* Skillipelit bars */}
        {(() => {
          const cx = groupW * skIdx + groupW / 2;
          const b1x = cx - barW - barGap / 2;
          const b2x = cx + barGap / 2;
          const h1 = chartH - y(sk1);
          const h2 = chartH - y(sk2);
          return (
            <g>
              <rect x={b1x - 1} y={y(sk1) - 1} width={barW + 2} height={Math.max(h1, 1) + 2}
                fill="none" stroke={COLORS.goldBright} strokeWidth={1} rx={2} />
              <rect x={b1x} y={y(sk1)} width={barW} height={Math.max(h1, 1)}
                fill={COLORS.blueTeam} fillOpacity={0.6} rx={2} />
              {sk1 > 0 && (
                <text x={b1x + barW / 2} y={y(sk1) - 6}
                  fill={COLORS.goldBright} fontSize={7} fontFamily="Space Mono" fontWeight={700} textAnchor="middle">
                  {sk1}
                </text>
              )}
              <rect x={b2x - 1} y={y(sk2) - 1} width={barW + 2} height={Math.max(h2, 1) + 2}
                fill="none" stroke={COLORS.goldBright} strokeWidth={1} rx={2} />
              <rect x={b2x} y={y(sk2)} width={barW} height={Math.max(h2, 1)}
                fill={COLORS.redTeam} fillOpacity={0.6} rx={2} />
              {sk2 > 0 && (
                <text x={b2x + barW / 2} y={y(sk2) - 6}
                  fill={COLORS.goldBright} fontSize={7} fontFamily="Space Mono" fontWeight={700} textAnchor="middle">
                  {sk2}
                </text>
              )}
              <text x={cx} y={chartH + 14} fill={COLORS.goldBright} fontSize={6.5} fontFamily="Space Mono"
                fontWeight={700} textAnchor="middle">
                SKILLI
              </text>
            </g>
          );
        })()}

        {/* Legend */}
        <g transform={`translate(0,-14)`}>
          <rect x={0} y={-7} width={10} height={10} fill={COLORS.blueTeam} rx={1} />
          <text x={14} y={2} fill={COLORS.textMuted} fontSize={7} fontFamily="Space Mono">J1 SINISET</text>
          <rect x={85} y={-7} width={10} height={10} fill={COLORS.redTeam} rx={1} />
          <text x={99} y={2} fill={COLORS.textMuted} fontSize={7} fontFamily="Space Mono">J2 PUNAISET</text>
        </g>
      </g>
    </svg>
  );
}
