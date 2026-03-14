"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  WC26_TOURNAMENT_PLAYERS,
  WC26_EVENTS,
  WC26_MATCHUPS,
} from "@/lib/wc26-data";

type SeedStatus = "idle" | "running" | "done" | "error";

interface SeedResult {
  label: string;
  total: number;
  succeeded: number;
  failed: string[];
}

const btnStyle: React.CSSProperties = {
  background: "var(--blue-mid)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--radius)",
  padding: "10px 24px",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "13px",
  letterSpacing: "0.08em",
  cursor: "pointer",
  textTransform: "uppercase",
};

export default function SeedPage() {
  const router = useRouter();
  const [status, setStatus] = useState<SeedStatus>("idle");
  const [results, setResults] = useState<SeedResult[]>([]);
  const [log, setLog] = useState<string[]>([]);

  function addLog(msg: string) {
    setLog((prev) => [...prev, msg]);
  }

  async function postAdmin(path: string, body: object): Promise<boolean> {
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async function runSeed() {
    setStatus("running");
    setResults([]);
    setLog([]);

    // ── 1. Players ──────────────────────────────────────────────────────────
    addLog("Tuodaan pelaajat...");
    const playerResult: SeedResult = { label: "Pelaajat", total: WC26_TOURNAMENT_PLAYERS.length, succeeded: 0, failed: [] };
    for (const p of WC26_TOURNAMENT_PLAYERS) {
      const ok = await postAdmin("/api/admin/players", { name: p.name, team: p.team, handicap: p.handicap });
      if (ok) {
        playerResult.succeeded++;
        addLog(`  ✓ ${p.name}`);
      } else {
        playerResult.failed.push(p.name);
        addLog(`  ✗ ${p.name} — epäonnistui`);
      }
    }
    setResults((prev) => [...prev, playerResult]);

    // ── 2. Events ───────────────────────────────────────────────────────────
    addLog("Tuodaan kierrokset...");
    const eventResult: SeedResult = { label: "Kierrokset", total: WC26_EVENTS.length, succeeded: 0, failed: [] };
    for (const e of WC26_EVENTS) {
      const ok = await postAdmin("/api/admin/events", {
        course_id: e.course_id,
        course_name: e.course_name,
        event_month: e.event_month,
        format: e.format,
        course_settings: e.course_settings,
      });
      if (ok) {
        eventResult.succeeded++;
        addLog(`  ✓ ${e.course_name}`);
      } else {
        eventResult.failed.push(e.course_name);
        addLog(`  ✗ ${e.course_name} — epäonnistui`);
      }
    }
    setResults((prev) => [...prev, eventResult]);

    // ── 3. Matchups ─────────────────────────────────────────────────────────
    addLog("Tuodaan parit ja tulokset...");
    const matchupResult: SeedResult = { label: "Parit", total: WC26_MATCHUPS.length, succeeded: 0, failed: [] };
    for (const m of WC26_MATCHUPS) {
      const label = `${m.t1p1}${m.t1p2 ? "+" + m.t1p2 : ""} vs ${m.t2p1}${m.t2p2 ? "+" + m.t2p2 : ""}`;
      const ok = await postAdmin("/api/admin/matchups", {
        event_id: m.event_id,
        t1p1: m.t1p1,
        t1p2: m.t1p2 ?? null,
        t2p1: m.t2p1,
        t2p2: m.t2p2 ?? null,
        team1_points: m.team1_points,
        team2_points: m.team2_points,
      });
      if (ok) {
        matchupResult.succeeded++;
        addLog(`  ✓ ${label}`);
      } else {
        matchupResult.failed.push(label);
        addLog(`  ✗ ${label} — epäonnistui`);
      }
    }
    setResults((prev) => [...prev, matchupResult]);

    const anyFailed = results.some((r) => r.failed.length > 0) ||
      playerResult.failed.length > 0 || eventResult.failed.length > 0 || matchupResult.failed.length > 0;
    setStatus(anyFailed ? "error" : "done");
    addLog(anyFailed ? "Valmis — osa epäonnistui." : "Kaikki tuotu onnistuneesti.");
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{
        borderBottom: "1px solid var(--border)",
        padding: "18px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img src="/wc26-logo.png" alt="WC26" style={{ height: "36px", width: "auto" }} />
        </a>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <a href="/admin" style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.1em" }}>
            ADMIN
          </a>
          <button
            onClick={() => router.push("/")}
            style={{ ...btnStyle, background: "none", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            TAKAISIN
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 32px 80px" }}>
        <div style={{ marginBottom: "40px" }}>
          <div className="section-label" style={{ marginBottom: "12px" }}>Admin — Tietojen tuonti</div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: "clamp(32px, 6vw, 56px)", color: "var(--text)",
            lineHeight: 1, letterSpacing: "0.02em",
          }}>
            SEED DATA
          </h1>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Tuo turnauksen perusdata N8N-taustajärjestelmään. Tämä on kertakäyttöinen operaatio —
            aja vain kerran, kun N8N-tietokanta on tyhjä. Jos data on jo N8N:ssä, skip tämä.
          </p>
        </div>

        {/* Preview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Pelaajaa", count: WC26_TOURNAMENT_PLAYERS.length, sub: "12 siniset · 12 punaiset" },
            { label: "Kierrosta", count: WC26_EVENTS.length, sub: "Lofoten → Grande Finale" },
            { label: "Matsia", count: WC26_MATCHUPS.length, sub: "K1 kaikki · K2 valmiit" },
          ].map((item) => (
            <div key={item.label} style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900,
                fontSize: "36px", color: "var(--text)",
              }}>
                {item.count}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "4px" }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Action */}
        {status === "idle" && (
          <div style={{
            background: "rgba(201,169,110,0.05)",
            border: "1px solid rgba(201,169,110,0.25)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            marginBottom: "24px",
          }}>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px", lineHeight: 1.5 }}>
              Tämä tulee lisäämään <strong style={{ color: "var(--text)" }}>24 pelaajaa</strong>,{" "}
              <strong style={{ color: "var(--text)" }}>6 kierrosta</strong> ja{" "}
              <strong style={{ color: "var(--text)" }}>12 otteluparia</strong> N8N-tietokantaan.
              Operaatio kestää noin 10–30 sekuntia.
            </p>
            <button onClick={runSeed} style={btnStyle}>
              Aloita tuonti
            </button>
          </div>
        )}

        {status === "running" && (
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "13px",
            color: "var(--text-muted)", letterSpacing: "0.05em", marginBottom: "16px",
          }}>
            TUODAAN DATAA...
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            {results.map((r) => (
              <div key={r.label} style={{
                background: "var(--surface)",
                border: `1px solid ${r.failed.length === 0 ? "rgba(34,197,94,0.25)" : "rgba(220,38,38,0.25)"}`,
                borderRadius: "var(--radius-lg)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <span style={{ fontSize: "18px" }}>{r.failed.length === 0 ? "✅" : "⚠️"}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px" }}>
                    {r.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {r.succeeded}/{r.total} onnistui
                    {r.failed.length > 0 && ` · Epäonnistui: ${r.failed.join(", ")}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {(status === "done" || status === "error") && (
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <a href="/tournament" style={{ ...btnStyle, textDecoration: "none", display: "inline-block" }}>
              Tarkista turnaussivu
            </a>
            <button onClick={() => router.push("/admin")} style={{ ...btnStyle, background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)" }}>
              Takaisin adminiin
            </button>
          </div>
        )}

        {/* Log */}
        {log.length > 0 && (
          <div style={{
            background: "#0d1117",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "var(--radius-lg)",
            padding: "16px 20px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "#8b949e",
            lineHeight: 1.8,
            maxHeight: "320px",
            overflowY: "auto",
          }}>
            {log.map((line, i) => (
              <div key={i} style={{ color: line.startsWith("  ✓") ? "#3fb950" : line.startsWith("  ✗") ? "#f85149" : "#8b949e" }}>
                {line}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
