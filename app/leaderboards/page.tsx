"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLeaderboards, getTournament, signOut, type LeaderboardData, type TournamentData } from "@/lib/player";

type Tab = "bestScores" | "longestDrives" | "closestToPin" | "netScores";

const TABS: { key: Tab; label: string }[] = [
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
  const color = p.team === 1 ? "#3f5b7b" : "#6b8db5";
  return (
    <span style={{
      display: "inline-block", width: "8px", height: "8px",
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("bestScores");

  async function load() {
    const [res, tRes] = await Promise.all([getLeaderboards(), getTournament()]);
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
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          LADATAAN...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(6,8,14,0.8)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <a href="/" style={{ textDecoration: "none" }}><img src="/wc26-logo.png" alt="WC26" style={{ height: "36px", width: "auto" }} /></a>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a
            href="/dashboard"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            HALLINTAPANEELI
          </a>
          <a
            href="/tournament"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            TURNAUS
          </a>
          <button
            onClick={handleSignOut}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "6px 12px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-bright)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            KIRJAUDU ULOS
          </button>
        </div>
      </header>

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
                    fontSize: "10px",
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
              {!data && (
                <div
                  style={{
                    padding: "48px",
                    textAlign: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
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
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>
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
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "var(--text-muted)", marginLeft: "3px" }}>m</span>
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>
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
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "11px", color: "var(--text-muted)", marginLeft: "3px" }}>cm</span>
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>
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
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "10px", color: "var(--text-muted)", marginLeft: "3px" }}>({row.total_shots} − {row.handicap_at_time})</span>
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>
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

function LeaderTable<T>({
  rows,
  renderRow,
  emptyMsg,
}: {
  rows: T[];
  columns: string[];
  renderRow: (row: T, index: number) => React.ReactNode;
  emptyMsg: string;
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
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "14px 24px",
            borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {renderRow(row, i)}
        </div>
      ))}
    </div>
  );
}
