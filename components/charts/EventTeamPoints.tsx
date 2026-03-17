"use client";
import type { Matchup } from "@/lib/player";
import TeamScoreCircles from "@/components/charts/TeamScoreCircles";
import { scaleLinear, COLORS, niceScale } from "@/lib/chart-utils";

interface Props {
  matchups: Matchup[];
  eventId: number;
  format: "fourball" | "singles";
}

export default function EventTeamPoints({ matchups, eventId, format }: Props) {
  const filtered = matchups.filter((m) => m.event_id === eventId);
  const t1Total = filtered.reduce((s, m) => s + m.team1_points, 0);
  const t2Total = filtered.reduce((s, m) => s + m.team2_points, 0);
  const allZero = t1Total === 0 && t2Total === 0;

  if (allZero) {
    return (
      <div style={{
        textAlign: "center", padding: "32px", fontFamily: "var(--font-mono)",
        fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em",
      }}>Tulokset lisätään kierroksen jälkeen</div>
    );
  }

  const data = filtered
    .filter((m) => m.team1_points > 0 || m.team2_points > 0)
    .map((m) => ({
      label: format === "fourball"
        ? `${m.t1p1}/${m.t1p2 ?? ""} vs ${m.t2p1}/${m.t2p2 ?? ""}`
        : `${m.t1p1} vs ${m.t2p1}`,
      t1: m.team1_points,
      t2: m.team2_points,
    }));

  const maxPts = Math.max(...data.flatMap((d) => [d.t1, d.t2]), 1);
  const ticks = niceScale(0, maxPts, 4);
  const yMax = ticks[ticks.length - 1];
  const W = 500, H = 220;
  const pad = { top: 20, right: 10, bottom: 55, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const y = scaleLinear([0, yMax], [chartH, 0]);
  const groupWidth = chartW / Math.max(data.length, 1);
  const barWidth = Math.min(groupWidth * 0.3, 26);
  const gap = 4;

  return (
    <div>
      <TeamScoreCircles team1Total={t1Total} team2Total={t2Total} />
      {data.length > 0 && (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", marginTop: "12px" }}>
          <defs>
            <linearGradient id="etp-t1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.blueTeam} stopOpacity={0.95} />
              <stop offset="100%" stopColor={COLORS.blueTeam} stopOpacity={0.55} />
            </linearGradient>
            <linearGradient id="etp-t2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.redTeam} stopOpacity={0.95} />
              <stop offset="100%" stopColor={COLORS.redTeam} stopOpacity={0.55} />
            </linearGradient>
          </defs>
          <g transform={`translate(${pad.left},${pad.top})`}>
            {ticks.map((v) => (
              <g key={v}>
                <line x1={0} y1={y(v)} x2={chartW} y2={y(v)} stroke={COLORS.border} strokeWidth={0.5} />
                <text x={-6} y={y(v) + 3} fill={COLORS.textMuted} fontSize={8} fontFamily="Space Mono" textAnchor="end">{v}</text>
              </g>
            ))}
            {data.map((d, i) => {
              const cx = groupWidth * i + groupWidth / 2;
              const t1x = cx - barWidth - gap / 2;
              const t2x = cx + gap / 2;
              return (
                <g key={i}>
                  <rect x={t1x} y={y(d.t1)} width={barWidth} height={chartH - y(d.t1)} fill="url(#etp-t1)" rx={2} />
                  <text x={t1x + barWidth/2} y={y(d.t1) - 4} fill={COLORS.blueTeam} fontSize={8} fontFamily="Space Mono" fontWeight={700} textAnchor="middle">{d.t1}</text>
                  <rect x={t2x} y={y(d.t2)} width={barWidth} height={chartH - y(d.t2)} fill="url(#etp-t2)" rx={2} />
                  <text x={t2x + barWidth/2} y={y(d.t2) - 4} fill={COLORS.redTeam} fontSize={8} fontFamily="Space Mono" fontWeight={700} textAnchor="middle">{d.t2}</text>
                  <text x={cx} y={chartH + 14} fill={COLORS.textMuted} fontSize={6} fontFamily="Barlow" textAnchor="middle" transform={`rotate(-20, ${cx}, ${chartH + 14})`}>
                    {d.label.length > 22 ? d.label.slice(0, 20) + "…" : d.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      )}
    </div>
  );
}
