import Hero from "@/components/Hero";
import TournamentInfo from "@/components/TournamentInfo";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Main content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {/* Section header */}
        <div
          style={{
            padding: "48px 0 0",
            marginBottom: "0",
          }}
        >
          <div className="section-label">Turnaus & Assistentti</div>
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
      `}</style>
    </main>
  );
}
