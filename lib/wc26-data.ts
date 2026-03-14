// ─── WC26 Static Tournament Data ─────────────────────────────────────────────
// Source: "Winter Cup 2026 excel Nikolle.xlsx"
// Updated: 2026-03-14 (Rounds 1–2 complete, 3–6 not yet played)

import type {
  TournamentPlayer,
  TournamentEvent,
  Matchup,
} from "./player";

// ─── Players ─────────────────────────────────────────────────────────────────

export const WC26_TOURNAMENT_PLAYERS: TournamentPlayer[] = [
  // Team 1 — SINISET
  { id: 1,  name: "Arto",    team: 1, handicap: 4.4  },
  { id: 2,  name: "Dan",     team: 1, handicap: 30.4 },
  { id: 3,  name: "Jesse",   team: 1, handicap: 30.6 },
  { id: 4,  name: "Jonas",   team: 1, handicap: 19.7 },
  { id: 5,  name: "Mika R.", team: 1, handicap: 13.8 },
  { id: 6,  name: "Milla",   team: 1, handicap: 54   },
  { id: 7,  name: "Niko",    team: 1, handicap: 19.6 },
  { id: 8,  name: "Pasi K.", team: 1, handicap: 16.9 },
  { id: 9,  name: "Pasi M.", team: 1, handicap: 8.5  },
  { id: 10, name: "Peter",   team: 1, handicap: 25.9 },
  { id: 11, name: "Timo",    team: 1, handicap: 25   },
  { id: 12, name: "Tommy",   team: 1, handicap: 17.8 },
  // Team 2 — PUNAISET
  { id: 13, name: "Arttu",   team: 2, handicap: 23.2 },
  { id: 14, name: "Elias",   team: 2, handicap: 18.8 },
  { id: 15, name: "Jani",    team: 2, handicap: 26.5 },
  { id: 16, name: "Janne",   team: 2, handicap: 43.4 },
  { id: 17, name: "Kim",     team: 2, handicap: 26.3 },
  { id: 18, name: "Kimi",    team: 2, handicap: 30.9 },
  { id: 19, name: "Mathias", team: 2, handicap: 20.7 },
  { id: 20, name: "Mika V.", team: 2, handicap: 18.5 },
  { id: 21, name: "Mikko",   team: 2, handicap: 15.2 },
  { id: 22, name: "Roope",   team: 2, handicap: 5.7  },
  { id: 23, name: "Samu",    team: 2, handicap: 16.8 },
  { id: 24, name: "Tuomo",   team: 2, handicap: 8.4  },
];

// ─── Events ──────────────────────────────────────────────────────────────────

export const WC26_EVENTS: TournamentEvent[] = [
  {
    id: 1,
    course_id: 1,
    course_name: "Lofoten Links",
    event_month: "2026-01",
    format: "fourball",
    course_settings: {
      male_tee: "Keltainen",
      female_tee: "Punainen",
      holes: "18",
      mulligans: "2",
    },
  },
  {
    id: 2,
    course_id: 2,
    course_name: "Marco Simone Golf Club",
    event_month: "2026-02",
    format: "singles",
    course_settings: {
      male_tee: "Keltainen",
      female_tee: "Punainen",
      holes: "18",
      mulligans: "2",
    },
  },
  {
    id: 3,
    course_id: 3,
    course_name: "Evian Resort Golf Club",
    event_month: "2026-03",
    format: "fourball",
    course_settings: {},
  },
  {
    id: 4,
    course_id: 4,
    course_name: "Real Club Valderrama",
    event_month: "2026-04",
    format: "singles",
    course_settings: {},
  },
  {
    id: 5,
    course_id: 5,
    course_name: "St Andrews Old Course",
    event_month: "2026-05",
    format: "fourball",
    course_settings: {},
  },
  {
    id: 6,
    course_id: 6,
    course_name: "Grande Finale",
    event_month: "2026-06",
    format: "singles",
    course_settings: {},
  },
];

// ─── Matchups ─────────────────────────────────────────────────────────────────
// Round 1 (Lofoten Links, fourball) — all 6 groups complete
// Round 2 (Marco Simone, singles) — 6 of 12 groups complete

export const WC26_MATCHUPS: Matchup[] = [
  // Round 1 — fourball
  { id: 101, event_id: 1, t1p1: "Arto",    t1p2: "Pasi M.", t2p1: "Roope",   t2p2: "Tuomo",   team1_points: 21, team2_points: 15 },
  { id: 102, event_id: 1, t1p1: "Mika R.", t1p2: "Pasi K.", t2p1: "Mikko",   t2p2: "Samu",    team1_points: 22, team2_points: 14 },
  { id: 103, event_id: 1, t1p1: "Tommy",   t1p2: "Niko",    t2p1: "Mika V.", t2p2: "Elias",   team1_points: 19, team2_points: 17 },
  { id: 104, event_id: 1, t1p1: "Jonas",   t1p2: "Timo",    t2p1: "Mathias", t2p2: "Arttu",   team1_points: 17, team2_points: 19 },
  { id: 105, event_id: 1, t1p1: "Peter",   t1p2: "Dan",     t2p1: "Kim",     t2p2: "Jani",    team1_points: 16, team2_points: 20 },
  { id: 106, event_id: 1, t1p1: "Jesse",   t1p2: "Milla",   t2p1: "Kimi",    t2p2: "Janne",   team1_points: 23, team2_points: 13 },
  // Round 2 — singles (complete groups only)
  { id: 201, event_id: 2, t1p1: "Arto",    t1p2: null,      t2p1: "Kimi",    t2p2: null,      team1_points: 12,  team2_points: 6   },
  { id: 202, event_id: 2, t1p1: "Timo",    t1p2: null,      t2p1: "Mikko",   t2p2: null,      team1_points: 10.5, team2_points: 7.5 },
  { id: 203, event_id: 2, t1p1: "Jesse",   t1p2: null,      t2p1: "Samu",    t2p2: null,      team1_points: 6,   team2_points: 12  },
  { id: 204, event_id: 2, t1p1: "Jonas",   t1p2: null,      t2p1: "Mika V.", t2p2: null,      team1_points: 11,  team2_points: 7   },
  { id: 205, event_id: 2, t1p1: "Peter",   t1p2: null,      t2p1: "Tuomo",   t2p2: null,      team1_points: 7,   team2_points: 11  },
  { id: 206, event_id: 2, t1p1: "Dan",     t1p2: null,      t2p1: "Kim",     t2p2: null,      team1_points: 9,   team2_points: 9   },
];

// ─── Season Stats ─────────────────────────────────────────────────────────────
// Source: TULOKSET sheet — net scores (50% HCP applied), MVP, birdies, drives, sharp shooter
// sharpShooterBest: metres deviation from 100m (lower = better)

export interface PlayerSeasonStats {
  name: string;
  team: 1 | 2;
  handicap: number;
  roundsPlayed: number;
  netTotal: number;
  grossTotal: number;
  mvpTotal: number;
  birdiesTotal: number;
  bestDrive: number;
  sharpShooterBest: number;
}

export const WC26_SEASON_STATS: PlayerSeasonStats[] = [
  { name: "Arto",    team: 1, handicap: 4.4,  roundsPlayed: 2, netTotal: 168, grossTotal: 172, mvpTotal: 22, birdiesTotal: 3, bestDrive: 272.1, sharpShooterBest: 0.20 },
  { name: "Arttu",   team: 2, handicap: 23.2, roundsPlayed: 1, netTotal: 78,  grossTotal: 90,  mvpTotal: 8,  birdiesTotal: 1, bestDrive: 246.0, sharpShooterBest: 0.50 },
  { name: "Dan",     team: 1, handicap: 30.4, roundsPlayed: 2, netTotal: 163, grossTotal: 193, mvpTotal: 16, birdiesTotal: 1, bestDrive: 209.5, sharpShooterBest: 1.80 },
  { name: "Elias",   team: 2, handicap: 18.8, roundsPlayed: 2, netTotal: 157, grossTotal: 175, mvpTotal: 8,  birdiesTotal: 2, bestDrive: 235.0, sharpShooterBest: 1.70 },
  { name: "Jani",    team: 2, handicap: 26.5, roundsPlayed: 2, netTotal: 184, grossTotal: 210, mvpTotal: 8,  birdiesTotal: 0, bestDrive: 261.5, sharpShooterBest: 0.50 },
  { name: "Janne",   team: 2, handicap: 43.4, roundsPlayed: 2, netTotal: 233, grossTotal: 277, mvpTotal: 1,  birdiesTotal: 0, bestDrive: 202.1, sharpShooterBest: 0.70 },
  { name: "Jesse",   team: 1, handicap: 30.6, roundsPlayed: 2, netTotal: 143, grossTotal: 173, mvpTotal: 22, birdiesTotal: 2, bestDrive: 221.0, sharpShooterBest: 0.10 },
  { name: "Jonas",   team: 1, handicap: 19.7, roundsPlayed: 2, netTotal: 163, grossTotal: 183, mvpTotal: 20, birdiesTotal: 0, bestDrive: 238.0, sharpShooterBest: 0.10 },
  { name: "Kim",     team: 2, handicap: 26.3, roundsPlayed: 2, netTotal: 172, grossTotal: 198, mvpTotal: 21, birdiesTotal: 1, bestDrive: 229.4, sharpShooterBest: 0.20 },
  { name: "Kimi",    team: 2, handicap: 30.9, roundsPlayed: 2, netTotal: 156, grossTotal: 186, mvpTotal: 16, birdiesTotal: 0, bestDrive: 227.1, sharpShooterBest: 0.20 },
  { name: "Mathias", team: 2, handicap: 20.7, roundsPlayed: 2, netTotal: 149, grossTotal: 169, mvpTotal: 10, birdiesTotal: 1, bestDrive: 221.6, sharpShooterBest: 0.90 },
  { name: "Mika R.", team: 1, handicap: 13.8, roundsPlayed: 1, netTotal: 73,  grossTotal: 80,  mvpTotal: 8,  birdiesTotal: 1, bestDrive: 235.6, sharpShooterBest: 0.90 },
  { name: "Mika V.", team: 2, handicap: 18.5, roundsPlayed: 2, netTotal: 172, grossTotal: 190, mvpTotal: 17, birdiesTotal: 0, bestDrive: 219.3, sharpShooterBest: 0.10 },
  { name: "Mikko",   team: 2, handicap: 15.2, roundsPlayed: 2, netTotal: 162, grossTotal: 178, mvpTotal: 15, birdiesTotal: 0, bestDrive: 204.0, sharpShooterBest: 4.00 },
  { name: "Milla",   team: 1, handicap: 54,   roundsPlayed: 1, netTotal: 118, grossTotal: 145, mvpTotal: 0,  birdiesTotal: 0, bestDrive: 174.0, sharpShooterBest: 0.50 },
  { name: "Niko",    team: 1, handicap: 19.6, roundsPlayed: 1, netTotal: 90,  grossTotal: 100, mvpTotal: 4,  birdiesTotal: 0, bestDrive: 244.0, sharpShooterBest: 2.00 },
  { name: "Pasi K.", team: 1, handicap: 16.9, roundsPlayed: 1, netTotal: 79,  grossTotal: 87,  mvpTotal: 5,  birdiesTotal: 3, bestDrive: 215.0, sharpShooterBest: 2.10 },
  { name: "Pasi M.", team: 1, handicap: 8.5,  roundsPlayed: 2, netTotal: 152, grossTotal: 160, mvpTotal: 11, birdiesTotal: 2, bestDrive: 256.0, sharpShooterBest: 0.10 },
  { name: "Peter",   team: 1, handicap: 25.9, roundsPlayed: 2, netTotal: 170, grossTotal: 196, mvpTotal: 16, birdiesTotal: 1, bestDrive: 249.4, sharpShooterBest: 0.70 },
  { name: "Roope",   team: 2, handicap: 5.7,  roundsPlayed: 1, netTotal: 77,  grossTotal: 80,  mvpTotal: 9,  birdiesTotal: 1, bestDrive: 251.9, sharpShooterBest: 0.10 },
  { name: "Samu",    team: 2, handicap: 16.8, roundsPlayed: 2, netTotal: 154, grossTotal: 170, mvpTotal: 22, birdiesTotal: 6, bestDrive: 286.2, sharpShooterBest: 0.20 },
  { name: "Timo",    team: 1, handicap: 25,   roundsPlayed: 2, netTotal: 144, grossTotal: 170, mvpTotal: 26, birdiesTotal: 0, bestDrive: 214.9, sharpShooterBest: 0.70 },
  { name: "Tommy",   team: 1, handicap: 17.8, roundsPlayed: 2, netTotal: 161, grossTotal: 179, mvpTotal: 11, birdiesTotal: 1, bestDrive: 239.4, sharpShooterBest: 4.20 },
  { name: "Tuomo",   team: 2, handicap: 8.4,  roundsPlayed: 2, netTotal: 174, grossTotal: 182, mvpTotal: 16, birdiesTotal: 1, bestDrive: 265.8, sharpShooterBest: 0.10 },
];

// ─── Computed Standings ───────────────────────────────────────────────────────

export function getStaticTeamStandings() {
  const team1_total = WC26_MATCHUPS.reduce((s, m) => s + m.team1_points, 0);
  const team2_total = WC26_MATCHUPS.reduce((s, m) => s + m.team2_points, 0);
  return { team1_total, team2_total };
}
