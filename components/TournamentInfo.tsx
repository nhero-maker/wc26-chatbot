"use client";

import { useState } from "react";

const courses = [
  {
    number: "01",
    name: "Lofoten Links",
    country: "🇳🇴 Norja",
    month: "Tammikuu 2026",
    format: "Fourball",
    detail: "Yksi maailman pohjoisimmista kentistä ja todellinen elämys jo maisemiensa puolesta. Merituuli, dramaattiset rantakalliot ja pitkät avarat väylät tekevät tästä täydellisen kauden avauskentän. Pelillisesti reilu links – hyvä draivaaja saa palkintonsa, mutta väärä suunta kostautuu heti.",
  },
  {
    number: "02",
    name: "Marco Simone Golf Club",
    country: "🇮🇹 Italia",
    month: "Helmikuu 2026",
    format: "Singles",
    detail: "Ryder Cup 2023:n näyttämö Rooman ulkopuolella. Kumpuileva maasto, tiukat doglegit ja risk-reward-väylät tekevät Marcosta teknisen haasteen. Greenien nopeus ja bunkkerisijoittelut palkitsevat tarkkaa pelaamista.",
  },
  {
    number: "03",
    name: "Evian Resort Golf Club",
    country: "🇫🇷 Ranska",
    month: "Maaliskuu 2026",
    format: "Fourball",
    detail: "Genevejärven rannalla Alppien juurella – yksi Euroopan kauneimmista golfmaisemista. Korkeuserot ovat merkittävät ja jokainen väylä tarjoaa oman haasteensa. LPGA Majorin vakituinen näyttämö.",
  },
  {
    number: "04",
    name: "Real Club Valderrama",
    country: "🇪🇸 Espanja",
    month: "Huhtikuu 2026",
    format: "Singles",
    detail: "Euroopan arvostetuin golfkenttä. Kapeat väylät, korkkitammet ja nopeat, kiemurtelevat greenit tekevät tästä kauden taktisimman haasteen. Ei anna anteeksi. Ryder Cup 1997 + WGC-turnauksia.",
  },
  {
    number: "05",
    name: "St Andrews Old Course",
    country: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Skotlanti",
    month: "Toukokuu 2026",
    format: "Fourball",
    detail: "Golfin syntypaikka. Leveät fairwayt houkuttelevat rohkeaan peliin, mutta petolliset pot-bunkkerit rankaisevat huolimattomuudesta. Road Hole (väylä 17) on yksi maailman kuuluisimmista.",
  },
  {
    number: "06",
    name: "Grande Finale",
    country: "🏆 Oikea kenttä",
    month: "Kesäkuu 2026",
    format: "Singles",
    detail: "Kesäkuun livefinaali pelataan oikealla kentällä – ei simulaattorissa. Kenttä ja päivämäärä päätetään myöhemmin. Kaikki pisteet TRIPLANA: reikävoitto = 3 p, tasatulos = 1,5 p.",
  },
];

const prizes = [
  { icon: "🏆", title: "Team Champions", desc: "Eniten pisteitä kerännyt joukkue", detail: "Eniten pisteitä kerännyt joukkue voittaa Winter Cup 2026:n. Kaikki kierrokset lasketaan mukaan, finaali triplapisteineen." },
  { icon: "⭐", title: "MVP", desc: "Joukkueelleen eniten pisteitä tuonut pelaaja", detail: "Joukkueelleen eniten match-pisteitä tuonut pelaaja kauden aikana. Poissaolo ei tuota pisteitä joukkueelle." },
  { icon: "🎖️", title: "Supreme Grand Master", desc: "Paras yksilö — pienin brutto-lyöntimäärä", detail: "Pienin kokonaislyöntimäärä (brutto) kaikki kierrokset yhteensä. Poissaolo ilman korvaavaa kierrosta estää kategorian voittamisen." },
  { icon: "📊", title: "Net Champion", desc: "Paras tasoituksen huomioiden (× 0,5)", detail: "Paras tasoituksen huomioiva tulos (brutto × 0,5 tasoitusta). Poissaolo estää kategorian voittamisen." },
  { icon: "💥", title: "Longest Drive", desc: "Kauden pisin draivi", detail: "Kauden kaikista kierroksista pisin hyväksytty yksittäinen draivi. Rekisterilyönti jää voimaan koko kaudeksi." },
  { icon: "🎯", title: "Sharp Shooter", desc: "Tarkin osuma 100 m:lle", detail: "Kauden tarkin yksittäinen osuma 100 metrin kohteeseen. Pienin ero 100,0 m:stä ratkaisee. Ei mitata finaalissa." },
  { icon: "🐦", title: "Birdman", desc: "Eniten birdieitä kauden aikana", detail: "Eniten birdieitä kauden kaikilla kierroksilla yhteensä. Lasketaan kaikista pelatuista kierroksista." },
];

const formats = [
  {
    key: "fourball",
    badge: <span className="badge badge-blue" style={{ marginTop: "2px" }}>FOURBALL</span>,
    title: "2 vs 2 — Parin parempi tulos",
    summary: "Reikävoitto = 2 p · Tasatulos = 1 p molemmille",
    borderColor: "var(--blue-team)",
    bg: "var(--surface)",
    detailLines: [
      "Kaksi pelaajaa muodostaa parin ja pelaa toisen joukkueen paria vastaan.",
      "Reiän tulokseen lasketaan parin parempi tulos.",
      "Reikävoitto = 2 p · Tasatulos = 1 p molemmille joukkueille",
      "Fourball-kuukaudet: Tammikuu · Maaliskuu · Toukokuu",
    ],
  },
  {
    key: "singles",
    badge: <span className="badge badge-red" style={{ marginTop: "2px" }}>SINGLES</span>,
    title: "1 vs 1 — Oma tulos ratkaisee",
    summary: "Reikävoitto = 1 p · Tasatulos = 0,5 p",
    borderColor: "var(--red-team)",
    bg: "var(--surface)",
    detailLines: [
      "Pelaajat kohtaavat yksilöinä toisen joukkueen pelaajat.",
      "Reiän tulokseen lasketaan pelaajan oma tulos.",
      "Reikävoitto = 1 p · Tasatulos = 0,5 p",
      "Singles-kuukaudet: Helmikuu · Huhtikuu · Kesäkuu (finaali)",
    ],
  },
  {
    key: "finaali",
    badge: <span className="badge badge-gold" style={{ marginTop: "2px" }}>FINAALI</span>,
    title: "Triplapisteet — Kesäkuun finaali",
    summary: "Reikävoitto = 3 p · Oikealla kentällä, livefinaali",
    borderColor: "var(--gold-mid)",
    bg: "rgba(201,169,110,0.04)",
    detailLines: [
      "Kesäkuun finaali pelataan oikealla kentällä — ei simulaattorissa.",
      "Kaikki pisteet TRIPLANA: Reikävoitto = 3 p · Tasatulos = 1,5 p",
      "Kenttä ja päivämäärä päätetään myöhemmin.",
      "Jos pelaaja ei pääse finaaliin, kapteeni sijoittaa hänet pariin tai vastustaja saa automaattivoiton.",
    ],
  },
];

const skills = [
  {
    key: "ld",
    title: "Longest Drive",
    summary: "Max 10 lyöntiä · Pisin draivi jää voimaan · Kuukauden pisin = +2 p joukkueelle",
    detailLines: [
      "Moodi: Practice → Range",
      "Tavoite: saada pallo mahdollisimman pitkälle",
      "Max. 10 lyöntiä per pelaaja",
      "Tulokseksi jää pisin hyväksytty lyönti",
      "Pelaaja voi yrittää parantaa myöhemmin — kauden pisin draivi jää voimaan",
    ],
    scoring: [
      "Kuukauden pisin draivi = +2 p voittajajoukkueelle",
      "Kesäkuun finaalin pisin väylädraivi = +6 p voittajajoukkueelle",
    ],
  },
  {
    key: "ss",
    title: "Sharp Shooter",
    summary: "Max 10 lyöntiä 100 m:lle · Tarkin osuma jää voimaan · Kuukauden tarkin = +2 p joukkueelle",
    detailLines: [
      "Moodi: Practice → Range",
      "Tavoite: saada pallo mahdollisimman lähelle 100 metriä",
      "Max. 10 lyöntiä per pelaaja",
      "Tulokseksi jää paras yksittäinen osuma (pienin ero 100,0 m:stä, esim. ±0,2 m)",
      "Pelaaja voi yrittää parantaa myöhemmin — kauden tarkin osuma jää voimaan",
    ],
    scoring: [
      "Kuukauden tarkin osuma = +2 p voittajajoukkueelle",
      "Ei mitata finaalissa — vain Trackman-kaudella",
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 200ms ease",
        fontFamily: "var(--font-mono)",
        fontSize: "13px",
        color: "var(--text-dim)",
        flexShrink: 0,
        marginLeft: "auto",
        paddingLeft: "8px",
        lineHeight: 1,
      }}
    >
      ›
    </span>
  );
}

function expandStyle(open: boolean): React.CSSProperties {
  return {
    maxHeight: open ? "500px" : "0",
    overflow: "hidden",
    transition: open ? "max-height 220ms ease-out" : "max-height 160ms ease-in",
  };
}

const btnBase: React.CSSProperties = {
  width: "100%",
  background: "none",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  display: "flex",
  alignItems: "flex-start",
  gap: "16px",
  minHeight: "44px",
};

export default function TournamentInfo() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const isOpen = (key: string) => expanded.has(key);

  return (
    <div style={{ padding: "60px 0", display: "flex", flexDirection: "column", gap: "60px" }}>

      {/* ── PELIMUODOT ────────────────────────────────── */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px" }}>Pelimuodot</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {formats.map((f) => {
            const open = isOpen(`format-${f.key}`);
            return (
              <div
                key={f.key}
                style={{
                  background: f.bg,
                  border: "1px solid var(--border)",
                  borderLeft: `4px solid ${f.borderColor}`,
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-card)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggle(`format-${f.key}`)}
                  aria-expanded={open}
                  aria-controls={`format-detail-${f.key}`}
                  style={{ ...btnBase, padding: "16px 20px" }}
                >
                  <span style={{ flexShrink: 0 }}>{f.badge}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", marginBottom: "4px", color: "var(--text)" }}>
                      {f.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{f.summary}</div>
                  </div>
                  <Chevron open={open} />
                </button>
                <div id={`format-detail-${f.key}`} style={expandStyle(open)}>
                  <div style={{ padding: "10px 20px 16px 20px", borderTop: "1px solid var(--border)" }}>
                    {f.detailLines.map((line, i) => (
                      <div key={i} style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, padding: "2px 0" }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── KENTÄT 2026 ───────────────────────────────── */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px" }}>Kentät 2026</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)" }}>
          {courses.map((course, i) => {
            const open = isOpen(`course-${i}`);
            const rowBg = i % 2 === 0 ? "var(--surface)" : "var(--surface-2)";
            return (
              <div key={i} style={{ background: rowBg }}>
                <button
                  onClick={() => toggle(`course-${i}`)}
                  aria-expanded={open}
                  aria-controls={`course-detail-${i}`}
                  style={{
                    ...btnBase,
                    display: "grid",
                    gridTemplateColumns: "40px 1fr auto",
                    gap: "0",
                    padding: "14px 16px",
                    alignItems: "start",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-dim)", paddingTop: "2px" }}>
                    {course.number}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px", color: "var(--text)" }}>
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
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>{course.country}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-dim)" }}>{course.month}</span>
                    </div>
                  </div>
                  <Chevron open={open} />
                </button>
                <div id={`course-detail-${i}`} style={expandStyle(open)}>
                  <div style={{ padding: "10px 16px 14px 56px", borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>
                      {course.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SKILL CHALLENGES ──────────────────────────── */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px" }}>Skill Challenges</div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {skills.map((skill) => {
            const open = isOpen(`skill-${skill.key}`);
            return (
              <div
                key={skill.key}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggle(`skill-${skill.key}`)}
                  aria-expanded={open}
                  aria-controls={`skill-detail-${skill.key}`}
                  style={{ ...btnBase, padding: "16px", justifyContent: "space-between" }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", marginBottom: "6px", color: "var(--text)" }}>
                      {skill.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                      {skill.summary}
                    </div>
                  </div>
                  <Chevron open={open} />
                </button>
                <div id={`skill-detail-${skill.key}`} style={expandStyle(open)}>
                  <div style={{ padding: "10px 16px 16px", borderTop: "1px solid var(--border)" }}>
                    {skill.detailLines.map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: "8px", fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "3px" }}>
                        <span style={{ color: "var(--gold-bright)", flexShrink: 0 }}>·</span>
                        {line}
                      </div>
                    ))}
                    <div style={{ marginTop: "12px", padding: "8px 12px", background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "var(--radius)" }}>
                      {skill.scoring.map((s, i) => (
                        <div key={i} style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: i < skill.scoring.length - 1 ? "2px" : "0" }}>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PALKINTOKATEGORIAT ────────────────────────── */}
      <div>
        <div className="section-label" style={{ marginBottom: "24px" }}>Palkintokategoriat</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {prizes.map((prize, i) => {
            const open = isOpen(`prize-${i}`);
            return (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggle(`prize-${i}`)}
                  aria-expanded={open}
                  aria-controls={`prize-detail-${i}`}
                  style={{ ...btnBase, padding: "12px 16px", alignItems: "center" }}
                >
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>{prize.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", color: "var(--text)" }}>
                      {prize.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{prize.desc}</div>
                  </div>
                  <Chevron open={open} />
                </button>
                <div id={`prize-detail-${i}`} style={expandStyle(open)}>
                  <div style={{ padding: "8px 16px 12px 48px", borderTop: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.65 }}>
                      {prize.detail}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
