// ─── Types ───────────────────────────────────────────────────────────────────

export interface Player {
  id: string;
  name: string;
  email: string;
  phone: string;
  handicap: number;
  is_verified: boolean;
  created_at: string;
}

export interface Round {
  id: string;
  player_id: string;
  course_id: number | null;
  course_name: string | null;
  course_name_custom: string | null;
  date_played: string;
  total_shots: number;
  longest_drive: number | null;
  closest_to_pin: number | null;
  notes: string | null;
  handicap_at_time: number;
  created_at: string;
  holes?: HoleScore[];
}

export interface HoleScore {
  hole_number: number;
  par: number;
  strokes: number;
}

export interface DashboardStats {
  rounds_count: number;
  best_score: number | null;
  avg_score: number | null;
  best_longest_drive: number | null;
  best_closest_to_pin: number | null;
}

export interface DashboardData {
  player: Player;
  rounds: Round[];
  stats: DashboardStats;
}

export interface LeaderboardEntry {
  player_name: string;
  course_name: string;
  total_shots: number;
  date_played: string;
}

export interface DriveEntry {
  player_name: string;
  longest_drive: number;
  course_name: string;
  date_played: string;
}

export interface PinEntry {
  player_name: string;
  closest_to_pin: number;
  course_name: string;
  date_played: string;
}

export interface NetEntry {
  player_name: string;
  net_score: number;
  total_shots: number;
  handicap_at_time: number;
  course_name: string;
  date_played: string;
}

export interface LeaderboardData {
  bestScores: LeaderboardEntry[];
  longestDrives: DriveEntry[];
  closestToPin: PinEntry[];
  netScores: NetEntry[];
}

// ─── Tournament Types ────────────────────────────────────────────────────────

export interface TournamentPlayer {
  id: number;
  name: string;
  team: number;
  handicap: number;
}

export interface TournamentEvent {
  id: number;
  course_id: number;
  course_name: string;
  event_month: string;
  format: "fourball" | "singles";
  course_settings: {
    male_tee?: string;
    female_tee?: string;
    scoring?: string;
    holes?: string;
    putting?: string;
    pins?: string;
    mulligans?: string;
    wind?: string;
    fairway_firmness?: string;
    green_firmness?: string;
    green_stimp?: string;
  };
}

export interface Matchup {
  id: number;
  event_id: number;
  t1p1: string;
  t1p2: string | null;
  t2p1: string;
  t2p2: string | null;
  team1_points: number;
  team2_points: number;
}

export interface BonusPointEntry {
  player: string;
  event_id: number;
  type: "mvp" | "birdman" | "skill_drive" | "skill_pin";
  points: number;
}

export interface TeamStandings {
  team1_total: number;
  team2_total: number;
}

export interface TournamentData {
  players: TournamentPlayer[];
  events: TournamentEvent[];
  matchups: Matchup[];
  bonusPoints: BonusPointEntry[];
  teamStandings: TeamStandings;
}

// ─── API Client Functions ─────────────────────────────────────────────────────

export async function registerPlayer(data: {
  name: string;
  email: string;
  phone: string;
  handicap: number;
}) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function requestSignIn(email: string) {
  const res = await fetch("/api/auth/signin-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function verifySignIn(token: string) {
  const res = await fetch("/api/auth/signin-verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  return res.json();
}

export async function signOut() {
  const res = await fetch("/api/auth/signout", { method: "POST" });
  return res.json();
}

export async function getDashboard(): Promise<{
  success: boolean;
  data?: DashboardData;
  error?: string;
}> {
  const res = await fetch("/api/player/dashboard");
  return res.json();
}

export async function createRound(data: {
  course_id?: number;
  course_name_custom?: string;
  date_played: string;
  total_shots: number;
  longest_drive?: number;
  closest_to_pin?: number;
  notes?: string;
  handicap_at_time: number;
  holes?: HoleScore[];
}) {
  const res = await fetch("/api/player/rounds", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateRound(
  id: string,
  data: Partial<{
    course_id: number;
    course_name_custom: string;
    date_played: string;
    total_shots: number;
    longest_drive: number;
    closest_to_pin: number;
    notes: string;
    handicap_at_time: number;
    holes: HoleScore[];
  }>
) {
  const res = await fetch(`/api/player/rounds/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteRound(id: string) {
  const res = await fetch(`/api/player/rounds/${id}`, { method: "DELETE" });
  return res.json();
}

export async function getLeaderboards(): Promise<{
  success: boolean;
  data?: LeaderboardData;
  error?: string;
}> {
  const res = await fetch("/api/player/leaderboards");
  return res.json();
}

export async function getTournament(): Promise<{
  success: boolean;
  data?: TournamentData;
  error?: string;
}> {
  const res = await fetch("/api/tournament");
  return res.json();
}
