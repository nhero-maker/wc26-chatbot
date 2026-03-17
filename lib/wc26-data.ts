// ─── WC26 Static Tournament Data ─────────────────────────────────────────────
// Source: "Winter Cup 2026 excel Nikolle.xlsx" + "Marco Simone - Tulokset.pdf"
// Updated: 2026-03-17 (Rounds 1–2 complete, Round 3 pairs announced, 4–6 not yet played)

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
    round_number: 1,
    dates: "1.1. – 31.1.2026",
    description: "Yksi maailman pohjoisimmista kentistä ja todellinen elämys jo maisemiensa puolesta. Merituuli, dramaattiset rantakalliot ja pitkät avarat väylät tekevät tästä täydellisen kauden avauskentän. Pelillisesti reilu links – hyvä draivaaja saa palkintonsa, mutta väärä suunta kostautuu heti.",
    scoring_rule: "2 pistettä reiän voittavalle joukkueelle · 1 piste molemmille jos tasatulos",
    format_label: "Fourball (best ball)",
    bonus_challenges: [
      "Kuukauden pisin draivi → +2 bonuspistettä pelaajan joukkueelle",
      "Kuukauden tarkin 100 metriin → +2 bonuspistettä",
    ],
    course_settings: {
      male_tee: "TEE 55, 5499 m",
      female_tee: "TEE 55, 5499 m",
      scoring: "Stroke (Gross)",
      holes: "All Holes",
      putting: "Auto – Fixed",
      pins: "Easy",
      mulligans: "No",
      wind: "Calm",
      fairway_firmness: "Medium",
      green_firmness: "Medium",
      green_stimp: "8 (2,4 m)",
    },
  },
  {
    id: 2,
    course_id: 2,
    course_name: "Marco Simone",
    event_month: "2026-02",
    format: "singles",
    round_number: 2,
    dates: "1.2. – 28.2.2026",
    description: "Ryder Cup 2023:n näyttämö Rooman kupeessa. Moderni championship-kenttä, jossa kumpuileva maasto, risk–reward-väyliä ja strategisia avauksia. Täydellinen joukkuekenttä: rohkeat ratkaisut voivat tuoda isot pisteet – tai jättää kaiken greenin bunkkereihin.",
    scoring_rule: "1 piste reiän voittavan pelaajan joukkueelle · 0,5 pistettä molemmille jos tasatulos",
    format_label: "Singles (1 vs 1)",
    bonus_challenges: [
      "Kuukauden pisin draivi → +2 bonuspistettä pelaajan joukkueelle",
      "Kuukauden tarkin 100 metriin → +2 bonuspistettä",
    ],
    course_settings: {
      male_tee: "White, 6234 m",
      female_tee: "Red, 5252 m",
      scoring: "Stroke (Gross)",
      holes: "All Holes",
      putting: "Auto – Fixed",
      pins: "Easy",
      mulligans: "No",
      wind: "Calm",
      fairway_firmness: "Medium",
      green_firmness: "Medium",
      green_stimp: "8 (2,4 m)",
    },
  },
  {
    id: 3,
    course_id: 3,
    course_name: "Evian Resort",
    event_month: "2026-03",
    format: "fourball",
    round_number: 3,
    dates: "1.3. – 31.3.2026",
    description: "Genevejärven rannalla, Alppien juurella sijaitseva kenttä yhdistää vuoristomaisemat ja park-kentän pelattavuuden. Korkeuserot tekevät etäisyyksien arvioinnista haastavaa, ja greenit vaativat pehmeän kosketuksen. Elegantti ja tarkkuutta palkitseva kokonaisuus.",
    scoring_rule: "2 pistettä reiän voittavalle joukkueelle · 1 piste molemmille jos tasatulos",
    format_label: "Fourball (best ball)",
    bonus_challenges: [
      "Kuukauden pisin draivi → +2 bonuspistettä pelaajan joukkueelle",
      "Kuukauden tarkin 100 metriin → +2 bonuspistettä",
    ],
    course_settings: {
      male_tee: "White, 5954 m",
      female_tee: "Red, 4705 m",
      scoring: "Stroke (Gross)",
      holes: "All Holes",
      putting: "Auto – Fixed",
      pins: "Easy",
      mulligans: "No",
      wind: "Calm",
      fairway_firmness: "Medium",
      green_firmness: "Medium",
      green_stimp: "8 (2,4 m)",
    },
  },
  {
    id: 4,
    course_id: 4,
    course_name: "Real Club Valderrama",
    event_month: "2026-04",
    format: "singles",
    round_number: 4,
    dates: "1.4. – 30.4.2026",
    description: "Euroopan ehkä arvostetuin kenttä ja todellinen teknisen golfin mittari. Kapeat väylät, korkkitammet ja pienet, nopeat greenit pitävät pelaajan hereillä jokaisella lyönnillä. Par on erinomainen tulos, ja voittaminen täällä vaatii kylmää päätä.",
    scoring_rule: "1 piste reiän voittavan pelaajan joukkueelle · 0,5 pistettä molemmille jos tasatulos",
    format_label: "Singles (1 vs 1)",
    bonus_challenges: [
      "Kuukauden pisin draivi → +2 bonuspistettä pelaajan joukkueelle",
      "Kuukauden tarkin 100 metriin → +2 bonuspistettä",
    ],
    course_settings: {
      male_tee: "Champ., 5912 m",
      female_tee: "Fwd., 4871 m",
      scoring: "Stroke (Gross)",
      holes: "All Holes",
      putting: "Auto – Fixed",
      pins: "Easy",
      mulligans: "No",
      wind: "Calm",
      fairway_firmness: "Medium",
      green_firmness: "Medium",
      green_stimp: "8 (2,4 m)",
    },
  },
  {
    id: 5,
    course_id: 5,
    course_name: "St Andrews Old Course",
    event_month: "2026-05",
    format: "fourball",
    round_number: 5,
    dates: "1.5. – 31.5.2026",
    description: "Lajin syntypaikka ja turnauksen arvolle sopiva päätöskenttä ennen liveturnausta. Leveät väylät, mutta petolliset bunkkerit ja tuuli pakottavat miettimään joka avauksen kahdesti. Yksi golfin historian ikonisimmista näyttämöistä – täydellinen paikka päättää Trackman-kausi.",
    scoring_rule: "2 pistettä reiän voittavalle joukkueelle · 1 piste molemmille jos tasatulos",
    format_label: "Fourball (best ball)",
    bonus_challenges: [
      "Kuukauden pisin draivi → +2 bonuspistettä pelaajan joukkueelle",
      "Kuukauden tarkin 100 metriin → +2 bonuspistettä",
    ],
    course_settings: {
      male_tee: "White, 6146 m",
      female_tee: "Ladies, 5516 m",
      scoring: "Stroke (Gross)",
      holes: "All Holes",
      putting: "Auto – Fixed",
      pins: "Easy",
      mulligans: "No",
      wind: "Calm",
      fairway_firmness: "Medium",
      green_firmness: "Medium",
      green_stimp: "8 (2,4 m)",
    },
  },
  {
    id: 6,
    course_id: 6,
    course_name: "Grande Finale",
    event_month: "2026-06",
    format: "singles",
    round_number: 6,
    dates: "1.6. – 30.6.2026",
    description: "Kuuden kuukauden mittainen talvikiertue huipentuu kesäkuussa oikealle viheriölle. Edessä on finaalikierros, jossa triplapisteet tekevät jokaisesta reiästä ratkaisevan. Jokainen draivi, putti ja päätös voi kääntää mestaruuden suunnan. Tämä on huipennus, jossa mestarit syntyvät.",
    scoring_rule: "3 pistettä reiän voittavalle pelaajalle · 1,5 pistettä jos tasatulos",
    format_label: "Singles (1 vs 1)",
    course_settings: {},
  },
];

// ─── Matchups ─────────────────────────────────────────────────────────────────
// Round 1 (Lofoten Links, fourball) — all 6 groups complete
// Round 2 (Marco Simone, singles) — all 12 complete (source: PDF 2026-03)
// Round 3 (Evian Resort, fourball) — pairs announced, not yet played

export const WC26_MATCHUPS: Matchup[] = [
  // Round 1 — fourball
  { id: 101, event_id: 1, t1p1: "Arto",    t1p2: "Pasi M.", t2p1: "Roope",   t2p2: "Tuomo",   team1_points: 21,  team2_points: 15  },
  { id: 102, event_id: 1, t1p1: "Mika R.", t1p2: "Pasi K.", t2p1: "Mikko",   t2p2: "Samu",    team1_points: 22,  team2_points: 14  },
  { id: 103, event_id: 1, t1p1: "Tommy",   t1p2: "Niko",    t2p1: "Mika V.", t2p2: "Elias",   team1_points: 19,  team2_points: 17  },
  { id: 104, event_id: 1, t1p1: "Jonas",   t1p2: "Timo",    t2p1: "Mathias", t2p2: "Arttu",   team1_points: 17,  team2_points: 19  },
  { id: 105, event_id: 1, t1p1: "Peter",   t1p2: "Dan",     t2p1: "Kim",     t2p2: "Jani",    team1_points: 16,  team2_points: 20  },
  { id: 106, event_id: 1, t1p1: "Jesse",   t1p2: "Milla",   t2p1: "Kimi",    t2p2: "Janne",   team1_points: 23,  team2_points: 13  },
  // Round 2 — singles (all 12 complete, source: Marco Simone PDF)
  { id: 201, event_id: 2, t1p1: "Arto",    t1p2: null, t2p1: "Kimi",    t2p2: null, team1_points: 12,   team2_points: 6   },
  { id: 202, event_id: 2, t1p1: "Timo",    t1p2: null, t2p1: "Mikko",   t2p2: null, team1_points: 10.5, team2_points: 7.5 },
  { id: 203, event_id: 2, t1p1: "Jesse",   t1p2: null, t2p1: "Samu",    t2p2: null, team1_points: 6,    team2_points: 12  },
  { id: 204, event_id: 2, t1p1: "Jonas",   t1p2: null, t2p1: "Mika V.", t2p2: null, team1_points: 11,   team2_points: 7   },
  { id: 205, event_id: 2, t1p1: "Peter",   t1p2: null, t2p1: "Tuomo",   t2p2: null, team1_points: 7,    team2_points: 11  },
  { id: 206, event_id: 2, t1p1: "Dan",     t1p2: null, t2p1: "Kim",     t2p2: null, team1_points: 9,    team2_points: 9   },
  { id: 207, event_id: 2, t1p1: "Pasi M.", t1p2: null, t2p1: "Roope",   t2p2: null, team1_points: 8.5,  team2_points: 9.5 },
  { id: 208, event_id: 2, t1p1: "Mika R.", t1p2: null, t2p1: "Mathias", t2p2: null, team1_points: 9.5,  team2_points: 8.5 },
  { id: 209, event_id: 2, t1p1: "Tommy",   t1p2: null, t2p1: "Arttu",   t2p2: null, team1_points: 11,   team2_points: 7   },
  { id: 210, event_id: 2, t1p1: "Pasi K.", t1p2: null, t2p1: "Elias",   t2p2: null, team1_points: 4,    team2_points: 14  },
  { id: 211, event_id: 2, t1p1: "Niko",    t1p2: null, t2p1: "Jani",    t2p2: null, team1_points: 11.5, team2_points: 6.5 },
  { id: 212, event_id: 2, t1p1: "Milla",   t1p2: null, t2p1: "Janne",   t2p2: null, team1_points: 8,    team2_points: 10  },
  // Round 3 — fourball (Evian Resort, pairs announced, not yet played)
  { id: 301, event_id: 3, t1p1: "Pasi M.", t1p2: "Arto",   t2p1: "Roope",   t2p2: "Samu",    team1_points: 0, team2_points: 0 },
  { id: 302, event_id: 3, t1p1: "Mika R.", t1p2: "Timo",   t2p1: "Elias",   t2p2: "Tuomo",   team1_points: 0, team2_points: 0 },
  { id: 303, event_id: 3, t1p1: "Jesse",   t1p2: "Jonas",  t2p1: "Mathias", t2p2: "Mikko",   team1_points: 0, team2_points: 0 },
  { id: 304, event_id: 3, t1p1: "Niko",    t1p2: "Tommy",  t2p1: "Kimi",    t2p2: "Mika V.", team1_points: 0, team2_points: 0 },
  { id: 305, event_id: 3, t1p1: "Dan",     t1p2: "Pasi K.",t2p1: "Kim",     t2p2: "Arttu",   team1_points: 0, team2_points: 0 },
  { id: 306, event_id: 3, t1p1: "Peter",   t1p2: "Milla",  t2p1: "Jani",    t2p2: "Janne",   team1_points: 0, team2_points: 0 },
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

// ─── Event Pars ───────────────────────────────────────────────────────────────

export const WC26_EVENT_PARS: Record<number, number[]> = {
  1: [4,3,4,4,5,4,3,5,4, 4,4,3,5,4,4,4,3,4], // Lofoten Links — par 72
  2: [4,4,4,3,4,4,3,5,5, 4,4,5,3,4,4,4,3,5], // Marco Simone — par 73
};

// ─── Scorecards ───────────────────────────────────────────────────────────────

export interface PlayerRoundScorecard {
  playerName: string;
  eventId: number;
  gross: number;
  holes: number[]; // 18 stroke values, index 0 = hole 1
}

export const WC26_SCORECARDS: PlayerRoundScorecard[] = [
  // ── Round 1 — Lofoten Links (all 24 players) ──────────────────────────────
  { playerName: "Arto",    eventId: 1, gross: 88,  holes: [4,5,4,5,6,4,4,10,4, 6,3,4,4,5,4,6,5,5] },
  { playerName: "Pasi M.", eventId: 1, gross: 79,  holes: [4,4,4,3,5,7,3,5,6,  4,4,4,5,4,4,4,3,6] },
  { playerName: "Roope",   eventId: 1, gross: 80,  holes: [5,4,3,4,6,4,5,5,5,  4,4,5,6,5,4,4,3,4] },
  { playerName: "Tuomo",   eventId: 1, gross: 96,  holes: [5,5,4,6,7,6,4,9,4,  9,4,4,5,3,4,5,3,9] },
  { playerName: "Mika R.", eventId: 1, gross: 80,  holes: [4,4,6,5,6,4,3,5,4,  5,3,3,6,4,4,5,3,6] },
  { playerName: "Pasi K.", eventId: 1, gross: 87,  holes: [7,5,3,5,6,6,4,7,3,  5,4,4,5,5,5,6,2,5] },
  { playerName: "Mikko",   eventId: 1, gross: 87,  holes: [5,3,5,5,6,5,4,6,5,  4,5,4,6,5,5,5,4,5] },
  { playerName: "Samu",    eventId: 1, gross: 89,  holes: [7,4,4,3,4,6,3,9,5,  4,4,6,5,5,3,9,3,5] },
  { playerName: "Tommy",   eventId: 1, gross: 85,  holes: [4,3,5,5,5,4,3,6,4,  4,5,5,9,4,6,6,3,4] },
  { playerName: "Niko",    eventId: 1, gross: 100, holes: [6,5,5,5,7,6,3,9,4,  5,6,5,5,5,4,12,3,5] },
  { playerName: "Mika V.", eventId: 1, gross: 95,  holes: [6,5,4,6,6,7,5,6,4,  6,5,4,5,6,5,4,4,7] },
  { playerName: "Elias",   eventId: 1, gross: 91,  holes: [4,7,5,4,6,5,4,6,5,  5,5,4,8,4,8,5,2,4] },
  { playerName: "Jonas",   eventId: 1, gross: 92,  holes: [5,3,5,4,5,5,4,5,4,  6,5,4,10,4,5,7,5,6] },
  { playerName: "Timo",    eventId: 1, gross: 81,  holes: [5,3,6,4,5,4,3,5,5,  6,5,4,5,5,4,4,3,5] },
  { playerName: "Mathias", eventId: 1, gross: 82,  holes: [4,3,4,5,6,5,3,6,6,  4,4,4,5,5,4,5,3,6] },
  { playerName: "Arttu",   eventId: 1, gross: 90,  holes: [4,4,5,4,7,5,4,8,4,  9,4,4,6,3,4,6,4,5] },
  { playerName: "Peter",   eventId: 1, gross: 94,  holes: [5,4,4,4,6,6,6,5,6,  4,5,3,6,6,7,8,4,5] },
  { playerName: "Dan",     eventId: 1, gross: 98,  holes: [5,3,5,5,6,5,3,6,7,  5,5,4,6,7,7,8,4,7] },
  { playerName: "Kim",     eventId: 1, gross: 98,  holes: [10,7,6,5,6,4,3,6,4, 7,5,7,5,3,6,5,4,5] },
  { playerName: "Jani",    eventId: 1, gross: 100, holes: [4,5,10,6,6,5,4,5,9, 5,5,6,5,5,5,5,4,6] },
  { playerName: "Jesse",   eventId: 1, gross: 82,  holes: [4,3,4,5,6,6,3,6,5,  5,5,4,4,5,4,5,3,5] },
  { playerName: "Milla",   eventId: 1, gross: 145, holes: [11,5,8,8,9,9,7,12,10, 8,6,7,8,8,6,9,4,10] },
  { playerName: "Kimi",    eventId: 1, gross: 92,  holes: [5,4,4,4,7,4,4,7,4,  5,4,4,9,6,4,7,4,6] },
  { playerName: "Janne",   eventId: 1, gross: 155, holes: [9,10,12,8,10,8,12,11,9, 4,8,7,9,7,6,10,6,9] },
  // ── Round 2 — Marco Simone (20 players with data) ─────────────────────────
  { playerName: "Arto",    eventId: 2, gross: 84,  holes: [4,5,4,3,6,4,3,7,4,  5,5,5,4,5,6,4,4,6] },
  { playerName: "Kimi",    eventId: 2, gross: 94,  holes: [4,6,5,4,5,5,4,6,8,  6,6,5,4,7,5,4,4,6] },
  { playerName: "Timo",    eventId: 2, gross: 89,  holes: [5,7,5,3,5,5,3,5,6,  5,5,7,3,5,6,4,4,6] },
  { playerName: "Mikko",   eventId: 2, gross: 91,  holes: [5,5,6,4,5,6,4,6,5,  4,5,6,3,5,6,5,5,6] },
  { playerName: "Jesse",   eventId: 2, gross: 91,  holes: [6,6,6,3,5,5,3,8,6,  6,4,5,3,5,5,5,6,4] },
  { playerName: "Samu",    eventId: 2, gross: 81,  holes: [6,5,4,3,6,5,4,7,4,  6,3,5,4,4,4,4,3,4] },
  { playerName: "Tommy",   eventId: 2, gross: 94,  holes: [8,5,5,4,5,5,5,7,5,  7,3,6,4,5,5,4,4,7] },
  { playerName: "Elias",   eventId: 2, gross: 84,  holes: [5,4,7,3,5,5,4,4,5,  5,5,6,3,5,5,4,3,6] },
  { playerName: "Jonas",   eventId: 2, gross: 91,  holes: [5,5,5,4,5,5,3,7,6,  5,5,5,5,5,6,5,4,6] },
  { playerName: "Mika V.", eventId: 2, gross: 95,  holes: [6,5,5,4,6,6,4,6,7,  7,5,6,4,6,4,5,3,6] },
  { playerName: "Peter",   eventId: 2, gross: 102, holes: [6,5,5,3,4,8,3,4,8,  11,5,8,4,7,4,7,4,6] },
  { playerName: "Tuomo",   eventId: 2, gross: 86,  holes: [8,4,6,4,5,7,4,5,5,  5,4,5,3,4,5,4,3,5] },
  { playerName: "Dan",     eventId: 2, gross: 95,  holes: [5,6,5,4,4,6,3,7,6,  5,3,8,3,7,7,4,6,6] },
  { playerName: "Kim",     eventId: 2, gross: 100, holes: [5,5,6,7,6,6,4,5,5,  5,5,6,5,6,6,8,4,6] },
  { playerName: "Pasi M.", eventId: 2, gross: 81,  holes: [4,4,4,3,4,6,5,7,5,  5,5,5,4,5,4,4,2,5] },
  { playerName: "Mathias", eventId: 2, gross: 87,  holes: [7,5,5,3,6,6,4,6,6,  6,3,5,3,4,5,4,3,6] },
  { playerName: "Jani",    eventId: 2, gross: 110, holes: [6,5,9,4,6,8,3,5,15, 7,5,6,3,6,9,4,4,5] },
  { playerName: "Janne",   eventId: 2, gross: 122, holes: [7,6,13,4,6,5,5,8,8, 7,5,9,5,10,7,5,6,6] },
  { playerName: "Roope",   eventId: 2, gross: 81,  holes: [5,4,5,3,4,4,4,5,4,  8,5,6,3,4,4,4,4,5] },
  { playerName: "Mika R.", eventId: 2, gross: 85,  holes: [6,6,4,3,5,4,5,6,5,  4,4,5,3,5,5,6,4,5] },
  { playerName: "Arttu",   eventId: 2, gross: 104, holes: [4,9,6,3,4,7,7,6,6,  5,7,6,4,5,8,5,5,7] },
  { playerName: "Pasi K.", eventId: 2, gross: 102, holes: [7,5,4,4,8,5,3,6,6,  8,4,7,4,9,5,5,5,7] },
  { playerName: "Niko",    eventId: 2, gross: 94,  holes: [4,5,7,3,5,5,4,6,9,  7,4,5,3,5,5,5,6,6] },
  { playerName: "Milla",   eventId: 2, gross: 119, holes: [8,6,6,4,8,7,3,7,9,  6,8,7,5,7,9,6,6,7] },
];

// ─── Per-Round Stats ──────────────────────────────────────────────────────────

export interface PlayerRoundStats {
  playerName: string;
  eventId: number;
  mvp: number;
  longestDrive: number;   // metres
  sharpShooter: number;   // deviation from 100m in metres (lower = better)
}

export const WC26_ROUND_STATS: PlayerRoundStats[] = [
  // ── Round 1 — Lofoten Links ──────────────────────────────────────────────
  { playerName: "Arto",    eventId: 1, mvp: 7,  longestDrive: 272, sharpShooter: 0.5 },
  { playerName: "Pasi M.", eventId: 1, mvp: 11, longestDrive: 254, sharpShooter: 0.1 },
  { playerName: "Roope",   eventId: 1, mvp: 9,  longestDrive: 252, sharpShooter: 0.1 },
  { playerName: "Tuomo",   eventId: 1, mvp: 5,  longestDrive: 266, sharpShooter: 0.1 },
  { playerName: "Mika R.", eventId: 1, mvp: 8,  longestDrive: 236, sharpShooter: 0.9 },
  { playerName: "Pasi K.", eventId: 1, mvp: 5,  longestDrive: 215, sharpShooter: 2.1 },
  { playerName: "Mikko",   eventId: 1, mvp: 4,  longestDrive: 192, sharpShooter: 4.0 },
  { playerName: "Samu",    eventId: 1, mvp: 7,  longestDrive: 286, sharpShooter: 0.4 },
  { playerName: "Tommy",   eventId: 1, mvp: 11, longestDrive: 239, sharpShooter: 4.2 },
  { playerName: "Niko",    eventId: 1, mvp: 4,  longestDrive: 244, sharpShooter: 2.0 },
  { playerName: "Mika V.", eventId: 1, mvp: 7,  longestDrive: 215, sharpShooter: 0.3 },
  { playerName: "Elias",   eventId: 1, mvp: 8,  longestDrive: 235, sharpShooter: 1.7 },
  { playerName: "Jonas",   eventId: 1, mvp: 6,  longestDrive: 219, sharpShooter: 0.1 },
  { playerName: "Timo",    eventId: 1, mvp: 12, longestDrive: 206, sharpShooter: 1.1 },
  { playerName: "Mathias", eventId: 1, mvp: 10, longestDrive: 222, sharpShooter: 4.9 },
  { playerName: "Arttu",   eventId: 1, mvp: 8,  longestDrive: 246, sharpShooter: 0.5 },
  { playerName: "Peter",   eventId: 1, mvp: 9,  longestDrive: 249, sharpShooter: 1.0 },
  { playerName: "Dan",     eventId: 1, mvp: 5,  longestDrive: 206, sharpShooter: 3.2 },
  { playerName: "Kim",     eventId: 1, mvp: 10, longestDrive: 229, sharpShooter: 0.2 },
  { playerName: "Jani",    eventId: 1, mvp: 8,  longestDrive: 262, sharpShooter: 0.5 },
  { playerName: "Jesse",   eventId: 1, mvp: 13, longestDrive: 217, sharpShooter: 0.3 },
  { playerName: "Milla",   eventId: 1, mvp: 0,  longestDrive: 174, sharpShooter: 0.5 },
  { playerName: "Kimi",    eventId: 1, mvp: 7,  longestDrive: 215, sharpShooter: 1.3 },
  { playerName: "Janne",   eventId: 1, mvp: 1,  longestDrive: 177, sharpShooter: 1.7 },
  // ── Round 2 — Marco Simone (all 24, source: PDF 2026-03) ─────────────────
  { playerName: "Arto",    eventId: 2, mvp: 15,  longestDrive: 270.6, sharpShooter: 0.2  },
  { playerName: "Dan",     eventId: 2, mvp: 11,  longestDrive: 209.5, sharpShooter: 1.8  },
  { playerName: "Elias",   eventId: 2, mvp: 15,  longestDrive: 240.8, sharpShooter: 0.2  },
  { playerName: "Jani",    eventId: 2, mvp: 8,   longestDrive: 256.5, sharpShooter: 3.1  },
  { playerName: "Janne",   eventId: 2, mvp: 12,  longestDrive: 202.1, sharpShooter: 0.7  },
  { playerName: "Jesse",   eventId: 2, mvp: 9,   longestDrive: 221.0, sharpShooter: 0.1  },
  { playerName: "Jonas",   eventId: 2, mvp: 14,  longestDrive: 238.0, sharpShooter: 1.4  },
  { playerName: "Kim",     eventId: 2, mvp: 11,  longestDrive: 245.9, sharpShooter: 0.4  },
  { playerName: "Kimi",    eventId: 2, mvp: 9,   longestDrive: 227.1, sharpShooter: 0.2  },
  { playerName: "Mathias", eventId: 2, mvp: 11,  longestDrive: 200.9, sharpShooter: 0.9  },
  { playerName: "Mika V.", eventId: 2, mvp: 10,  longestDrive: 219.3, sharpShooter: 0.1  },
  { playerName: "Mikko",   eventId: 2, mvp: 11,  longestDrive: 204.0, sharpShooter: 4.0  },
  { playerName: "Pasi M.", eventId: 2, mvp: 12,  longestDrive: 256.0, sharpShooter: 3.2  },
  { playerName: "Peter",   eventId: 2, mvp: 7,   longestDrive: 243.4, sharpShooter: 0.7  },
  { playerName: "Samu",    eventId: 2, mvp: 15,  longestDrive: 283.5, sharpShooter: 0.2  },
  { playerName: "Timo",    eventId: 2, mvp: 14,  longestDrive: 214.9, sharpShooter: 0.7  },
  { playerName: "Tommy",   eventId: 2, mvp: 13,  longestDrive: 198.2, sharpShooter: 4.5  },
  { playerName: "Tuomo",   eventId: 2, mvp: 11,  longestDrive: 0,     sharpShooter: 0.8  }, // no drive recorded
  { playerName: "Arttu",   eventId: 2, mvp: 9,   longestDrive: 255.0, sharpShooter: 12.5 },
  { playerName: "Mika R.", eventId: 2, mvp: 12,  longestDrive: 240.7, sharpShooter: 1.2  },
  { playerName: "Milla",   eventId: 2, mvp: 10,  longestDrive: 0,     sharpShooter: 3.5  }, // no drive recorded
  { playerName: "Niko",    eventId: 2, mvp: 13,  longestDrive: 216.9, sharpShooter: 2.4  },
  { playerName: "Pasi K.", eventId: 2, mvp: 5,   longestDrive: 211.2, sharpShooter: 1.9  },
  { playerName: "Roope",   eventId: 2, mvp: 13,  longestDrive: 249.8, sharpShooter: 1.0  },
];

// ─── Birdie Helper ────────────────────────────────────────────────────────────

export function getBirdiesForRound(
  playerName: string,
  eventId: number,
): number {
  const pars = WC26_EVENT_PARS[eventId];
  const card = WC26_SCORECARDS.find(
    (s) => s.playerName === playerName && s.eventId === eventId,
  );
  if (!card || !pars) return 0;
  return card.holes.filter((strokes, i) => strokes < pars[i]).length;
}

// ─── Skill Challenge Points ───────────────────────────────────────────────────
// Longest Drive: 2pts to winner; Sharp Shooter: 1pt each if tied, 2pts if outright winner

export interface SkillPoints {
  eventId: number;
  team1_ld: number;   // Longest Drive points for J1
  team2_ld: number;   // Longest Drive points for J2
  team1_ss: number;   // Sharp Shooter points for J1
  team2_ss: number;   // Sharp Shooter points for J2
}

export const WC26_SKILL_POINTS: SkillPoints[] = [
  // Round 1 — Lofoten Links: Samu (J2) wins LD, SS tied
  { eventId: 1, team1_ld: 0, team2_ld: 2, team1_ss: 1, team2_ss: 1 },
  // Round 2 — Marco Simone: Samu (J2) wins LD, SS tied
  // Verified: J1 match=108 +0 LD +1 SS = 109 ✓; J2 match=108 +2 LD +1 SS = 111 ✓
  { eventId: 2, team1_ld: 0, team2_ld: 2, team1_ss: 1, team2_ss: 1 },
];

// ─── Computed Standings ───────────────────────────────────────────────────────

export function getStaticTeamStandings() {
  const matchJ1 = WC26_MATCHUPS.reduce((s, m) => s + m.team1_points, 0);
  const matchJ2 = WC26_MATCHUPS.reduce((s, m) => s + m.team2_points, 0);
  const skillJ1 = WC26_SKILL_POINTS.reduce((s, sp) => s + sp.team1_ld + sp.team1_ss, 0);
  const skillJ2 = WC26_SKILL_POINTS.reduce((s, sp) => s + sp.team2_ld + sp.team2_ss, 0);
  return {
    team1_total: matchJ1 + skillJ1,
    team2_total: matchJ2 + skillJ2,
  };
}
