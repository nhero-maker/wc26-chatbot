"use client";

const courses = [
  {
    number: "01",
    name: "Lofoten Links",
    country: "\ud83c\uddf3\ud83c\uddf4 Norja",
    month: "Tammikuu 2026",
    format: "Fourball",
    distance: "5 499 m",
    notes: "Yksi maailman pohjoisimmista kentist\u00e4. Merituuli ja dramaattiset rantakalliot.",
  },
  {
    number: "02",
    name: "Marco Simone Golf Club",
    country: "\ud83c\uddee\ud83c\uddf9 Italia",
    month: "Helmikuu 2026",
    format: "Singles",
    distance: "6 234 m",
    notes: "Ryder Cup 2023:n n\u00e4ytt\u00e4m\u00f6. Kumpuileva maasto ja risk-reward-v\u00e4yl\u00e4t.",
  },
  {
    number: "03",
    name: "Evian Resort Golf Club",
    country: "\ud83c\uddeb\ud83c\uddf7 Ranska",
    month: "Maaliskuu 2026",
    format: "Fourball",
    distance: "5 954 m",
    notes: "Genevej\u00e4rven rannalla, Alppien juurella. Korkeuserot haastavat.",
  },
  {
    number: "04",
    name: "Real Club Valderrama",
    country: "\ud83c\uddea\ud83c\uddf8 Espanja",
    month: "Huhtikuu 2026",
    format: "Singles",
    distance: "5 912 m",
    notes: "Euroopan arvostetuin kentt\u00e4. Kapeat v\u00e4yl\u00e4t, korkkitammet, nopeat greenit.",
  },
  {
    number: "05",
    name: "St Andrews Old Course",
    country: "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f Skotlanti",
    month: "Toukokuu 2026",
    format: "Fourball",
    distance: "6 146 m",
    notes: "Lajin syntypaikka. Leve\u00e4t v\u00e4yl\u00e4t, petolliset bunkkerit.",
  },
  {
    number: "06",
    name: "Grande Finale",
    country: "\ud83c\udfc6 Oikea kentt\u00e4",
    month: "Kes\u00e4kuu 2026",
    format: "Singles",
    distance: "\u2014",
    notes: "Livefinaali! Triplapisteet. Kentt\u00e4 p\u00e4\u00e4tet\u00e4\u00e4n my\u00f6hemmin.",
  },
];

const prizes = [
  { icon: "\ud83c\udfc6", title: "Team Champions", desc: "Eniten pisteit\u00e4 ker\u00e4nnyt joukkue" },
  { icon: "\u2b50", title: "MVP", desc: "Joukkueelleen eniten pisteit\u00e4 tuonut pelaaja" },
  { icon: "\ud83c\udf96\ufe0f", title: "Supreme Grand Master", desc: "Paras yksil\u00f6 \u2014 pienin brutto-ly\u00f6ntim\u00e4\u00e4r\u00e4" },
  { icon: "\ud83d\udcca", title: "Net Champion", desc: "Paras tasoituksen huomioiden (\u00d7 0,5)" },
  { icon: "\ud83d\udca5", title: "Longest Drive", desc: "Kauden pisin draivi" },
  { icon: "\ud83c\udfaf", title: "Sharp Shooter", desc: "Tarkin osuma 100 m:lle" },
  { icon: "\ud83d\udc26", title: "Birdman", desc: "Eniten birdieit\u00e4 kauden aikana" },
];

export default function TournamentInfo() {
  return (
    <div
      style={{
        padding: "60px 0",
        display: "flex",
        flexDirection: "column",
        gap: "60px",
      }}
    >
      {/* Format section */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px" }}>
          Pelimuodot
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              padding: "16px 20px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span className="badge badge-blue" style={{ marginTop: "2px" }}>FOURBALL</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                2 vs 2 \u2014 Parin parempi tulos
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Reik\u00e4voitto = 2 p \u00b7 Tasatulos = 1 p molemmille
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "16px 20px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span className="badge badge-red" style={{ marginTop: "2px" }}>SINGLES</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                1 vs 1 \u2014 Oma tulos ratkaisee
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Reik\u00e4voitto = 1 p \u00b7 Tasatulos = 0,5 p
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "16px 20px",
              background: "var(--surface)",
              border: "1px solid rgba(212,160,23,0.15)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span className="badge badge-gold" style={{ marginTop: "2px" }}>FINAALI</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                Triplapisteet \u2014 Kes\u00e4kuun finaali
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Reik\u00e4voitto = 3 p \u00b7 Oikealla kent\u00e4ll\u00e4, livefinaali
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px" }}>
          Kent\u00e4t 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)" }}>
          {courses.map((course, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: "0",
                background: i % 2 === 0 ? "var(--surface)" : "var(--surface-2)",
                padding: "14px 16px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "var(--surface-3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  i % 2 === 0 ? "var(--surface)" : "var(--surface-2)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--text-dim)",
                  paddingTop: "2px",
                }}
              >
                {course.number}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "var(--text)",
                    }}
                  >
                    {course.name}
                  </span>
                  <span
                    className={`badge ${course.format === "Fourball" ? "badge-blue" : course.number === "06" ? "badge-gold" : "badge-red"}`}
                    style={{ fontSize: "9px" }}
                  >
                    {course.format}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {course.country}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "var(--text-dim)",
                    }}
                  >
                    {course.month}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "12px",
                    color: "var(--text-dim)",
                    lineHeight: 1.4,
                  }}
                >
                  {course.notes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Challenges */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px" }}>
          Skill Challenges
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <div
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "16px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>
              Longest Drive
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Max 10 ly\u00f6nti\u00e4. Pisin draivi j\u00e4\u00e4 voimaan. Kuukauden pisin = <strong style={{ color: "var(--gold-bright)" }}>+2 pistett\u00e4</strong> joukkueelle.
            </div>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "16px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>
              Sharp Shooter
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Max 10 ly\u00f6nti\u00e4 100 m:lle. Tarkin osuma j\u00e4\u00e4 voimaan. Kuukauden tarkin = <strong style={{ color: "var(--gold-bright)" }}>+2 pistett\u00e4</strong> joukkueelle.
            </div>
          </div>
        </div>
      </div>

      {/* Prizes */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px" }}>
          Palkintokategoriat
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {prizes.map((prize, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 16px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-bright)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
              }}
            >
              <span style={{ fontSize: "18px", flexShrink: 0 }}>{prize.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "13px",
                    letterSpacing: "0.04em",
                    color: "var(--text)",
                  }}
                >
                  {prize.title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {prize.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
