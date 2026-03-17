import Link from "next/link";
import Hero from "@/components/Hero";
import TournamentInfo from "@/components/TournamentInfo";
import Chat from "@/components/Chat";
import NextEventBanner from "@/components/NextEventBanner";
import NewPlayerBanner from "@/components/NewPlayerBanner";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Main content — gradient background for depth */}
      <div style={{ background: "linear-gradient(180deg, #f0f3f8 0%, #fefefe 120px)" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {/* Next event banner */}
        <div style={{ padding: "32px 0 0" }}>
          <NextEventBanner />
        </div>

        {/* New player CTA banner — dismissible */}
        <NewPlayerBanner />

        {/* Section header */}
        <div
          style={{
            padding: "32px 0 0",
            marginBottom: "0",
          }}
        >
          <Link href="/info" style={{ textDecoration: "none", opacity: 1 }} className="section-link">
            <div
              className="section-label"
              style={{
                fontSize: "13px",
                letterSpacing: "0.2em",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Turnaus & Assistentti
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", opacity: 0.5 }}>→</span>
            </div>
          </Link>
          <div className="divider" style={{ marginTop: "16px" }} />
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
            gap: "48px",
            alignItems: "start",
          }}
          className="main-grid"
        >
          {/* Left: Tournament info */}
          <div>
            <TournamentInfo />
          </div>

          {/* Right: Chat */}
          <div style={{ paddingTop: "60px" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>
              Kysy WC26 Assistentilta
            </div>
            <Chat />
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "16px",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
          }}
        >
          WC26
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--text-dim)",
            letterSpacing: "0.08em",
          }}
        >
          WINTER CUP 2026 · TALVIGOLF · TAMMIKUU — KESÄKUU
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <span className="badge badge-blue">SINISET</span>
          <span className="badge badge-red">PUNAISET</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .section-link:hover { opacity: 0.7 !important; }
        .section-link { transition: opacity 0.15s; }
      `}</style>
    </main>
  );
}
