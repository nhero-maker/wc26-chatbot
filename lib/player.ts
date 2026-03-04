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
