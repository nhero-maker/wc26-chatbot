"use client";

export default function Hero() {
  const courses = [
    { label: "Lofoten", month: "Tam", active: true },
    { label: "Marco Simone", month: "Hel", active: false },
    { label: "Evian", month: "Maa", active: false },
    { label: "Valderrama", month: "Huh", active: false },
    { label: "St Andrews", month: "Tou", active: false },
    { label: "Finale", month: "Kes", active: false },
  ];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Hero background image */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/wc26-hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />

      {/* Dark overlay for readability */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(6,8,14,0.4) 0%, rgba(6,8,14,0.7) 50%, rgba(6,8,14,0.95) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Header nav */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(8px)",
          background: "rgba(6,8,14,0.6)",
          zIndex: 10,
        }}
      >
        <img
          src="/wc26-logo.png"
          alt="WC26 Winter Cup 2026"
          style={{ height: "36px", width: "auto" }}
        />
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            letterSpacing: "0.12em",
          }}
        >
          KAUSI 2026
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <a
            href="/signin"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textDecoration: "none",
              padding: "6px 14px",
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
            KIRJAUDU
          </a>
          <a
            href="#chat"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--blue-bright)",
              letterSpacing: "0.1em",
              textDecoration: "none",
              padding: "6px 14px",
              border: "1px solid rgba(63,91,123,0.4)",
              borderRadius: "var(--radius)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(63,91,123,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            KYSY ASSISTENTILTA
          </a>
        </div>
      </div>

      {/* Main hero content */}
      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Season label */}
        <div
          className="section-label"
          style={{
            marginBottom: "32px",
            animation: "fadeUp 0.5s 0.1s ease both",
            justifyContent: "center",
          }}
        >
          Talvigolf · Simulaattoriturnaus · 2026
        </div>

        {/* Shield logo */}
        <div style={{ animation: "fadeUp 0.6s 0.2s ease both" }}>
          <img
            src="/wc26-logo.png"
            alt="Winter Cup 2026"
            style={{
              height: "clamp(200px, 30vw, 320px)",
              width: "auto",
              margin: "0 auto",
              display: "block",
              filter: "drop-shadow(0 4px 40px rgba(0,0,0,0.5))",
            }}
          />
        </div>

        {/* Teams vs bar */}
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            animation: "fadeUp 0.6s 0.4s ease both",
            maxWidth: "600px",
            margin: "48px auto 0",
          }}
        >
          <div style={{ textAlign: "right", minWidth: "120px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                letterSpacing: "0.08em",
                color: "var(--blue-bright)",
              }}
            >
              SINISET
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
              }}
            >
              JOUKKUE 1
            </div>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <div
              style={{
                height: "4px",
                background: "var(--border)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "50%",
                  background: "linear-gradient(90deg, var(--blue-mid), var(--blue-bright))",
                  borderRadius: "2px 0 0 2px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  width: "50%",
                  background: "linear-gradient(90deg, var(--blue-light), var(--blue-light))",
                  borderRadius: "0 2px 2px 0",
                  opacity: 0.6,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "var(--bg)",
                border: "1px solid var(--border-bright)",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.05em",
                color: "var(--text-muted)",
              }}
            >
              VS
            </div>
          </div>
          <div style={{ minWidth: "120px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                letterSpacing: "0.08em",
                color: "var(--blue-light)",
              }}
            >
              PUNAISET
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
              }}
            >
              JOUKKUE 2
            </div>
          </div>
        </div>

        {/* Season timeline */}
        <div
          style={{
            marginTop: "48px",
            animation: "fadeUp 0.6s 0.5s ease both",
          }}
        >
          <div className="section-label" style={{ marginBottom: "20px", justifyContent: "center" }}>
            Kauden eteneminen
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 0,
              position: "relative",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {courses.map((course, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Connecting line */}
                {i < courses.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "11px",
                      left: "50%",
                      right: "-50%",
                      height: "1px",
                      background: "var(--border)",
                      zIndex: 0,
                    }}
                  />
                )}
                {/* Dot */}
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    border: `2px solid ${course.active ? "var(--gold-bright)" : "var(--border)"}`,
                    background: course.active ? "var(--gold-glow)" : "var(--surface)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                    boxShadow: course.active
                      ? "0 0 12px var(--gold-glow), 0 0 24px rgba(201,169,110,0.1)"
                      : "none",
                  }}
                >
                  {course.active && (
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--gold-bright)",
                      }}
                    />
                  )}
                </div>
                {/* Labels */}
                <div
                  style={{
                    marginTop: "8px",
                    textAlign: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: course.active ? "var(--gold-bright)" : "var(--text-muted)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {course.month}
                </div>
                <div
                  style={{
                    marginTop: "2px",
                    textAlign: "center",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    color: course.active ? "var(--text)" : "var(--text-dim)",
                    maxWidth: "72px",
                    lineHeight: 1.3,
                  }}
                >
                  {course.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            animation: "fadeUp 0.6s 0.6s ease both",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#chat"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--blue-mid)",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-display)",
              fontSize: "16px",
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
            KYSY ASSISTENTILTA
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "transparent",
              color: "var(--gold-bright)",
              padding: "14px 28px",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-display)",
              fontSize: "16px",
              letterSpacing: "0.08em",
              textDecoration: "none",
              border: "1px solid rgba(201,169,110,0.4)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(201,169,110,0.1)";
              e.currentTarget.style.borderColor = "var(--gold-bright)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
            }}
          >
            REKISTERÖIDY
          </a>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            6 kierrosta · 6 kenttää
            <br />
            Tammikuu — Kesäkuu 2026
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
