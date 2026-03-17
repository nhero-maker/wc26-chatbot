"use client";
import type { TournamentPlayer } from "@/lib/player";
import type { PlayerRoundStats } from "@/lib/wc26-data";
import { scaleLinear, COLORS, niceScale } from "@/lib/chart-utils";

interface Props {
  roundStats: PlayerRoundStats[];
  players: TournamentPlayer[];
  eventId: number;
}

export default function EventMVPChart({ roundStats, players, eventId }: Props) {
  const data = roundStats
    .filter((s) => s.eventId === eventId)
    .map((s) => {
      const p = players.find((pl) => pl.name === s.playerName);
      return { name: s.playerName, mvp: s.mvp, team: p?.team ?? 1 };
    })
    .sort((a, b) => b.mvp - a.mvp);

  if (data.length === 0 || data.every((d) => d.mvp === 0)) {
    return (
      <div style={{
        textAlign: "center", padding: "32px", fontFamily: "var(--font-mono)",
        fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em",
      }}>Tulokset lisätään kierroksen jälkeen</div>
    );
  }

  const W = 600, H = 260;
  const pad = { top: 60, right: 16, bottom: 50, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const maxVal = Math.max(...data.map((d) => d.mvp), 1);
  const ticks = niceScale(0, maxVal, 4);
  const yMax = ticks[ticks.length - 1];
  const y = scaleLinear([0, yMax], [chartH, 0]);
  const barW = Math.min(chartW / data.length - 4, 28);

  const top3 = data.slice(0, 3);
  const podiumColors = ["#c9a84c", "#a0a0a0", "#cd7f32"];

  return (
    <div>
      {/* Podium circles */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "12px" }}>
        {top3.map((d, i) => (
          <div key={d.name} style={{ textAlign: "center" }}>
            <div style={{
              width: i === 0 ? 52 : 40, height: i === 0 ? 52 : 40, borderRadius: "50%",
              background: podiumColors[i], display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-mono)", fontSize: i === 0 ? "16px" : "13px", fontWeight: 700,
              color: "#1a1a2e", margin: "0 auto 4px",
            }}>{d.mvp}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
              {d.name.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <g transform={`translate(${pad.left},${pad.top})`}>
          {ticks.map((v) => (
            <g key={v}>
              <line x1={0} y1={y(v)} x2={chartW} y2={y(v)} stroke={COLORS.border} strokeWidth={0.5} />
              <text x={-6} y={y(v) + 3} fill={COLORS.textMuted} fontSize={8} fontFamily="Space Mono" textAnchor="end">{v}</text>
            </g>
          ))}
          {data.map((d, i) => {
            const x = (chartW / data.length) * i + (chartW / data.length - barW) / 2;
            const barColor = d.team === 1 ? COLORS.blueTeam : COLORS.redTeam;
            const bH = chartH - y(d.mvp);
            return (
              <g key={d.name}>
                <rect x={x} y={y(d.mvp)} width={barW} height={bH} fill={barColor} fillOpacity={0.8} rx={2} />
                <text x={x + barW/2} y={y(d.mvp) - 3} fill={barColor} fontSize={9} fontFamily="Space Mono" fontWeight={700} textAnchor="middle">{d.mvp}</text>
                <text x={x + barW/2} y={chartH + 14} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow" textAnchor="middle" transform={`rotate(-35, ${x + barW/2}, ${chartH + 14})`}>
                  {d.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
