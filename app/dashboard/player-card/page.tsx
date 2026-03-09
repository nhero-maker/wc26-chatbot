"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDashboard,
  getLeaderboards,
  signOut,
  type DashboardData,
  type LeaderboardData,
} from "@/lib/player";
import CardPanel from "@/components/CardPanel";
import ScoreBarChart from "@/components/charts/ScoreBarChart";
import DriveArcViz from "@/components/charts/DriveArcViz";
import PinTargetViz from "@/components/charts/PinTargetViz";
import ScoreVsHcpScatter from "@/components/charts/ScoreVsHcpScatter";
import ScoreTrendLine from "@/components/charts/ScoreTrendLine";
import RankingsBarChart from "@/components/charts/RankingsBarChart";
import GameProgressChart from "@/components/charts/GameProgressChart";
import ShotsVsParChart from "@/components/charts/ShotsVsParChart";

export default function PlayerCardPage() {
  const router = useRouter();
  const [dash, setDash] = useState<DashboardData | null>(null);
  const [lb, setLb] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getDashboard(), getLeaderboards()])
      .then(([dashRes, lbRes]) => {
        if (dashRes.success && dashRes.data) {
          setDash(dashRes.data);
        } else {
          if (dashRes.error?.includes("vanhentunut") || dashRes.error?.includes("kirjautunut")) {
            router.replace("/signin");
            return;
          }
          setError(dashRes.error ?? "Lataus epäonnistui.");
        }
        if (lbRes.success && lbRes.data) {
          setLb(lbRes.data);
        }
      })
      .catch(() => setError("Verkkovirhe."))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "11px",
          color: "var(--text-muted)", letterSpacing: "0.1em",
        }}>
          LADATAAN PELAAJAN KORTTIA...
        </div>
      </div>
    );
  }

  if (error || !dash) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
      }}>
        <div style={{
          background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)",
          borderRadius: "var(--radius-lg)", padding: "24px", maxWidth: "400px", textAlign: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-body)", fontSize: "14px",
            color: "var(--red-bright)", marginBottom: "16px",
          }}>
            {error || "Lataus epäonnistui."}
          </div>
          <a href="/dashboard" style={{
            display: "inline-block", background: "var(--blue-mid)", color: "#fff",
            padding: "10px 20px", borderRadius: "var(--radius)",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px",
            letterSpacing: "0.08em", textDecoration: "none",
          }}>
            TAKAISIN
          </a>
        </div>
      </div>
    );
  }

  const { player, rounds, stats } = dash;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid var(--border)", padding: "18px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: "blur(8px)", background: "rgba(6,8,14,0.8)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <a href="/" style={{
          fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "18px",
          letterSpacing: "0.15em", color: "var(--text)", textDecoration: "none",
        }}>
          WC26
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/dashboard" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "var(--text-muted)", letterSpacing: "0.1em", textDecoration: "none",
          }}>
            HALLINTAPANEELI
          </a>
          <a href="/leaderboards" style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "var(--text-muted)", letterSpacing: "0.1em", textDecoration: "none",
          }}>
            TULOKSET
          </a>
          <button onClick={handleSignOut} style={{
            background: "none", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "6px 12px",
            fontFamily: "var(--font-mono)", fontSize: "10px",
            letterSpacing: "0.1em", color: "var(--text-muted)", cursor: "pointer",
          }}>
            KIRJAUDU ULOS
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 80px" }}>
        {/* Player name banner */}
        <div style={{ marginBottom: "48px", animation: "fadeUp 0.4s ease both" }}>
          <div className="section-label" style={{ marginBottom: "12px" }}>
            Pelaajan kortti
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: "clamp(48px, 8vw, 80px)", color: "var(--text)",
            lineHeight: 1, letterSpacing: "0.02em",
          }}>
            {player.name.toUpperCase()}
          </h1>
          <div style={{
            display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap",
          }}>
            <span className="badge badge-blue">HCP {player.handicap}</span>
            <span className="badge badge-blue">{stats.rounds_count} kierrosta</span>
            {stats.best_score && (
              <span className="badge badge-gold">Paras {stats.best_score}</span>
            )}
          </div>
        </div>

        <div className="divider" style={{ marginBottom: "32px" }} />

        {/* Row 1: Score bars + Drive arcs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}>
          <CardPanel title="Tulos" delay={0.05}>
            <ScoreBarChart rounds={rounds} />
          </CardPanel>
          <CardPanel title="Pisin lyönti" delay={0.1}>
            <DriveArcViz rounds={rounds} />
          </CardPanel>
        </div>

        {/* Row 2: Scatter + Pin target + Trend */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}>
          {lb && (
            <CardPanel title="Tulos vs. HCP" delay={0.15}>
              <ScoreVsHcpScatter
                currentPlayerName={player.name}
                netScores={lb.netScores}
              />
            </CardPanel>
          )}
          <CardPanel title="Lähimpänä lippua" delay={0.2}>
            <PinTargetViz rounds={rounds} />
          </CardPanel>
          <CardPanel title="Tulostrendi" delay={0.25}>
            <ScoreTrendLine rounds={rounds} />
          </CardPanel>
        </div>

        {/* Row 3: Game progress + Shots vs Par (hole-by-hole) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}>
          <CardPanel title="Pelin eteneminen" delay={0.3}>
            <GameProgressChart rounds={rounds} />
          </CardPanel>
          <CardPanel title="Lyöntimäärä vs par" delay={0.35}>
            <ShotsVsParChart rounds={rounds} />
          </CardPanel>
        </div>

        {/* Row 4: Rankings */}
        {lb && (
          <div style={{ marginBottom: "20px" }}>
            <CardPanel title="Sijoitukset" delay={0.4}>
              <RankingsBarChart playerName={player.name} leaderboardData={lb} />
            </CardPanel>
          </div>
        )}
      </main>
    </div>
  );
}
