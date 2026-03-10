"use client";

const courses = [
  {
    number: "01",
    name: "Lofoten Links",
    country: "🇳🇴 Norja",
    month: "Tammikuu 2026",
    format: "Fourball",
    distance: "5 499 m",
    notes: "Yksi maailman pohjoisimmista kentistä. Merituuli ja dramaattiset rantakalliot.",
  },
  {
    number: "02",
    name: "Marco Simone Golf Club",
    country: "🇮🇹 Italia",
    month: "Helmikuu 2026",
    format: "Singles",
    distance: "6 234 m",
    notes: "Ryder Cup 2023:n näyttämö. Kumpuileva maasto ja risk-reward-väylät.",
  },
  {
    number: "03",
    name: "Evian Resort Golf Club",
    country: "🇫🇷 Ranska",
    month: "Maaliskuu 2026",
    format: "Fourball",
    distance: "5 954 m",
    notes: "Genevejärven rannalla, Alppien juurella. Korkeuserot haastavat.",
  },
  {
    number: "04",
    name: "Real Club Valderrama",
    country: "🇪🇸 Espanja",
    month: "Huhtikuu 2026",
    format: "Singles",
    distance: "5 912 m",
    notes: "Euroopan arvostetuin kenttä. Kapeat väylät, korkkitammet, nopeat greenit.",
  },
  {
    number: "05",
    name: "St Andrews Old Course",
    country: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Skotlanti",
    month: "Toukokuu 2026",
    format: "Fourball",
    distance: "6 146 m",
    notes: "Lajin syntypaikka. Leveät väylät, petolliset bunkkerit.",
  },
  {
    number: "06",
    name: "Grande Finale",
    country: "🏆 Oikea kenttä",
    month: "Kesäkuu 2026",
    format: "Singles",
    distance: "—",
    notes: "Livefinaali! Triplapisteet. Kenttä päätetään myöhemmin.",
  },
];

const prizes = [
  { icon: "🏆", title: "Team Champions", desc: "Eniten pisteitä kerännyt joukkue" },
  { icon: "⭐", title: "MVP", desc: "Joukkueelleen eniten pisteitä tuonut pelaaja" },
  { icon: "🎖️", title: "Supreme Grand Master", desc: "Paras yksilö — pienin brutto-lyöntimäärä" },
  { icon: "📊", title: "Net Champion", desc: "Paras tasoituksen huomioiden (× 0,5)" },
  { icon: "💥", title: "Longest Drive", desc: "Kauden pisin draivi" },
  { icon: "🎯", title: "Sharp Shooter", desc: "Tarkin osuma 100 m:lle" },
  { icon: "🐦", title: "Birdman", desc: "Eniten birdieitä kauden aikana" },
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
                2 vs 2 — Parin parempi tulos
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Reikävoitto = 2 p · Tasatulos = 1 p molemmille
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
                1 vs 1 — Oma tulos ratkaisee
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Reikävoitto = 1 p · Tasatulos = 0,5 p
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "16px 20px",
              background: "var(--surface)",
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span className="badge badge-gold" style={{ marginTop: "2px" }}>FINAALI</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                Triplapisteet — Kesäkuun finaali
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Reikävoitto = 3 p · Oikealla kentällä, livefinaali
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px" }}>
          Kentät 2026
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
                  fontSize: "13px",
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
                    style={{ fontSize: "12px" }}
                  >
                    {course.format}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {course.country}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
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
              Max 10 lyöntiä. Pisin draivi jää voimaan. Kuukauden pisin = <strong style={{ color: "var(--gold-bright)" }}>+2 pistettä</strong> joukkueelle.
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
              Max 10 lyöntiä 100 m:lle. Tarkin osuma jää voimaan. Kuukauden tarkin = <strong style={{ color: "var(--gold-bright)" }}>+2 pistettä</strong> joukkueelle.
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
