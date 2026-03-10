"use client";

import type { BonusPointEntry, TournamentEvent } from "@/lib/player";
import { scaleLinear, pointsToPath, COLORS } from "@/lib/chart-utils";

interface Props {
  bonusPoints: BonusPointEntry[];
  events: TournamentEvent[];
  playerName?: string;
}

export default function MVPBirdmanChart({ bonusPoints, events, playerName }: Props) {
  const sortedEvents = [...events].sort((a, b) => a.id - b.id);

  if (sortedEvents.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        No event data
      </div>
    );
  }

  // Build series data per event
  const mvpSeries: { eventIdx: number; points: number }[] = [];
  const birdmanSeries: { eventIdx: number; points: number }[] = [];

  if (playerName) {
    // Single player across events
    sortedEvents.forEach((ev, idx) => {
      const mvpPts = bonusPoints
        .filter((bp) => bp.player === playerName && bp.event_id === ev.id && bp.type === "mvp")
        .reduce((sum, bp) => sum + bp.points, 0);
      const birdPts = bonusPoints
        .filter((bp) => bp.player === playerName && bp.event_id === ev.id && bp.type === "birdman")
        .reduce((sum, bp) => sum + bp.points, 0);
      if (mvpPts > 0) mvpSeries.push({ eventIdx: idx, points: mvpPts });
      if (birdPts > 0) birdmanSeries.push({ eventIdx: idx, points: birdPts });
    });
  } else {
    // Aggregate: sum all MVP and birdman points per event
    sortedEvents.forEach((ev, idx) => {
      const mvpPts = bonusPoints
        .filter((bp) => bp.event_id === ev.id && bp.type === "mvp")
        .reduce((sum, bp) => sum + bp.points, 0);
      const birdPts = bonusPoints
        .filter((bp) => bp.event_id === ev.id && bp.type === "birdman")
        .reduce((sum, bp) => sum + bp.points, 0);
      mvpSeries.push({ eventIdx: idx, points: mvpPts });
      birdmanSeries.push({ eventIdx: idx, points: birdPts });
    });
  }

  const allPts = [...mvpSeries, ...birdmanSeries].map((d) => d.points);
  const maxPts = Math.max(...allPts, 1);

  const W = 300;
  const H = 220;
  const pad = { top: 15, right: 15, bottom: 50, left: 35 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const x = scaleLinear([0, Math.max(sortedEvents.length - 1, 1)], [0, chartW]);
  const y = scaleLinear([0, maxPts], [chartH, 0]);

  const mvpLine: [number, number][] = mvpSeries.map((d) => [x(d.eventIdx), y(d.points)]);
  const birdLine: [number, number][] = birdmanSeries.map((d) => [x(d.eventIdx), y(d.points)]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      <defs>
        <filter id="mvpb-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={`translate(${pad.left},${pad.top})`}>
        {/* Y grid */}
        {[0, Math.round(maxPts / 2), maxPts].map((v) => (
          <g key={v}>
            <line
              x1={0} y1={y(v)} x2={chartW} y2={y(v)}
              stroke={COLORS.border} strokeWidth={0.5}
            />
            <text
              x={-6} y={y(v) + 3}
              fill={COLORS.textMuted} fontSize={7} fontFamily="Space Mono" textAnchor="end"
            >
              {v}
            </text>
          </g>
        ))}

        {/* MVP line + dots */}
        {mvpLine.length > 1 && (
          <path
            d={pointsToPath(mvpLine)} fill="none"
            stroke={COLORS.blueMid} strokeWidth={1.5} opacity={0.7}
          />
        )}
        {mvpSeries.map((d, i) => (
          <g key={`mvp-${i}`}>
            <circle
              cx={x(d.eventIdx)} cy={y(d.points)}
              r={4} fill={COLORS.blueMid}
              filter="url(#mvpb-glow)"
            />
            <text
              x={x(d.eventIdx)} y={y(d.points) - 7}
              fill={COLORS.blueMid} fontSize={8} fontFamily="Barlow Condensed"
              fontWeight={700} textAnchor="middle"
            >
              {d.points}
            </text>
          </g>
        ))}

        {/* Birdman line + dots */}
        {birdLine.length > 1 && (
          <path
            d={pointsToPath(birdLine)} fill="none"
            stroke={COLORS.goldBright} strokeWidth={1.5} opacity={0.7}
          />
        )}
        {birdmanSeries.map((d, i) => (
          <g key={`bird-${i}`}>
            <circle
              cx={x(d.eventIdx)} cy={y(d.points)}
              r={4} fill={COLORS.goldBright}
              filter="url(#mvpb-glow)"
            />
            <text
              x={x(d.eventIdx)} y={y(d.points) - 7}
              fill={COLORS.goldBright} fontSize={8} fontFamily="Barlow Condensed"
              fontWeight={700} textAnchor="middle"
            >
              {d.points}
            </text>
          </g>
        ))}

        {/* X-axis labels (course names) */}
        {sortedEvents.map((ev, i) => (
          <text
            key={i}
            x={x(i)} y={chartH + 14}
            fill={COLORS.textMuted} fontSize={6} fontFamily="Barlow"
            textAnchor="middle" transform={`rotate(-25, ${x(i)}, ${chartH + 14})`}
          >
            {ev.course_name.length > 12 ? ev.course_name.slice(0, 10) + "…" : ev.course_name}
          </text>
        ))}

        {/* Legend */}
        <g transform={`translate(${chartW / 2 - 60}, ${chartH + 35})`}>
          <circle cx={4} cy={0} r={3} fill={COLORS.blueMid} />
          <text x={10} y={3} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">MVP</text>
          <circle cx={54} cy={0} r={3} fill={COLORS.goldBright} />
          <text x={60} y={3} fill={COLORS.textMuted} fontSize={7} fontFamily="Barlow">Birdman</text>
        </g>
      </g>
    </svg>
  );
}
