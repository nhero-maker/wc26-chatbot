"use client";
import type { TournamentEvent } from "@/lib/player";

interface Props {
  event: TournamentEvent;
  isCompleted: boolean;
}

const SETTING_LABELS: Record<string, string> = {
  male_tee: "Miesten tii", female_tee: "Naisten tii", scoring: "Pisteytysjärjestelmä",
  holes: "Reiät", putting: "Putting", pins: "Pins", mulligans: "Mulliganit",
  wind: "Tuuli", fairway_firmness: "Fairway", green_firmness: "Green", green_stimp: "Stimp",
};

export default function CourseHero({ event, isCompleted }: Props) {
  const imgSrc = `/courses/course-${event.round_number ?? event.id}.jpg`;
  const settings = event.course_settings ?? {};
  const gameKeys = ["male_tee","female_tee","scoring","holes","putting","pins","mulligans"];
  const courseKeys = ["wind","fairway_firmness","green_firmness","green_stimp"];

  const isFinale = event.course_id === 6 || event.round_number === 6;

  return (
    <div style={{ borderRadius: "var(--radius)", overflow: "hidden", marginBottom: "20px", position: "relative" }}>
      {/* Hero image */}
      <div style={{ position: "relative", height: "320px" }}>
        <img
          src={imgSrc}
          alt={event.course_name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,20,40,0.95) 0%, rgba(15,20,40,0.4) 50%, transparent 100%)",
        }} />
        {/* Round number circle */}
        <div style={{
          position: "absolute", top: 20, left: 20,
          width: 48, height: 48, borderRadius: "50%",
          background: "var(--gold, #c9a84c)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "20px", color: "#1a1a2e",
        }}>
          {event.round_number}
        </div>
        {/* Status badge */}
        <div style={{ position: "absolute", top: 20, right: 20 }}>
          <span style={{
            background: isCompleted ? "rgba(45,74,110,0.9)" : "rgba(100,100,120,0.7)",
            border: "1px solid rgba(255,255,255,0.2)", color: "#fff",
            fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em",
            padding: "4px 10px", borderRadius: "4px",
          }}>
            {isCompleted ? "PELATTU" : event.event_month === "2026-03" ? "KÄYNNISSÄ" : "TULOSSA"}
          </span>
        </div>
        {/* Course name + dates overlay */}
        <div style={{ position: "absolute", bottom: 20, left: 24, right: 24 }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.7)", marginBottom: "4px",
          }}>
            KIERROS {event.round_number} · {event.dates}
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: "clamp(24px, 5vw, 40px)", color: "#fff",
            lineHeight: 1, letterSpacing: "0.02em", margin: 0,
          }}>
            {event.course_name.toUpperCase()}
          </h2>
          {event.scoring_rule && (
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.08em",
              color: "rgba(201,168,76,0.9)", marginTop: "8px",
            }}>
              {event.scoring_rule}
            </div>
          )}
        </div>
      </div>

      {/* Description + Settings */}
      <div style={{
        background: "var(--panel, rgba(255,255,255,0.98))",
        border: "1px solid var(--border)", borderTop: "none",
        borderBottomLeftRadius: "var(--radius)", borderBottomRightRadius: "var(--radius)",
        padding: "24px",
      }}>
        {isFinale ? (
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)",
            letterSpacing: "0.08em", padding: "12px 0",
          }}>
            Kenttä ja ajankohta päätetään myöhemmin!
          </div>
        ) : (
          <>
            {event.description && (
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7,
                color: "var(--text)", margin: "0 0 20px",
              }}>
                {event.description}
              </p>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {/* Game settings */}
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em",
                  color: "var(--text-muted)", marginBottom: "8px", fontWeight: 700,
                }}>PELIASETUKSET</div>
                {gameKeys.filter(k => settings[k as keyof typeof settings]).map(k => (
                  <div key={k} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "4px 0", borderBottom: "1px solid var(--border)",
                  }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--text-muted)" }}>
                      {SETTING_LABELS[k] ?? k}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text)", fontWeight: 600 }}>
                      {settings[k as keyof typeof settings]}
                    </span>
                  </div>
                ))}
              </div>
              {/* Course conditions */}
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em",
                  color: "var(--text-muted)", marginBottom: "8px", fontWeight: 700,
                }}>KENTÄN ASETUKSET</div>
                {courseKeys.filter(k => settings[k as keyof typeof settings]).map(k => (
                  <div key={k} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "4px 0", borderBottom: "1px solid var(--border)",
                  }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--text-muted)" }}>
                      {SETTING_LABELS[k] ?? k}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text)", fontWeight: 600 }}>
                      {settings[k as keyof typeof settings]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
