"use client";
import type { Matchup } from "@/lib/player";
import type { SkillPoints } from "@/lib/wc26-data";
import { scaleLinear, COLORS } from "@/lib/chart-utils";

interface Props {
  matchups: Matchup[]; // already filtered to eventId, sorted by id
  skillPoints: SkillPoints;
}

export default function CumulativeTeamPointsChart({ matchups, skillPoints }: Props) {
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

  // Build cumulative series: one point per matchup, plus skillipelit
  const t1Cum: number[] = [];
  const t2Cum: number[] = [];
  let c1 = 0, c2 = 0;
  for (const m of sorted) {
    c1 += m.team1_points;
    c2 += m.team2_points;
    t1Cum.push(c1);
    t2Cum.push(c2);
  }
  // Final: add skill points
  const sk1 = skillPoints.team1_ld + skillPoints.team1_ss;
  const sk2 = skillPoints.team2_ld + skillPoints.team2_ss;
  const finalT1 = c1 + sk1;
  const finalT2 = c2 + sk2;
  t1Cum.push(finalT1);
  t2Cum.push(finalT2);

  const labels = sorted.map((_, i) => `${i + 1}. pari`);
  labels.push("Skillipelit");

  const W = 600, H = 240;
  const pad = { top: 24, right: 48, bottom: 44, left: 44 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const n = labels.length;

  const maxVal = Math.max(...t1Cum, ...t2Cum, 1);
  const yMax = Math.ceil(maxVal / 10) * 10 + 5;
  const y = scaleLinear([0, yMax], [chartH, 0]);
  const xStep = chartW / (n - 1);

  const t1Points: [number, number][] = t1Cum.map((v, i) => [i * xStep, y(v)]);
  const t2Points: [number, number][] = t2Cum.map((v, i) => [i * xStep, y(v)]);

  const toPath = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="ctp-t1-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blueTeam} stopOpacity={0.12} />
          <stop offset="100%" stopColor={COLORS.blueTeam} stopOpacity={0.01} />
        </linearGradient>
        <linearGradient id="ctp-t2-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.redTeam} stopOpacity={0.1} />
          <stop offset="100%" stopColor={COLORS.redTeam} stopOpacity={0.01} />
        </linearGradient>
      </defs>
      <g transform={`translate(${pad.left},${pad.top})`}>
        {/* Grid */}
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={0} y1={y(v)} x2={chartW} y2={y(v)} stroke={COLORS.border} strokeWidth={0.5} />
            <text x={-6} y={y(v) + 3} fill={COLORS.textMuted} fontSize={8} fontFamily="Space Mono" textAnchor="end">{v}</text>
          </g>
        ))}

        {/* Fill under lines */}
        <path
          d={`${toPath(t1Points)} L${t1Points[t1Points.length - 1][0].toFixed(1)},${chartH} L0,${chartH} Z`}
          fill="url(#ctp-t1-fill)"
        />
        <path
          d={`${toPath(t2Points)} L${t2Points[t2Points.length - 1][0].toFixed(1)},${chartH} L0,${chartH} Z`}
          fill="url(#ctp-t2-fill)"
        />

        {/* Lines */}
        <path d={toPath(t1Points)} fill="none" stroke={COLORS.blueTeam} strokeWidth={2.5} strokeLinejoin="round" />
        <path d={toPath(t2Points)} fill="none" stroke={COLORS.redTeam} strokeWidth={2.5} strokeLinejoin="round" />

        {/* Dots */}
        {t1Points.map(([x, yv], i) => (
          <circle key={i} cx={x} cy={yv} r={i === t1Points.length - 1 ? 5 : 3}
            fill={i === t1Points.length - 1 ? COLORS.blueTeam : "#fff"}
            stroke={COLORS.blueTeam} strokeWidth={i === t1Points.length - 1 ? 0 : 2}
          />
        ))}
        {t2Points.map(([x, yv], i) => (
          <circle key={i} cx={x} cy={yv} r={i === t2Points.length - 1 ? 5 : 3}
            fill={i === t2Points.length - 1 ? COLORS.redTeam : "#fff"}
            stroke={COLORS.redTeam} strokeWidth={i === t2Points.length - 1 ? 0 : 2}
          />
        ))}

        {/* End labels */}
        <text
          x={t1Points[t1Points.length - 1][0] + 8}
          y={t1Points[t1Points.length - 1][1] + 4}
          fill={COLORS.blueTeam} fontSize={11} fontFamily="Space Mono" fontWeight={700}
        >{finalT1}</text>
        <text
          x={t2Points[t2Points.length - 1][0] + 8}
          y={t2Points[t2Points.length - 1][1] + 4}
          fill={COLORS.redTeam} fontSize={11} fontFamily="Space Mono" fontWeight={700}
        >{finalT2}</text>

        {/* X-axis labels */}
        {labels.map((lbl, i) => (
          <text
            key={i}
            x={i * xStep} y={chartH + 14}
            fill={i === labels.length - 1 ? COLORS.goldBright : COLORS.textMuted}
            fontSize={i === labels.length - 1 ? 8 : 7}
            fontFamily={i === labels.length - 1 ? "Space Mono" : "Barlow"}
            fontWeight={i === labels.length - 1 ? 700 : 400}
            textAnchor="middle"
            transform={`rotate(-30, ${i * xStep}, ${chartH + 14})`}
          >{lbl}</text>
        ))}

        {/* Legend */}
        <g transform={`translate(0, -16)`}>
          <circle cx={6} cy={0} r={4} fill={COLORS.blueTeam} />
          <text x={14} y={4} fill={COLORS.blueTeam} fontSize={8} fontFamily="Space Mono" fontWeight={700}>J1 SINISET</text>
          <circle cx={90} cy={0} r={4} fill={COLORS.redTeam} />
          <text x={98} y={4} fill={COLORS.redTeam} fontSize={8} fontFamily="Space Mono" fontWeight={700}>J2 PUNAISET</text>
        </g>
      </g>
    </svg>
  );
}
