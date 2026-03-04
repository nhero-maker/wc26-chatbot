"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboard, signOut, deleteRound, type DashboardData, type Round } from "@/lib/player";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function StatCard({ label, value, unit }: { label: string; value: string | number | null; unit?: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "32px",
          color: value !== null ? "var(--text)" : "var(--text-dim)",
          lineHeight: 1,
        }}
      >
        {value !== null ? value : "\u2014"}
        {value !== null && unit && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 400,
              fontSize: "14px",
              color: "var(--text-muted)",
              marginLeft: "4px",
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadDashboard() {
    const res = await getDashboard();
    if (res.success && res.data) {
      setData(res.data);
    } else {
      if (res.error?.includes("vanhentunut") || res.error?.includes("kirjautunut")) {
        router.replace("/signin");
      } else {
        setError(res.error ?? "Lataus ep\u00e4onnistui.");
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function handleDelete(round: Round) {
    if (!confirm(`Haluatko poistaa kierroksen ${round.course_name ?? round.course_name_custom} (${formatDate(round.date_played)})?`)) return;
    setDeletingId(round.id);
    const res = await deleteRound(round.id);
    if (res.success) {
      loadDashboard();
    } else {
      alert(res.error ?? "Poisto ep\u00e4onnistui.");
    }
    setDeletingId(null);
  }

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

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "rgba(220,38,38,0.1)",
            border: "1px solid rgba(220,38,38,0.25)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--red-bright)",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
          <button
            onClick={loadDashboard}
            style={{
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
            YRIT\u00c4 UUDELLEEN
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { player, rounds, stats } = data;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(8px)",
          background: "rgba(6,8,14,0.8)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "18px",
            letterSpacing: "0.15em",
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          WC26
        </a>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <a
            href="/leaderboards"
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
            TULOKSET
          </a>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            {player.name}
          </span>
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

      {/* Main content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 32px 80px",
        }}
      >
        {/* Page header */}
        <div style={{ marginBottom: "40px", animation: "fadeUp 0.4s ease both" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>
            Pelaajan hallintapaneeli
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
            {player.name.toUpperCase()}
          </h1>
          <div
            style={{
              marginTop: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
            }}
          >
            TASOITUS {player.handicap} \u00b7 {player.email}
          </div>
        </div>

        <div className="divider" style={{ marginBottom: "40px" }} />

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            marginBottom: "48px",
            animation: "fadeUp 0.4s 0.1s ease both",
          }}
        >
          <StatCard label="Kierroksia" value={stats.rounds_count} />
          <StatCard label="Paras tulos" value={stats.best_score} unit="ly\u00f6nti\u00e4" />
          <StatCard
            label="Keskim. tulos"
            value={stats.avg_score !== null ? Math.round(stats.avg_score) : null}
            unit="ly\u00f6nti\u00e4"
          />
          <StatCard label="Pisin ly\u00f6nti" value={stats.best_longest_drive} unit="m" />
          <StatCard label="L\u00e4himp\u00e4n\u00e4" value={stats.best_closest_to_pin} unit="cm" />
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "48px",
            animation: "fadeUp 0.4s 0.15s ease both",
          }}
        >
          <a
            href="/dashboard/rounds/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--blue-mid)",
              color: "#fff",
              padding: "12px 22px",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--blue-bright)";
              e.currentTarget.style.color = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--blue-mid)";
              e.currentTarget.style.color = "#fff";
            }}
          >
            + KIRJAA KIERROS
          </a>
          <a
            href="/leaderboards"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              color: "var(--text-muted)",
              padding: "12px 22px",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.08em",
              textDecoration: "none",
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
            TULOSTAULUKOT
          </a>
        </div>

        {/* Rounds list */}
        <div style={{ animation: "fadeUp 0.4s 0.2s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div className="section-label">Kierrokset ({rounds.length})</div>
          </div>

          {rounds.length === 0 ? (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "48px 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "40px",
                  color: "var(--text-dim)",
                  marginBottom: "12px",
                }}
              >
                \u26f3
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "var(--text-muted)",
                }}
              >
                Ei kierroksia viel\u00e4.{" "}
                <a href="/dashboard/rounds/new" style={{ color: "var(--blue-bright)", textDecoration: "none" }}>
                  Kirjaa ensimm\u00e4inen.
                </a>
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              {rounds.map((round, i) => (
                <div
                  key={round.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto auto auto",
                    gap: "16px",
                    alignItems: "center",
                    padding: "16px 24px",
                    borderBottom: i < rounds.length - 1 ? "1px solid var(--border)" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {/* Course + date */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "var(--text)",
                        fontWeight: 500,
                      }}
                    >
                      {round.course_name ?? round.course_name_custom ?? "Tuntematon kentt\u00e4"}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        marginTop: "2px",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {formatDate(round.date_played)}
                    </div>
                  </div>

                  {/* Shots */}
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "20px",
                        color: "var(--text)",
                      }}
                    >
                      {round.total_shots}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        marginLeft: "4px",
                      }}
                    >
                      ly\u00f6nti\u00e4
                    </span>
                  </div>

                  {/* Handicap */}
                  <div>
                    <span className="badge badge-blue">HCP {round.handicap_at_time}</span>
                  </div>

                  {/* Edit */}
                  <a
                    href={`/dashboard/rounds/${round.id}/edit`}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      padding: "6px 10px",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
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
                    MUOKKAA
                  </a>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(round)}
                    disabled={deletingId === round.id}
                    style={{
                      background: "none",
                      border: "1px solid rgba(220,38,38,0.3)",
                      borderRadius: "var(--radius)",
                      padding: "6px 10px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      color: "var(--red-bright)",
                      cursor: deletingId === round.id ? "not-allowed" : "pointer",
                      opacity: deletingId === round.id ? 0.5 : 1,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(220,38,38,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    {deletingId === round.id ? "..." : "POISTA"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
