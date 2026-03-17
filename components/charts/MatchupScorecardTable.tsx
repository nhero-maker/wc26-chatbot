"use client";
import React from "react";
import type { Matchup, TournamentPlayer } from "@/lib/player";
import type { PlayerRoundScorecard, PlayerRoundStats } from "@/lib/wc26-data";
import { COLORS } from "@/lib/chart-utils";

interface Props {
  matchup: Matchup;
  scorecards: PlayerRoundScorecard[];
  pars: number[];
  roundStats: PlayerRoundStats[];
  players: TournamentPlayer[];
  eventId: number;
  format: "singles" | "fourball";
}

function getCard(scorecards: PlayerRoundScorecard[], name: string, eventId: number) {
  return scorecards.find((s) => s.playerName === name && s.eventId === eventId);
}

function getHcp(players: TournamentPlayer[], name: string) {
  return players.find((p) => p.name === name)?.handicap ?? 0;
}

function getStats(roundStats: PlayerRoundStats[], name: string, eventId: number) {
  return roundStats.find((s) => s.playerName === name && s.eventId === eventId);
}

function computePerHolePoints(
  format: "singles" | "fourball",
  holeIdx: number,
  c1?: PlayerRoundScorecard,
  c2?: PlayerRoundScorecard,
  c3?: PlayerRoundScorecard | null,
  c4?: PlayerRoundScorecard | null,
): [number, number] {
  if (format === "singles") {
    const s1 = c1?.holes[holeIdx];
    const s2 = c2?.holes[holeIdx];
    if (s1 === undefined || s2 === undefined) return [0, 0];
    if (s1 < s2) return [1, 0];
    if (s1 > s2) return [0, 1];
    return [0.5, 0.5];
  }
  // fourball: team best score
  const s1a = c1?.holes[holeIdx];
  const s1b = c3?.holes[holeIdx];
  const s2a = c2?.holes[holeIdx];
  const s2b = c4?.holes[holeIdx];
  const best1 = Math.min(s1a ?? Infinity, s1b ?? Infinity);
  const best2 = Math.min(s2a ?? Infinity, s2b ?? Infinity);
  if (!isFinite(best1) || !isFinite(best2)) return [0, 0];
  if (best1 < best2) return [1, 0];
  if (best1 > best2) return [0, 1];
  return [0.5, 0.5];
}

const C = {
  headerBg: "#1a2940",
  headerText: "#ffffff",
  rowAlt: "#f5f7fa",
  rowBase: "#ffffff",
  border: "#d0d7e2",
  birdieBorder: COLORS.blueTeam,
  eagleBg: "#fef3c7",
  birdieOutline: COLORS.blueBright,
  bogeyText: COLORS.textMuted,
  teamBluePts: COLORS.blueTeam,
  teamRedPts: COLORS.redTeam,
  cell: { padding: "4px 6px", textAlign: "center" as const, whiteSpace: "nowrap" as const },
};

export default function MatchupScorecardTable({
  matchup, scorecards, pars, roundStats, players, eventId, format,
}: Props) {
  const names: string[] = [matchup.t1p1];
  if (matchup.t1p2) names.push(matchup.t1p2);
  names.push(matchup.t2p1);
  if (matchup.t2p2) names.push(matchup.t2p2);

  const cards = names.map((n) => getCard(scorecards, n, eventId));

  // Check if any scorecard data exists
  const hasData = cards.some((c) => c !== undefined);
  if (!hasData) {
    return (
      <div style={{
        padding: "16px 0", textAlign: "center", fontFamily: "var(--font-mono)",
        fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.06em",
      }}>
        Tuloskortti lisätään kierroksen jälkeen
      </div>
    );
  }

  // Cards by role
  const c_t1p1 = getCard(scorecards, matchup.t1p1, eventId);
  const c_t1p2 = matchup.t1p2 ? getCard(scorecards, matchup.t1p2, eventId) : null;
  const c_t2p1 = getCard(scorecards, matchup.t2p1, eventId);
  const c_t2p2 = matchup.t2p2 ? getCard(scorecards, matchup.t2p2, eventId) : null;

  // Compute per-hole points for all 18 holes
  const holePoints: Array<[number, number]> = pars.map((_, i) =>
    computePerHolePoints(format, i, c_t1p1, c_t2p1, c_t1p2, c_t2p2)
  );

  const t1Total = holePoints.reduce((s, [a]) => s + a, 0);
  const t2Total = holePoints.reduce((s, [, b]) => s + b, 0);

  const hole9 = pars.slice(0, 9);
  const hole18 = pars.slice(9);

  const thStyle = {
    ...C.cell, background: C.headerBg, color: C.headerText,
    fontFamily: "Space Mono, monospace", fontSize: "9px", letterSpacing: "0.06em",
    border: `1px solid #2d3f5a`,
  };
  const tdBase = {
    ...C.cell, fontFamily: "Space Mono, monospace", fontSize: "10px",
    border: `1px solid ${C.border}`,
  };

  function strokeCell(strokes: number | undefined, par: number, rowBg: string) {
    if (strokes === undefined) {
      return <td style={{ ...tdBase, background: rowBg }}>–</td>;
    }
    const diff = strokes - par;
    let style: React.CSSProperties = { ...tdBase, background: rowBg, color: "#1a2940" };
    if (diff < -1) {
      // Eagle or better — filled gold circle
      style = { ...style, background: "#c9a84c", color: "#fff", borderRadius: "50%", fontWeight: 700 };
    } else if (diff === -1) {
      // Birdie — outlined circle
      style = { ...style, outline: `2px solid ${C.birdieOutline}`, outlineOffset: "-2px",
        borderRadius: "50%", color: C.teamBluePts, fontWeight: 700 };
    } else if (diff === 1) {
      // Bogey — light muted
      style = { ...style, color: C.bogeyText };
    } else if (diff >= 2) {
      // Double+ — red/dim
      style = { ...style, color: COLORS.redTeam, opacity: 0.75 };
    }
    return <td style={style}>{strokes}</td>;
  }

  function ptsCell(pts: number, teamColor: string, rowBg: string) {
    const bold = pts > 0;
    return (
      <td style={{
        ...tdBase, background: rowBg,
        color: bold ? teamColor : COLORS.textDim,
        fontWeight: bold ? 700 : 400,
      }}>
        {pts === 0.5 ? "½" : pts === 0 ? "–" : pts}
      </td>
    );
  }

  const rows = [
    { name: matchup.t1p1, card: c_t1p1, team: 1 as 1 | 2 },
    ...(matchup.t1p2 ? [{ name: matchup.t1p2, card: c_t1p2 ?? undefined, team: 1 as 1 | 2 }] : []),
    { name: matchup.t2p1, card: c_t2p1, team: 2 as 1 | 2 },
    ...(matchup.t2p2 ? [{ name: matchup.t2p2, card: c_t2p2 ?? undefined, team: 2 as 1 | 2 }] : []),
  ];

  const holeNums9 = [1,2,3,4,5,6,7,8,9];
  const holeNums18 = [10,11,12,13,14,15,16,17,18];

  // Stats for each player
  const statsRows = rows.map(({ name, card, team }) => {
    const hcp = getHcp(players, name);
    const hcp50 = Math.round(hcp / 2);
    const gross = card?.gross ?? 0;
    const net = gross - hcp50;
    const birdies = card ? card.holes.filter((s, i) => s < pars[i]).length : 0;
    const rs = getStats(roundStats, name, eventId);
    return { name, team, gross, hcp50, net, mvp: rs?.mvp ?? 0, birdies, ld: rs?.longestDrive ?? 0, ss: rs?.sharpShooter ?? 0 };
  });

  // Team points summary row
  const t1Win = t1Total > t2Total;
  const t2Win = t2Total > t1Total;

  return (
    <div style={{ overflowX: "auto", marginTop: "8px" }}>
      <table style={{
        borderCollapse: "collapse", width: "100%", minWidth: "540px",
        fontSize: "10px",
      }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, textAlign: "left", minWidth: "80px" }}>PELAAJA</th>
            {holeNums9.map((h, i) => (
              <th key={h} style={thStyle}>{h}<br /><span style={{ color: "#8a9fc0", fontWeight: 400 }}>P{hole9[i]}</span></th>
            ))}
            <th style={{ ...thStyle, background: "#0f1e33" }}>OS<br /><span style={{ color: "#8a9fc0", fontWeight: 400 }}>{hole9.reduce((a,b) => a+b,0)}</span></th>
            {holeNums18.map((h, i) => (
              <th key={h} style={thStyle}>{h}<br /><span style={{ color: "#8a9fc0", fontWeight: 400 }}>P{hole18[i]}</span></th>
            ))}
            <th style={{ ...thStyle, background: "#0f1e33" }}>OS<br /><span style={{ color: "#8a9fc0", fontWeight: 400 }}>{hole18.reduce((a,b) => a+b,0)}</span></th>
            <th style={{ ...thStyle, background: "#0f1e33" }}>GROSS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ name, card, team }, ri) => {
            const rowBg = ri % 2 === 0 ? C.rowBase : C.rowAlt;
            const nameColor = team === 1 ? COLORS.blueTeam : COLORS.redTeam;
            const out = card?.holes.slice(0, 9).reduce((a, b) => a + b, 0);
            const inn = card?.holes.slice(9).reduce((a, b) => a + b, 0);
            return (
              <tr key={name}>
                <td style={{ ...tdBase, textAlign: "left", background: rowBg, color: nameColor, fontWeight: 700, fontSize: "9px", paddingLeft: "8px" }}>
                  {name}
                </td>
                {card?.holes.slice(0, 9).map((s, i) => (
                  <React.Fragment key={i}>{strokeCell(s, hole9[i], rowBg)}</React.Fragment>
                )) ?? holeNums9.map((h) => <td key={h} style={{ ...tdBase, background: rowBg }}>–</td>)}
                <td style={{ ...tdBase, background: "#e8ecf3", fontWeight: 700, color: "#1a2940" }}>{out ?? "–"}</td>
                {card?.holes.slice(9).map((s, i) => (
                  <React.Fragment key={i}>{strokeCell(s, hole18[i], rowBg)}</React.Fragment>
                )) ?? holeNums18.map((h) => <td key={h} style={{ ...tdBase, background: rowBg }}>–</td>)}
                <td style={{ ...tdBase, background: "#e8ecf3", fontWeight: 700, color: "#1a2940" }}>{inn ?? "–"}</td>
                <td style={{ ...tdBase, background: "#dce3ef", fontWeight: 700, color: "#1a2940" }}>{card?.gross ?? "–"}</td>
              </tr>
            );
          })}

          {/* Team 1 points row */}
          <tr>
            <td style={{ ...tdBase, textAlign: "left", paddingLeft: "8px", background: "rgba(45,107,196,0.07)", color: COLORS.blueTeam, fontWeight: 700, fontSize: "9px" }}>
              J1 PTS
            </td>
            {holePoints.slice(0, 9).map(([p1], i) => ptsCell(p1, C.teamBluePts, "rgba(45,107,196,0.07)"))}
            <td style={{ ...tdBase, background: "rgba(45,107,196,0.12)", fontWeight: 700, color: C.teamBluePts }}>
              {holePoints.slice(0, 9).reduce((s, [p]) => s + p, 0)}
            </td>
            {holePoints.slice(9).map(([p1], i) => ptsCell(p1, C.teamBluePts, "rgba(45,107,196,0.07)"))}
            <td style={{ ...tdBase, background: "rgba(45,107,196,0.12)", fontWeight: 700, color: C.teamBluePts }}>
              {holePoints.slice(9).reduce((s, [p]) => s + p, 0)}
            </td>
            <td style={{ ...tdBase, background: "rgba(45,107,196,0.18)", fontWeight: 700, color: C.teamBluePts, fontSize: "11px" }}>
              {t1Total}
            </td>
          </tr>

          {/* Team 2 points row */}
          <tr>
            <td style={{ ...tdBase, textAlign: "left", paddingLeft: "8px", background: "rgba(199,48,48,0.07)", color: COLORS.redTeam, fontWeight: 700, fontSize: "9px" }}>
              J2 PTS
            </td>
            {holePoints.slice(0, 9).map(([, p2], i) => ptsCell(p2, C.teamRedPts, "rgba(199,48,48,0.07)"))}
            <td style={{ ...tdBase, background: "rgba(199,48,48,0.12)", fontWeight: 700, color: C.teamRedPts }}>
              {holePoints.slice(0, 9).reduce((s, [, p]) => s + p, 0)}
            </td>
            {holePoints.slice(9).map(([, p2], i) => ptsCell(p2, C.teamRedPts, "rgba(199,48,48,0.07)"))}
            <td style={{ ...tdBase, background: "rgba(199,48,48,0.12)", fontWeight: 700, color: C.teamRedPts }}>
              {holePoints.slice(9).reduce((s, [, p]) => s + p, 0)}
            </td>
            <td style={{ ...tdBase, background: "rgba(199,48,48,0.18)", fontWeight: 700, color: C.teamRedPts, fontSize: "11px" }}>
              {t2Total}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Stats table */}
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "8px", minWidth: "400px", fontSize: "10px" }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, textAlign: "left" }}>PELAAJA</th>
            <th style={thStyle}>GROSS</th>
            <th style={thStyle}>HCP 50%</th>
            <th style={thStyle}>NETTO</th>
            <th style={thStyle}>MVP</th>
            <th style={thStyle}>BIRDMAN</th>
            <th style={thStyle}>LD (m)</th>
            <th style={thStyle}>SS (m)</th>
          </tr>
        </thead>
        <tbody>
          {statsRows.map((s, i) => {
            const rowBg = i % 2 === 0 ? C.rowBase : C.rowAlt;
            const nameColor = s.team === 1 ? COLORS.blueTeam : COLORS.redTeam;
            return (
              <tr key={s.name}>
                <td style={{ ...tdBase, textAlign: "left", paddingLeft: "8px", background: rowBg, color: nameColor, fontWeight: 700 }}>{s.name}</td>
                <td style={{ ...tdBase, background: rowBg }}>{s.gross || "–"}</td>
                <td style={{ ...tdBase, background: rowBg, color: COLORS.textMuted }}>{s.hcp50}</td>
                <td style={{ ...tdBase, background: rowBg, fontWeight: 700 }}>{s.net || "–"}</td>
                <td style={{ ...tdBase, background: rowBg }}>{s.mvp}</td>
                <td style={{ ...tdBase, background: rowBg }}>{s.birdies}</td>
                <td style={{ ...tdBase, background: rowBg }}>{s.ld > 0 ? s.ld.toFixed(1) : "–"}</td>
                <td style={{ ...tdBase, background: rowBg }}>{s.ss.toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

