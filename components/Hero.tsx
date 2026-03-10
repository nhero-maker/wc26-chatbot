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
        background: "#0e1a2e",
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
          opacity: 0.35,
        }}
      />

      {/* Navy overlay for readability */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(14,26,46,0.5) 0%, rgba(14,26,46,0.65) 50%, rgba(14,26,46,0.9) 85%, #FEFEFE 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Header nav — frosted glass */}
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
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.08)",
          zIndex: 10,
        }}
      >
        <img
          src="/wc26-logo.png"
          alt="WC26 Winter Cup 2026"
          style={{ height: "40px", width: "auto" }}
        />
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
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
              fontSize: "13px",
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.1em",
              textDecoration: "none",
              padding: "8px 16px",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "var(--radius)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            KIRJAUDU
          </a>
          <a
            href="#chat"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "#fff",
              letterSpacing: "0.1em",
              textDecoration: "none",
              padding: "8px 16px",
              border: "1px solid rgba(107,141,181,0.5)",
              borderRadius: "var(--radius)",
              background: "rgba(63,91,123,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(63,91,123,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(63,91,123,0.3)";
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
            color: "rgba(255,255,255,0.5)",
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
              height: "clamp(220px, 32vw, 350px)",
              width: "auto",
              margin: "0 auto",
              display: "block",
              filter: "drop-shadow(0 8px 48px rgba(0,0,0,0.4))",
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
                fontSize: "24px",
                letterSpacing: "0.08em",
                color: "#8bb0d8",
              }}
            >
              SINISET
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              JOUKKUE 1
            </div>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <div
              style={{
                height: "4px",
                background: "rgba(255,255,255,0.15)",
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
                  background: "linear-gradient(90deg, #3f5b7b, #6b8db5)",
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
                  background: "#a1b5cb",
                  borderRadius: "0 2px 2px 0",
                  opacity: 0.7,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(14,26,46,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "12px",
                letterSpacing: "0.05em",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              VS
            </div>
          </div>
          <div style={{ minWidth: "120px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                letterSpacing: "0.08em",
                color: "#a1b5cb",
              }}
            >
              PUNAISET
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.45)",
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
          <div
            className="section-label"
            style={{ marginBottom: "20px", justifyContent: "center", color: "rgba(255,255,255,0.5)" }}
          >
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
                      top: "12px",
                      left: "50%",
                      right: "-50%",
                      height: "1px",
                      background: "rgba(255,255,255,0.15)",
                      zIndex: 0,
                    }}
                  />
                )}
                {/* Dot */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: `2px solid ${course.active ? "#c9a96e" : "rgba(255,255,255,0.2)"}`,
                    background: course.active ? "rgba(201,169,110,0.2)" : "rgba(14,26,46,0.6)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                    boxShadow: course.active
                      ? "0 0 12px rgba(201,169,110,0.3), 0 0 24px rgba(201,169,110,0.1)"
                      : "none",
                  }}
                >
                  {course.active && (
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#c9a96e",
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
                    fontSize: "12px",
                    color: course.active ? "#c9a96e" : "rgba(255,255,255,0.4)",
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
                    fontSize: "13px",
                    color: course.active ? "#fff" : "rgba(255,255,255,0.35)",
                    maxWidth: "80px",
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
              background: "#3f5b7b",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-display)",
              fontSize: "16px",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: "0 4px 16px rgba(63,91,123,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#6b8db5";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(63,91,123,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3f5b7b";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(63,91,123,0.3)";
            }}
          >
            KYSY ASSISTENTILTA
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
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
              color: "#c9a96e",
              padding: "16px 32px",
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
              e.currentTarget.style.borderColor = "#c9a96e";
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
              fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.5,
            }}
          >
            6 kierrosta · 6 kenttää
            <br />
            Tammikuu — Kesäkuu 2026
          </div>
        </div>
      </div>
    </section>
  );
}
