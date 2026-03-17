"use client";

export default function Hero() {
  const courses = [
    { label: "Lofoten",      month: "Tammikuu",  eventMonth: 1 },
    { label: "Marco Simone", month: "Helmikuu",   eventMonth: 2 },
    { label: "Evian",        month: "Maaliskuu",  eventMonth: 3 },
    { label: "Valderrama",   month: "Huhtikuu",   eventMonth: 4 },
    { label: "St Andrews",   month: "Toukokuu",   eventMonth: 5 },
    { label: "Finale",       month: "Kesäkuu",    eventMonth: 6 },
  ];

  const now = new Date();
  const currentEventMonth = now.getFullYear() === 2026 ? now.getMonth() + 1 : 1;

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0a1520",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Hero background image — more visible */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/wc26-hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.5,
        }}
      />

      {/* Dark gradient overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,21,32,0.55) 0%, rgba(10,21,32,0.5) 40%, rgba(10,21,32,0.75) 75%, rgba(10,21,32,0.97) 100%)",
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
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          background: "rgba(10,21,32,0.4)",
          zIndex: 10,
        }}
      >
        <img
          src="/wc26-logo.png"
          alt="WC26 Winter Cup 2026"
          style={{ height: "38px", width: "auto" }}
        />
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.14em",
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
              padding: "8px 18px",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "var(--radius)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
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
              padding: "8px 18px",
              border: "1px solid rgba(45,107,196,0.6)",
              borderRadius: "var(--radius)",
              background: "rgba(45,107,196,0.25)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(45,107,196,0.45)";
              e.currentTarget.style.borderColor = "rgba(45,107,196,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(45,107,196,0.25)";
              e.currentTarget.style.borderColor = "rgba(45,107,196,0.6)";
            }}
          >
            KYSY ASSISTENTILTA
          </a>
        </div>
      </div>

      {/* Main hero content */}
      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center", paddingTop: "80px" }}>

        {/* Season label */}
        <div
          className="section-label"
          style={{
            marginBottom: "28px",
            animation: "fadeUp 0.5s 0.1s ease both",
            justifyContent: "center",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Talvigolf · Simulaattoriturnaus · 2026
        </div>

        {/* Main title — bold text hero instead of redundant logo */}
        <div style={{ animation: "fadeUp 0.6s 0.2s ease both" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(64px, 12vw, 130px)",
              lineHeight: 0.9,
              letterSpacing: "0.03em",
              color: "#fff",
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            WINTER
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(64px, 12vw, 130px)",
              lineHeight: 0.9,
              letterSpacing: "0.03em",
              color: "#c9a96e",
              textShadow: "0 4px 40px rgba(201,169,110,0.3)",
            }}
          >
            CUP
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(22px, 4vw, 44px)",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.55)",
              marginTop: "8px",
            }}
          >
            2026
          </div>
        </div>

        {/* Teams vs bar */}
        <div
          style={{
            marginTop: "52px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            animation: "fadeUp 0.6s 0.4s ease both",
            maxWidth: "640px",
            margin: "52px auto 0",
          }}
        >
          {/* Siniset — Blue */}
          <div style={{ textAlign: "right", minWidth: "130px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 3vw, 28px)",
                letterSpacing: "0.08em",
                color: "#4d9ef7",
                textShadow: "0 0 24px rgba(45,107,196,0.6)",
              }}
            >
              SINISET
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.1em",
                marginTop: "2px",
              }}
            >
              JOUKKUE 1
            </div>
          </div>

          {/* VS divider + gradient bar */}
          <div style={{ flex: 1, position: "relative" }}>
            <div
              style={{
                height: "5px",
                borderRadius: "3px",
                background: "linear-gradient(90deg, #2d6bc4 0%, rgba(255,255,255,0.15) 50%, #c73030 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(10,21,32,0.9)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "12px",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              VS
            </div>
          </div>

          {/* Punaiset — Red */}
          <div style={{ minWidth: "130px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 3vw, 28px)",
                letterSpacing: "0.08em",
                color: "#f06060",
                textShadow: "0 0 24px rgba(199,48,48,0.6)",
              }}
            >
              PUNAISET
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.1em",
                marginTop: "2px",
              }}
            >
              JOUKKUE 2
            </div>
          </div>
        </div>

        {/* Season timeline */}
        <div
          style={{
            marginTop: "52px",
            animation: "fadeUp 0.6s 0.5s ease both",
          }}
        >
          <div
            className="section-label"
            style={{
              marginBottom: "24px",
              justifyContent: "center",
              color: "rgba(255,255,255,0.55)",
              fontSize: "13px",
              letterSpacing: "0.2em",
            }}
          >
            KAUDEN ETENEMINEN
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 0,
              position: "relative",
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            {courses.map((course, i) => {
              const isCompleted = currentEventMonth > course.eventMonth;
              const isCurrent   = currentEventMonth === course.eventMonth;
              const isGold      = isCompleted || isCurrent;
              // Line to the right is gold if this course is completed (next dot is at least current)
              const lineIsGold  = course.eventMonth < currentEventMonth;
              const lineIsGradient = isCurrent;

              return (
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
                  {/* Connecting line to the right */}
                  {i < courses.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "18px",
                        left: "50%",
                        right: "-50%",
                        height: "2px",
                        background: lineIsGold
                          ? "rgba(201,169,110,0.65)"
                          : lineIsGradient
                          ? "linear-gradient(90deg, rgba(201,169,110,0.6), rgba(255,255,255,0.12))"
                          : "rgba(255,255,255,0.12)",
                        zIndex: 0,
                      }}
                    />
                  )}
                  {/* Dot */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: `2px solid ${isGold ? "#c9a96e" : "rgba(255,255,255,0.22)"}`,
                      background: isGold
                        ? "rgba(201,169,110,0.14)"
                        : "rgba(10,21,32,0.7)",
                      position: "relative",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s",
                      boxShadow: isCurrent
                        ? "0 0 18px rgba(201,169,110,0.4), 0 0 36px rgba(201,169,110,0.15)"
                        : isCompleted
                        ? "0 0 10px rgba(201,169,110,0.25)"
                        : "none",
                    }}
                  >
                    {isCompleted && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {isCurrent && (
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "#c9a96e",
                          boxShadow: "0 0 8px rgba(201,169,110,0.8)",
                        }}
                      />
                    )}
                  </div>
                  {/* Month label */}
                  <div
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: isCurrent ? "#c9a96e" : isCompleted ? "rgba(201,169,110,0.7)" : "rgba(255,255,255,0.5)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {course.month}
                  </div>
                  {/* Course name */}
                  <div
                    style={{
                      marginTop: "4px",
                      textAlign: "center",
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      fontWeight: isCurrent ? 600 : 400,
                      color: isCurrent ? "#fff" : isCompleted ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.45)",
                      maxWidth: "88px",
                      lineHeight: 1.3,
                    }}
                  >
                    {course.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "64px",
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
              gap: "12px",
              background: "linear-gradient(135deg, #2d6bc4, #3d7fd4)",
              color: "#fff",
              padding: "18px 36px",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: "0 6px 24px rgba(45,107,196,0.45), 0 2px 8px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #3d7fd4, #5090e0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,107,196,0.6), 0 2px 8px rgba(0,0,0,0.3)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #2d6bc4, #3d7fd4)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(45,107,196,0.45), 0 2px 8px rgba(0,0,0,0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            KYSY ASSISTENTILTA
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(201,169,110,0.1)",
              color: "#c9a96e",
              padding: "18px 36px",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              letterSpacing: "0.08em",
              textDecoration: "none",
              border: "1px solid rgba(201,169,110,0.55)",
              transition: "all 0.2s",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(201,169,110,0.18)";
              e.currentTarget.style.borderColor = "#c9a96e";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(201,169,110,0.1)";
              e.currentTarget.style.borderColor = "rgba(201,169,110,0.55)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            REKISTERÖIDY
          </a>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
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
