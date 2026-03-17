"use client";
import type { Matchup, TournamentEvent } from "@/lib/player";
import type { SkillPoints } from "@/lib/wc26-data";
import { scaleLinear, COLORS } from "@/lib/chart-utils";

interface Props {
  matchups: Matchup[];
  skillPoints: SkillPoints[];
  events: TournamentEvent[];
}

export default function CrossRoundProgressionChart({ matchups, skillPoints, events }: Props) {
  // For each event, compute match points + skill points
  // Only include events with at least some scoring data
  interface RoundTotal { eventId: number; name: string; t1: number; t2: number; }
  const rounds: RoundTotal[] = [];
  let cumT1 = 0, cumT2 = 0;

  const cumulativePoints: Array<{ eventId: number; name: string; t1: number; t2: number }> = [];

  for (const ev of events) {
    const evMatchups = matchups.filter((m) => m.event_id === ev.id);
    const hasScores = evMatchups.some((m) => m.team1_points > 0 || m.team2_points > 0);
    if (!hasScores) break; // stop at first incomplete round

    const matchT1 = evMatchups.reduce((s, m) => s + m.team1_points, 0);
    const matchT2 = evMatchups.reduce((s, m) => s + m.team2_points, 0);
    const sp = skillPoints.find((sk) => sk.eventId === ev.id);
    const sk1 = sp ? sp.team1_ld + sp.team1_ss : 0;
    const sk2 = sp ? sp.team2_ld + sp.team2_ss : 0;
    cumT1 += matchT1 + sk1;
    cumT2 += matchT2 + sk2;
    cumulativePoints.push({ eventId: ev.id, name: ev.course_name, t1: cumT1, t2: cumT2 });
  }

  if (cumulativePoints.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px", fontFamily: "var(--font-mono)",
        fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em",
      }}>
        Tulokset lisätään kierrosten jälkeen
      </div>
    );
  }

  // We always show all 6 x-axis labels, but only plot where data exists
  const allLabels = events.map((e) => e.course_name);
  const n = allLabels.length;
  const completedCount = cumulativePoints.length;

  const W = 620, H = 240;
  const pad = { top: 28, right: 56, bottom: 50, left: 48 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const maxVal = Math.max(...cumulativePoints.map((p) => Math.max(p.t1, p.t2)), 1);
  const yMax = Math.ceil(maxVal / 50) * 50 + 25;
  const y = scaleLinear([0, yMax], [chartH, 0]);
  const xStep = chartW / (n - 1);

  const t1Pts = cumulativePoints.map((p, i) => [i * xStep, y(p.t1)] as [number, number]);
  const t2Pts = cumulativePoints.map((p, i) => [i * xStep, y(p.t2)] as [number, number]);

  const toPath = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  const yTicks = Array.from({ length: 6 }, (_, i) => Math.round((yMax / 5) * i));

  // Short course labels for x-axis
  const shortLabels: Record<string, string> = {
    "Lofoten Links": "Lofoten",
    "Marco Simone": "Marco S.",
    "Evian Resort": "Evian",
    "Real Club Valderrama": "Valderrama",
    "St Andrews Old Course": "St Andrews",
    "Grande Finale": "FINAALI",
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="crp-t1-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.blueTeam} stopOpacity={0.1} />
          <stop offset="100%" stopColor={COLORS.blueTeam} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="crp-t2-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.redTeam} stopOpacity={0.08} />
          <stop offset="100%" stopColor={COLORS.redTeam} stopOpacity={0} />
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

        {/* X-axis markers for all 6 rounds */}
        {allLabels.map((lbl, i) => {
          const x = i * xStep;
          const isCompleted = i < completedCount;
          const label = shortLabels[lbl] ?? lbl;
          const isFinal = lbl === "Grande Finale";
          return (
            <g key={i}>
              <line x1={x} y1={0} x2={x} y2={chartH}
                stroke={isCompleted ? COLORS.border : COLORS.border}
                strokeWidth={0.5} strokeDasharray={isCompleted ? "none" : "3,3"} />
              <text x={x} y={chartH + 14} fill={isFinal ? COLORS.goldBright : isCompleted ? COLORS.textMuted : COLORS.textDim}
                fontSize={isFinal ? 8 : 7}
                fontFamily={isFinal ? "Space Mono" : "Barlow"}
                fontWeight={isFinal ? 700 : 400}
                textAnchor="middle"
                transform={`rotate(-25, ${x}, ${chartH + 14})`}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Fills */}
        {t1Pts.length > 1 && (
          <path
            d={`${toPath(t1Pts)} L${t1Pts[t1Pts.length - 1][0].toFixed(1)},${chartH} L0,${chartH} Z`}
            fill="url(#crp-t1-fill)"
          />
        )}
        {t2Pts.length > 1 && (
          <path
            d={`${toPath(t2Pts)} L${t2Pts[t2Pts.length - 1][0].toFixed(1)},${chartH} L0,${chartH} Z`}
            fill="url(#crp-t2-fill)"
          />
        )}

        {/* Lines */}
        <path d={toPath(t1Pts)} fill="none" stroke={COLORS.blueTeam} strokeWidth={2.5} strokeLinejoin="round" />
        <path d={toPath(t2Pts)} fill="none" stroke={COLORS.redTeam} strokeWidth={2.5} strokeLinejoin="round" />

        {/* Dots + labels at each data point */}
        {t1Pts.map(([x, yv], i) => (
          <g key={i}>
            <circle cx={x} cy={yv} r={5} fill={COLORS.blueTeam} />
            <text x={x} y={yv - 9} fill={COLORS.blueTeam} fontSize={9} fontFamily="Space Mono"
              fontWeight={700} textAnchor="middle">
              {cumulativePoints[i].t1}
            </text>
          </g>
        ))}
        {t2Pts.map(([x, yv], i) => (
          <g key={i}>
            <circle cx={x} cy={yv} r={5} fill={COLORS.redTeam} />
            <text x={x} y={yv + 17} fill={COLORS.redTeam} fontSize={9} fontFamily="Space Mono"
              fontWeight={700} textAnchor="middle">
              {cumulativePoints[i].t2}
            </text>
          </g>
        ))}

        {/* Future round placeholders */}
        {Array.from({ length: n - completedCount }, (_, i) => {
          const idx = completedCount + i;
          const x = idx * xStep;
          return (
            <text key={idx} x={x} y={chartH / 2} fill={COLORS.textDim} fontSize={7}
              fontFamily="Barlow" textAnchor="middle">
              –
            </text>
          );
        })}

        {/* Legend */}
        <g transform={`translate(0,-18)`}>
          <circle cx={6} cy={0} r={4} fill={COLORS.blueTeam} />
          <text x={14} y={4} fill={COLORS.blueTeam} fontSize={8} fontFamily="Space Mono" fontWeight={700}>J1 SINISET</text>
          <circle cx={90} cy={0} r={4} fill={COLORS.redTeam} />
          <text x={98} y={4} fill={COLORS.redTeam} fontSize={8} fontFamily="Space Mono" fontWeight={700}>J2 PUNAISET</text>
        </g>
      </g>
    </svg>
  );
}
