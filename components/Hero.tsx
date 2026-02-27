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
      {/* Background grid lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.4,
        }}
      />

      {/* Blue/Red ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          width: "35%",
          height: "60%",
          background:
            "radial-gradient(ellipse at left center, rgba(37,99,235,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          top: "20%",
          width: "35%",
          height: "60%",
          background:
            "radial-gradient(ellipse at right center, rgba(220,38,38,0.1) 0%, transparent 70%)",
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
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(8px)",
          background: "rgba(6,8,14,0.6)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "18px",
            letterSpacing: "0.15em",
            color: "var(--text)",
          }}
        >
          WC26
        </div>
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
        <a
          href="#chat"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--blue-bright)",
            letterSpacing: "0.1em",
            textDecoration: "none",
            padding: "6px 14px",
            border: "1px solid rgba(37,99,235,0.3)",
            borderRadius: "var(--radius)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(37,99,235,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          KYSY ASSISTENTILTA
        </a>
      </div>

      {/* Main hero content */}
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Season label */}
        <div className="section-label" style={{ marginBottom: "32px", animation: "fadeUp 0.5s 0.1s ease both" }}>
          Talvigolf · Simulaattoriturnaus · 2026
        </div>

        {/* Giant title */}
        <div style={{ position: "relative", marginBottom: "8px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(72px, 13vw, 180px)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              animation: "fadeUp 0.6s 0.2s ease both",
            }}
          >
            WINTER
          </h1>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(72px, 13vw, 180px)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              WebkitTextStroke: "2px var(--border-bright)",
              color: "transparent",
              animation: "fadeUp 0.6s 0.3s ease both",
            }}
          >
            CUP
          </h1>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(72px, 13vw, 180px)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              color: "var(--gold-bright)",
              animation: "fadeUp 0.6s 0.4s ease both",
            }}
          >
            2026
          </h1>
        </div>

        {/* Teams vs bar */}
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            animation: "fadeUp 0.6s 0.5s ease both",
          }}
        >
          <div style={{ textAlign: "right", minWidth: "120px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
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
              BLUE TEAM
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
                  background: "linear-gradient(90deg, var(--red-bright), var(--red-mid))",
                  borderRadius: "0 2px 2px 0",
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
                fontWeight: 900,
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
                fontWeight: 900,
                fontSize: "22px",
                letterSpacing: "0.08em",
                color: "var(--red-bright)",
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
              RED TEAM
            </div>
          </div>
        </div>

        {/* Season timeline */}
        <div
          style={{
            marginTop: "48px",
            animation: "fadeUp 0.6s 0.6s ease both",
          }}
        >
          <div className="section-label" style={{ marginBottom: "20px" }}>
            Kauden eteneminen
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 0,
              position: "relative",
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
                      ? "0 0 12px var(--gold-glow), 0 0 24px rgba(212,160,23,0.1)"
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
                        animation: "shimmer 2s linear infinite",
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
            gap: "32px",
            animation: "fadeUp 0.6s 0.7s ease both",
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
              fontWeight: 700,
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
