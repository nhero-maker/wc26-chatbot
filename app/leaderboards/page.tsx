"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLeaderboards, getTournament, getMe, signOut, type LeaderboardData, type TournamentData } from "@/lib/player";
import AppNav from "@/components/AppNav";
import { LeaderboardSkeleton } from "@/components/Skeleton";
import { WC26_SEASON_STATS, WC26_SCORECARDS, WC26_EVENT_PARS, type PlayerSeasonStats } from "@/lib/wc26-data";

// Rounds completed so far — update when new rounds finish
const COMPLETED_ROUND_IDS = [1, 2];

type Tab = "bestScores" | "longestDrives" | "closestToPin" | "netScores" | "standings";

const TABS: { key: Tab; label: string }[] = [
  { key: "standings", label: "SIJOITUKSET" },
  { key: "bestScores", label: "PARAS TULOS" },
  { key: "longestDrives", label: "PISIN LYÖNTI" },
  { key: "closestToPin", label: "LÄHIMPÄNÄ" },
  { key: "netScores", label: "NETTOTULOS" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function TeamDot({ name, tourney }: { name: string; tourney: TournamentData | null }) {
  if (!tourney) return null;
  const p = tourney.players.find((tp) => tp.name === name);
  if (!p) return null;
  const color = p.team === 1 ? "var(--blue-team)" : "var(--red-team)";
  return (
    <span style={{
      display: "inline-block", width: "10px", height: "10px",
      borderRadius: "50%", background: color, marginRight: "6px", flexShrink: 0,
    }} />
  );
}

function MedalBadge({ rank }: { rank: number }) {
  const colors: Record<number, string> = {
    1: "var(--gold-bright)",
    2: "#c0c0c0",
    3: "#cd7f32",
  };
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "14px",
        color: colors[rank] ?? "var(--text-muted)",
        minWidth: "24px",
        textAlign: "right",
      }}
    >
      {rank}
    </span>
  );
}

export default function LeaderboardsPage() {
  const router = useRouter();
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [tourney, setTourney] = useState<TournamentData | null>(null);
  const [me, setMe] = useState<{ name: string; team: number | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("standings");

  async function load() {
    const [res, tRes, meRes] = await Promise.all([getLeaderboards(), getTournament(), getMe()]);
    if (res.success && res.data) {
      setData(res.data);
    } else {
      if (res.error?.includes("kirjautunut")) {
        router.replace("/signin");
      } else {
        setError(res.error ?? "Lataus epäonnistui.");
      }
    }
    if (tRes.success && tRes.data) {
      setTourney(tRes.data);
    }
    if (meRes.success && meRes.data) {
      setMe(meRes.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  if (loading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppNav activePage="leaderboards" onSignOut={handleSignOut} />

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 32px 80px" }}>
        {/* Page header */}
        <div style={{ marginBottom: "40px", animation: "fadeUp 0.4s ease both" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>
            Jäsenten tulostaulukot
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "var(--text)",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            TULOKSET
          </h1>
        </div>

        <div className="divider" style={{ marginBottom: "32px" }} />

        {error ? (
          <div
            style={{
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.25)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--red-bright)" }}>
              {error}
            </p>
            <button
              onClick={load}
              style={{
                marginTop: "12px",
                background: "var(--blue-mid)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius)",
                padding: "10px 20px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.08em",
                cursor: "pointer",
              }}
            >
              YRITÄ UUDELLEEN
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "4px",
                marginBottom: "32px",
                overflowX: "auto",
                animation: "fadeUp 0.4s 0.1s ease both",
              }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    flex: 1,
                    minWidth: "120px",
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "var(--radius)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background: activeTab === tab.key ? "var(--blue-mid)" : "transparent",
                    color: activeTab === tab.key ? "#fff" : "var(--text-muted)",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                animation: "fadeUp 0.4s 0.15s ease both",
              }}
            >
              {activeTab === "standings" && (
                <StandingsTable stats={WC26_SEASON_STATS} tourney={tourney} me={me} />
              )}

              {!data && activeTab !== "standings" && (
                <div
                  style={{
                    padding: "48px",
                    textAlign: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  LADATAAN...
                </div>
              )}

              {data && activeTab === "bestScores" && (
                <LeaderTable
                  rows={data.bestScores}
                  columns={["Nimi", "Kenttä", "Lyöntiä", "Päivä"]}
                  meName={me?.name} tourney={tourney} getPlayerName={(r) => r.player_name}
                  renderRow={(row, i) => (
                    <>
                      <MedalBadge rank={i + 1} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text)", display: "flex", alignItems: "center" }}>
                        <TeamDot name={row.player_name} tourney={tourney} />{row.player_name}
                      </span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-muted)" }}>{row.course_name}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: "20px",
                          color: i === 0 ? "var(--gold-bright)" : "var(--text)",
                        }}
                      >
                        {row.total_shots}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                        {formatDate(row.date_played)}
                      </span>
                    </>
                  )}
                  emptyMsg="Ei tuloksia vielä."
                />
              )}

              {data && activeTab === "longestDrives" && (
                <LeaderTable
                  rows={data.longestDrives}
                  columns={["Nimi", "Kenttä", "Metriä", "Päivä"]}
                  meName={me?.name} tourney={tourney} getPlayerName={(r) => r.player_name}
                  renderRow={(row, i) => (
                    <>
                      <MedalBadge rank={i + 1} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text)", display: "flex", alignItems: "center" }}>
                        <TeamDot name={row.player_name} tourney={tourney} />{row.player_name}
                      </span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-muted)" }}>{row.course_name}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: "20px",
                          color: i === 0 ? "var(--gold-bright)" : "var(--text)",
                        }}
                      >
                        {row.longest_drive}
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "13px", color: "var(--text-muted)", marginLeft: "3px" }}>m</span>
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                        {formatDate(row.date_played)}
                      </span>
                    </>
                  )}
                  emptyMsg="Ei lyöntejä kirjattu."
                />
              )}

              {data && activeTab === "closestToPin" && (
                <LeaderTable
                  rows={data.closestToPin}
                  columns={["Nimi", "Kenttä", "Senttimetriä", "Päivä"]}
                  meName={me?.name} tourney={tourney} getPlayerName={(r) => r.player_name}
                  renderRow={(row, i) => (
                    <>
                      <MedalBadge rank={i + 1} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text)", display: "flex", alignItems: "center" }}>
                        <TeamDot name={row.player_name} tourney={tourney} />{row.player_name}
                      </span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-muted)" }}>{row.course_name}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: "20px",
                          color: i === 0 ? "var(--gold-bright)" : "var(--text)",
                        }}
                      >
                        {row.closest_to_pin}
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "13px", color: "var(--text-muted)", marginLeft: "3px" }}>cm</span>
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                        {formatDate(row.date_played)}
                      </span>
                    </>
                  )}
                  emptyMsg="Ei tuloksia kirjattu."
                />
              )}

              {data && activeTab === "netScores" && (
                <LeaderTable
                  rows={data.netScores}
                  columns={["Nimi", "Kenttä", "Netto", "Päivä"]}
                  meName={me?.name} tourney={tourney} getPlayerName={(r) => r.player_name}
                  renderRow={(row, i) => (
                    <>
                      <MedalBadge rank={i + 1} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text)", display: "flex", alignItems: "center" }}>
                        <TeamDot name={row.player_name} tourney={tourney} />{row.player_name}
                      </span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-muted)" }}>{row.course_name}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: "20px",
                          color: i === 0 ? "var(--gold-bright)" : "var(--text)",
                        }}
                      >
                        {row.net_score}
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "12px", color: "var(--text-muted)", marginLeft: "3px" }}>({row.total_shots} − {row.handicap_at_time})</span>
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                        {formatDate(row.date_played)}
                      </span>
                    </>
                  )}
                  emptyMsg="Ei tuloksia vielä."
                />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ─── Season Standings Table ───────────────────────────────────────────────────

type StandingsView = "net" | "mvp" | "birdies" | "drive" | "sharp";

const STANDING_VIEWS: { key: StandingsView; label: string; desc: string }[] = [
  { key: "net",    label: "NETTO",   desc: "Nettopisteet (pienempi = parempi)" },
  { key: "mvp",    label: "MVP",     desc: "Reikäpisteet yhteensä" },
  { key: "birdies",label: "BIRDMAN", desc: "Birdieitä yhteensä" },
  { key: "drive",  label: "DRAIVI",  desc: "Pisin draivi (m)" },
  { key: "sharp",  label: "TARKKUUS",desc: "Ero 100 metriin (m, pienempi = parempi)" },
];

function getProjectedNet(playerName: string, actualNet: number): { projected: number; isProjected: boolean } {
  const playedIds = new Set(
    WC26_SCORECARDS.filter((s) => s.playerName === playerName).map((s) => s.eventId)
  );
  const missingPar = COMPLETED_ROUND_IDS
    .filter((id) => !playedIds.has(id))
    .reduce((sum, id) => sum + (WC26_EVENT_PARS[id]?.reduce((a, b) => a + b, 0) ?? 0), 0);
  return { projected: actualNet + missingPar, isProjected: missingPar > 0 };
}

function StandingsTable({ stats, tourney, me }: { stats: PlayerSeasonStats[]; tourney: TournamentData | null; me?: { name: string; team: number | null } | null }) {
  const [view, setView] = useState<StandingsView>("net");

  const sorted = [...stats].sort((a, b) => {
    if (view === "net") {
      const pa = getProjectedNet(a.name, a.netTotal).projected;
      const pb = getProjectedNet(b.name, b.netTotal).projected;
      return pa - pb;
    }
    switch (view) {
      case "mvp":    return b.mvpTotal - a.mvpTotal;
      case "birdies":return b.birdiesTotal - a.birdiesTotal;
      case "drive":  return b.bestDrive - a.bestDrive;
      case "sharp":  return a.sharpShooterBest - b.sharpShooterBest;
    }
  });

  return (
    <div>
      {/* Sub-tab bar */}
      <div style={{
        display: "flex", gap: "4px", padding: "12px 16px",
        borderBottom: "1px solid var(--border)", overflowX: "auto",
        background: "var(--surface-2)",
      }}>
        {STANDING_VIEWS.map((sv) => (
          <button
            key={sv.key}
            onClick={() => setView(sv.key)}
            style={{
              padding: "6px 12px",
              border: "none",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              cursor: "pointer",
              whiteSpace: "nowrap",
              background: view === sv.key ? "var(--blue-team)" : "transparent",
              color: view === sv.key ? "#fff" : "var(--text-muted)",
              transition: "all 0.2s",
            }}
          >
            {sv.label}
          </button>
        ))}
      </div>
      {/* Projected score note */}
      {view === "net" && (
        <div style={{
          padding: "8px 24px",
          background: "rgba(201,169,110,0.06)",
          borderBottom: "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
        }}>
          <span style={{ color: "var(--gold-bright)", marginRight: "6px" }}>proj.</span>
          = kierros pelaamatta, kentän par lisätty väliaikaisesti
        </div>
      )}
      {/* Rows */}
      {sorted.map((p, i) => {
        const isT1 = p.team === 1;
        const teamColor = isT1 ? "var(--blue-team)" : "var(--red-team)";
        let displayValue: string;
        let isProjected = false;
        switch (view) {
          case "net": {
            const { projected, isProjected: proj } = getProjectedNet(p.name, p.netTotal);
            displayValue = String(projected);
            isProjected = proj;
            break;
          }
          case "mvp":     displayValue = String(p.mvpTotal); break;
          case "birdies": displayValue = String(p.birdiesTotal); break;
          case "drive":   displayValue = `${p.bestDrive.toFixed(1)} m`; break;
          case "sharp":   displayValue = `${p.sharpShooterBest.toFixed(2)} m`; break;
        }
        const isMe = me?.name === p.name;
        const meBg = isT1 ? "rgba(45,107,196,0.08)" : "rgba(199,48,48,0.08)";
        const meBorder = isT1 ? "var(--blue-team)" : "var(--red-team)";
        return (
          <div
            key={p.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "12px 24px",
              paddingLeft: isMe ? "21px" : "24px",
              borderBottom: i < sorted.length - 1 ? "1px solid var(--border)" : "none",
              borderLeft: isMe ? `3px solid ${meBorder}` : "3px solid transparent",
              background: isMe ? meBg : "transparent",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { if (!isMe) e.currentTarget.style.background = "var(--surface-2)"; }}
            onMouseLeave={(e) => { if (!isMe) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "14px",
              color: i < 3 ? (["var(--gold-bright)", "#c0c0c0", "#cd7f32"] as const)[i] : "var(--text-muted)",
              minWidth: "24px", textAlign: "right",
            }}>
              {i + 1}
            </span>
            <span style={{
              display: "inline-block", width: "10px", height: "10px",
              borderRadius: "50%", background: teamColor, flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-body)", fontSize: "14px",
              color: "var(--text)", flex: 1,
            }}>
              {p.name}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              color: "var(--text-dim)", marginRight: "4px",
            }}>
              {p.roundsPlayed}kd
            </span>
            {isProjected && (
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "10px",
                color: "var(--gold-bright)", letterSpacing: "0.06em",
              }}>
                proj.
              </span>
            )}
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "20px",
              color: isProjected ? "var(--text-muted)" : (i === 0 ? "var(--gold-bright)" : "var(--text)"),
              minWidth: "60px", textAlign: "right",
            }}>
              {displayValue}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function LeaderTable<T>({
  rows,
  renderRow,
  emptyMsg,
  meName,
  tourney: tableTeam,
  getPlayerName,
}: {
  rows: T[];
  columns: string[];
  renderRow: (row: T, index: number) => React.ReactNode;
  emptyMsg: string;
  meName?: string | null;
  tourney?: TournamentData | null;
  getPlayerName?: (row: T) => string;
}) {
  if (rows.length === 0) {
    return (
      <div
        style={{
          padding: "48px",
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--text-muted)",
        }}
      >
        {emptyMsg}
      </div>
    );
  }

  return (
    <div>
      {rows.map((row, i) => {
        const pName = getPlayerName ? getPlayerName(row) : undefined;
        const isMe = !!(meName && pName && pName === meName);
        const tp = isMe && tableTeam ? tableTeam.players.find((p) => p.name === pName) : null;
        const meBg = tp?.team === 1 ? "rgba(45,107,196,0.08)" : tp ? "rgba(199,48,48,0.08)" : "transparent";
        const meBorder = tp?.team === 1 ? "var(--blue-team)" : tp ? "var(--red-team)" : "transparent";
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "14px 24px",
              paddingLeft: isMe ? "21px" : "24px",
              borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
              borderLeft: isMe ? `3px solid ${meBorder}` : "3px solid transparent",
              background: isMe ? meBg : "transparent",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { if (!isMe) e.currentTarget.style.background = "var(--surface-2)"; }}
            onMouseLeave={(e) => { if (!isMe) e.currentTarget.style.background = "transparent"; }}
          >
            {renderRow(row, i)}
          </div>
        );
      })}
    </div>
  );
}
