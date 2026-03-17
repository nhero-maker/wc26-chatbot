"use client";
import type { TournamentPlayer } from "@/lib/player";
import type { PlayerRoundScorecard } from "@/lib/wc26-data";
import { scaleLinear, COLORS, niceScale } from "@/lib/chart-utils";

interface Props {
  scorecards: PlayerRoundScorecard[];
  players: TournamentPlayer[];
  eventId: number;
  mode: "gross" | "net";
  prevEventId?: number;
}

export default function EventStrokeLeaderboard({ scorecards, players, eventId, mode, prevEventId }: Props) {
  const filtered = scorecards.filter((sc) => sc.eventId === eventId);
  if (filtered.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px", fontFamily: "var(--font-mono)",
        fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em",
      }}>Tulokset lisätään kierroksen jälkeen</div>
    );
  }

  const data = filtered
    .map((sc) => {
      const p = players.find((pl) => pl.name === sc.playerName);
      const hcp = p?.handicap ?? 0;
      const score = mode === "gross" ? sc.gross : sc.gross - Math.floor(hcp * 0.5);
      return { name: sc.playerName, score, team: p?.team ?? 1 };
    })
    .sort((a, b) => a.score - b.score);

  // Dense rank
  let rank = 1;
  const ranked = data.map((d, i) => {
    if (i > 0 && d.score > data[i - 1].score) rank = i + 1;
    return { ...d, rank };
  });

  // Previous event ranks (for rank-change row)
  const prevRanked: Map<string, number> = new Map();
  if (prevEventId !== undefined) {
    const prevFiltered = scorecards.filter((sc) => sc.eventId === prevEventId);
    const prevData = prevFiltered
      .map((sc) => {
        const p = players.find((pl) => pl.name === sc.playerName);
        const hcp = p?.handicap ?? 0;
        const score = mode === "gross" ? sc.gross : sc.gross - Math.floor(hcp * 0.5);
        return { name: sc.playerName, score };
      })
      .sort((a, b) => a.score - b.score);
    let pr = 1;
    prevData.forEach((d, i) => {
      if (i > 0 && d.score > prevData[i - 1].score) pr = i + 1;
      prevRanked.set(d.name, pr);
    });
  }

  const W = 600, H = 280;
  const pad = { top: 70, right: 16, bottom: 55, left: 44 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const minVal = Math.min(...data.map((d) => d.score));
  const maxVal = Math.max(...data.map((d) => d.score));
  const yBase = Math.max(0, Math.floor(minVal / 5) * 5 - 5);
  const ticks = niceScale(yBase, maxVal + 2, 5);
  const yMax = ticks[ticks.length - 1];
  const y = scaleLinear([yBase, yMax], [chartH, 0]);
  const barW = Math.min(chartW / data.length - 3, 26);

  const top3 = ranked.slice(0, 3);
  const podiumColors = ["#c9a84c", "#a0a0a0", "#cd7f32"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "12px" }}>
        {top3.map((d, i) => (
          <div key={d.name} style={{ textAlign: "center" }}>
            <div style={{
              width: i === 0 ? 52 : 40, height: i === 0 ? 52 : 40, borderRadius: "50%",
              background: podiumColors[i], display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-mono)", fontSize: i === 0 ? "16px" : "13px", fontWeight: 700,
              color: "#1a1a2e", margin: "0 auto 4px",
            }}>{d.score}</div>
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
          {ranked.map((d, i) => {
            const x = (chartW / ranked.length) * i + (chartW / ranked.length - barW) / 2;
            const barColor = d.team === 1 ? COLORS.blueTeam : COLORS.redTeam;
            const bH = chartH - y(d.score);
            return (
              <g key={d.name}>
                <rect x={x} y={y(d.score)} width={barW} height={Math.max(bH, 2)} fill={barColor} fillOpacity={0.8} rx={2} />
                <text x={x + barW/2} y={y(d.score) - 3} fill={barColor} fontSize={8} fontFamily="Space Mono" fontWeight={700} textAnchor="middle">{d.score}</text>
                <text x={x + barW/2} y={chartH + 14} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow" textAnchor="middle" transform={`rotate(-35, ${x + barW/2}, ${chartH + 14})`}>
                  {d.name}
                </text>
                <text x={x + barW/2} y={chartH + 30} fill={COLORS.textMuted} fontSize={8} fontFamily="Space Mono" textAnchor="middle">#{d.rank}</text>
                {prevEventId !== undefined && (() => {
                  const prev = prevRanked.get(d.name);
                  if (prev === undefined) return (
                    <text x={x + barW/2} y={chartH + 42} fill={COLORS.textDim} fontSize={7} fontFamily="Space Mono" textAnchor="middle">–</text>
                  );
                  const diff = prev - d.rank; // positive = improved
                  const arrow = diff > 0 ? "↑" : diff < 0 ? "↓" : "";
                  const color = diff > 0 ? "#16a34a" : diff < 0 ? COLORS.redTeam : COLORS.textDim;
                  return (
                    <text x={x + barW/2} y={chartH + 42} fill={color} fontSize={7} fontFamily="Space Mono" textAnchor="middle" fontWeight={diff !== 0 ? 700 : 400}>
                      {diff !== 0 ? `${arrow}${Math.abs(diff)}` : "="}
                    </text>
                  );
                })()}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
