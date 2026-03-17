"use client";

import Link from "next/link";

const JUMP_SECTIONS = [
  { id: "mita", label: "Mitä" },
  { id: "aikataulu", label: "Aikataulu" },
  { id: "pelimuodot", label: "Pelimuodot" },
  { id: "joukkueet", label: "Joukkueet" },
  { id: "skill", label: "Skill Challenges" },
  { id: "poissaolo", label: "Poissaolo" },
  { id: "palkinnot", label: "Palkinnot" },
];

const cardStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)" as const,
  padding: "24px 28px",
  boxShadow: "var(--shadow-card)",
};

const sectionGap = { marginBottom: "56px" };

export default function InfoPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── Dark hero header ─────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg, #0b1020 0%, #1a2744 100%)" }}>
        {/* Top bar */}
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <img src="/wc26-logo.png" alt="WC26" style={{ height: "34px", width: "auto", display: "block" }} />
          </Link>
          <Link href="/" style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.55)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            transition: "color 0.15s",
          }}>
            ← ETUSIVULLE
          </Link>
        </div>

        {/* Title */}
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "44px 24px 52px" }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.16em",
            color: "rgba(201,169,110,0.8)",
            marginBottom: "14px",
          }}>
            WINTER CUP 2026
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(44px, 8vw, 76px)",
            color: "#fff",
            lineHeight: 1,
            letterSpacing: "0.02em",
            margin: "0 0 18px",
          }}>
            TURNAUSOPAS
          </h1>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: 0,
          }}>
            Kaikki mitä sinun tarvitsee tietää WC26-turnauksesta — säännöistä
            kentille, aikatauluista palkintokategorioihin.
          </p>
        </div>
      </div>

      {/* ── Jump chips ───────────────────────────────── */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(254,254,254,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        padding: "10px 24px",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}>
        <div style={{ display: "flex", gap: "8px", minWidth: "max-content" }}>
          {JUMP_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.09em",
                padding: "5px 14px",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text-muted)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "background 0.15s, color 0.15s, border-color 0.15s",
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--surface-3)";
                el.style.color = "var(--text)";
                el.style.borderColor = "var(--border-bright)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--surface)";
                el.style.color = "var(--text-muted)";
                el.style.borderColor = "var(--border)";
              }}
            >
              {s.label.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "52px 24px 80px" }}>

        {/* ── 1. Mitä on WC26? ─── */}
        <section id="mita" style={sectionGap}>
          <div className="section-label" style={{ marginBottom: "20px" }}>Mitä on WC26?</div>
          <div style={cardStyle}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.8, color: "var(--text)", margin: "0 0 14px" }}>
              <strong>Winter Cup 2026</strong>, tuttavallisemmin WC26, on kuuden kuukauden mittainen
              live-finaaliin huipentuva simulaattorigolf-turnaus, jossa kaksi joukkuetta —{" "}
              <strong style={{ color: "var(--blue-team)" }}>Siniset</strong> ja{" "}
              <strong style={{ color: "var(--red-team)" }}>Punaiset</strong> — kilpailevat
              toisiaan vastaan Ryder Cup -hengessä.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.8, color: "var(--text)", margin: "0 0 14px" }}>
              Kausi pelataan <strong>tammikuusta kesäkuuhun</strong> — viisi kierrosta Trackman-simulaattorissa
              ja kesäkuussa finaali oikealla kentällä. Osallistujat pelaavat joka kuukausi omassa
              aikataulussaan, joten mukana voi olla niin aktiivipelaajia kuin satunnaisia
              talviharjoittelijoitakin.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.8, color: "var(--text)", margin: "0 0 24px" }}>
              Kierrosten tulokset yhdistyvät kuukausittaiseen pistetaulukkoon, ja kauden päätteeksi
              eniten pisteitä kerännyt joukkue kruunataan Winter Cup 2026 -mestareiksi.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="info-two-col">
              {[
                { label: "MITÄ", text: "Talvikauden golfturnaus simulaattorissa — joukkuekisa, yksilökisa, pistetaulukot ja useita palkintokategorioita." },
                { label: "MIKSI", text: "Pitää swingin sulavana talven yli, tuo kavereita yhteen ja antaa tekosyyn kaivaa driver kaapista tammikuussa." },
                { label: "MISSÄ", text: "Missä tahansa Trackman-simulaattorissa. Pelata voi yksin tai muiden osallistujien kanssa — paikka ei sido." },
                { label: "MILLOIN", text: "1 kierros per kuukausi, tammikuusta toukokuuhun. Pelaa milloin ehdit kuukauden aikana." },
              ].map((item) => (
                <div key={item.label} style={{
                  padding: "14px 16px",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "6px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. Missä ja Miten ─── */}
        <section style={sectionGap}>
          <div className="section-label" style={{ marginBottom: "20px" }}>Missä ja miten pelataan</div>
          <div style={cardStyle}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="info-two-col">
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "8px" }}>HUOM!</div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>
                  Missä tahansa Trackman-simulaattorissa, kunhan{" "}
                  <strong>TPS 10 -ohjelmistopäivitys</strong> on tehty (tullut vuonna 2024).
                  Pelattavat kentät ovat Virtual Golf 3 -kenttiä.
                </p>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "8px" }}>PROTIP!</div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>
                  Laita kierroksen asetukset kuntoon puhelimen Trackman-sovelluksessa etukäteen —
                  simulaattorille tultaessa ei tarvitse erikseen säätää asetuksia.
                </p>
              </div>
            </div>
            <div style={{
              padding: "12px 16px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
              letterSpacing: "0.04em",
            }}>
              Skill Challenge -osuudet: Practice → Range -moodissa ennen kierrosta
            </div>
          </div>
        </section>

        {/* ── 3. Aikataulu ─── */}
        <section id="aikataulu" style={sectionGap}>
          <div className="section-label" style={{ marginBottom: "20px" }}>Aikataulu</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Nov-Dec */}
            <div style={cardStyle}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "16px" }}>
                MARRAS–JOULUKUU
              </div>
              {[
                { num: "1", title: "Ilmoittautuminen", color: "var(--gold-mid)", desc: "Marraskuun aikana. Tarvitaan: nimi, puhelinnumero, virallinen tasoitus. Kaikki lisätään osallistujalistaan, jonka perusteella joukkueet jaetaan." },
                { num: "2", title: "Joukkueiden jako", color: "var(--gold-mid)", desc: "Joulukuun alussa. Pelaajat jaetaan tasoitusten perusteella kahteen mahdollisimman tasaiseen joukkueeseen." },
                { num: "3", title: "Kapteenien valinta", color: "var(--gold-mid)", desc: "Kun joukkueet on muodostettu, äänestetään tai arvotaan kapteenit. Kapteenin rooli on henkinen ja strateginen, ei pelillinen." },
              ].map((item) => (
                <div key={item.num} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "13px",
                    color: item.color, flexShrink: 0,
                  }}>{item.num}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", marginBottom: "3px", color: "var(--text)" }}>{item.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Jan-Jun */}
            <div style={cardStyle}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "16px" }}>
                TAMMI–KESÄKUU (joka kuukausi)
              </div>
              {[
                { num: "4", title: "Skill Challenge -osuudet", color: "var(--blue-team)", desc: "Longest Drive + Sharp Shooter ennen kierrosta samassa sessiossa. Nämä ovat osa virallista osallistumista." },
                { num: "5", title: "Kilpailukierros", color: "var(--blue-team)", desc: "Pelaa kierros ennen kuukauden viimeistä päivää. Yksin tai muiden osallistujien kanssa — ryhmäpelaaminen suositeltavaa." },
                { num: "6", title: "Tulosten merkitseminen", color: "var(--blue-team)", desc: "Merkkaa tulokset sovellukseen: väyläkohtainen tulos ilman tasoituksia, pisimmän draivin mitta ja lähimmän 100 m -osauman mitta." },
              ].map((item) => (
                <div key={item.num} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "rgba(45,107,196,0.1)", border: "1px solid rgba(45,107,196,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "13px",
                    color: item.color, flexShrink: 0,
                  }}>{item.num}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", marginBottom: "3px", color: "var(--text)" }}>{item.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Pelimuodot ─── */}
        <section id="pelimuodot" style={sectionGap}>
          <div className="section-label" style={{ marginBottom: "20px" }}>Pelimuodot</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              {
                badge: <span className="badge badge-blue">FOURBALL</span>,
                title: "2 vs 2 — Parin parempi tulos",
                border: "var(--blue-team)",
                bg: "var(--surface)",
                points: ["Reikävoitto = 2 p", "Tasatulos = 1 p molemmille"],
                months: "Tammikuu · Maaliskuu · Toukokuu",
                desc: "Kaksi pelaajaa muodostaa parin ja pelaa toisen joukkueen paria vastaan. Reiän tulokseen lasketaan parin parempi tulos.",
              },
              {
                badge: <span className="badge badge-red">SINGLES</span>,
                title: "1 vs 1 — Oma tulos ratkaisee",
                border: "var(--red-team)",
                bg: "var(--surface)",
                points: ["Reikävoitto = 1 p", "Tasatulos = 0,5 p"],
                months: "Helmikuu · Huhtikuu · Kesäkuu (finaali)",
                desc: "Pelaajat kohtaavat yksilöinä toisen joukkueen pelaajat. Reiän tulokseen lasketaan pelaajan oma tulos.",
              },
              {
                badge: <span className="badge badge-gold">FINAALI</span>,
                title: "Triplapisteet — oikea kenttä",
                border: "var(--gold-mid)",
                bg: "rgba(201,169,110,0.04)",
                points: ["Reikävoitto = 3 p", "Tasatulos = 1,5 p"],
                months: "Kesäkuu — livefinaali",
                desc: "Kesäkuun finaali pelataan oikealla kentällä. Kaikki pisteet kolminkertaisina. Kenttä ja päivämäärä päätetään myöhemmin.",
              },
            ].map((f, i) => (
              <div key={i} style={{
                ...cardStyle,
                borderLeft: `4px solid ${f.border}`,
                background: f.bg,
                padding: "18px 24px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  {f.badge}
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "var(--text)" }}>{f.title}</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.65, margin: "0 0 10px" }}>{f.desc}</p>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "6px" }}>
                  {f.points.map((p) => (
                    <span key={p} style={{ fontSize: "12px", color: "var(--text-muted)" }}>{p}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)", letterSpacing: "0.04em" }}>
                  {f.months}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Joukkueet ─── */}
        <section id="joukkueet" style={sectionGap}>
          <div className="section-label" style={{ marginBottom: "20px" }}>Joukkueet</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={cardStyle}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "12px" }}>PARIEN MUODOSTAMINEN</div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, margin: "0 0 10px" }}>
                Parit muodostetaan periaatteella <strong>paras parasta vastaan</strong> edellisen kierroksen tulosten perusteella.
                Ensimmäisellä kierroksella parit muodostetaan pelaajien tasoitusten perusteella.
              </p>
              <div style={{ paddingLeft: "14px", borderLeft: "2px solid var(--border)" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "6px" }}>
                  <strong>Fourball-kuukausina:</strong> Joukkueen 1. ja 2. sijoitetut pelaavat parina vastustajan 1. ja 2. sijoitettua vastaan.
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.65 }}>
                  <strong>Singles-kuukausina:</strong> Otteluparit 1 vs 1 · 2 vs 2 · 3 vs 3 jne. sijoitusten mukaisesti.
                </div>
              </div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "12px" }}>ERI MÄÄRÄ PELAAJIA</div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, margin: "0 0 10px" }}>
                Jos joukkueissa on eri määrä pelaajia (esim. 10 vs 11), ylimääräinen ns.{" "}
                <strong>solo-pelaaja pelaa haamuottelun</strong> vastustajajoukkueen keskiarvotulosta vastaan.
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
                <strong>Solo-rooli kiertää</strong> ja arvotaan kuukausittain, jotta kukaan ei pelaa
                haamua vastaan useammin kuin kerran kauden aikana.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. Skill Challenges ─── */}
        <section id="skill" style={sectionGap}>
          <div className="section-label" style={{ marginBottom: "20px" }}>Skill Challenges</div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, margin: "0 0 16px" }}>
            Ennen jokaista kuukausittaista kierrosta pelaaja suorittaa kaksi lyhyttä taitosuoritusosuutta
            Trackmanissa. Nämä ovat osa virallista osallistumista — kannattaa tehdä heti ennen kierrosta samassa sessiossa.
          </p>
          <div style={{ marginBottom: "16px", padding: "10px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
            Moodi kaikissa: Practice → Range
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              {
                abbr: "LD",
                title: "Longest Drive",
                lines: [
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
                abbr: "SS",
                title: "Sharp Shooter",
                lines: [
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
            ].map((skill) => (
              <div key={skill.abbr} style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "12px",
                    color: "var(--gold-mid)", flexShrink: 0,
                  }}>{skill.abbr}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", color: "var(--text)" }}>{skill.title}</div>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  {skill.lines.map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "4px" }}>
                      <span style={{ color: "var(--gold-bright)", flexShrink: 0 }}>·</span>
                      {line}
                    </div>
                  ))}
                </div>
                <div style={{ padding: "10px 14px", background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "var(--radius)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--gold-mid)", fontWeight: 700, marginBottom: "6px" }}>PISTEYTYS</div>
                  {skill.scoring.map((s, i) => (
                    <div key={i} style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "2px" }}>{s}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Poissaolo ─── */}
        <section id="poissaolo" style={sectionGap}>
          <div className="section-label" style={{ marginBottom: "20px" }}>Poissaolo</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={cardStyle}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--text-dim)", fontWeight: 700, marginBottom: "12px" }}>KAUDEN AIKANA</div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, margin: "0 0 12px" }}>
                Jos pelaaja ei pelaa kuukauden kilpailukierrosta määräaikaan mennessä, kierroksen tulokseksi
                merkitään <strong>oma kauden keskiarvo + 18 lyöntiä</strong>.
              </p>
              <div style={{ paddingLeft: "14px", borderLeft: "2px solid var(--border)", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  Ei voi voittaa: <strong>Supreme Grand Master</strong> tai <strong>Net Champion</strong>
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <strong>Fourball:</strong> Pari pelaa yksin — vain hänen tuloksensa huomioidaan
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <strong>Singles:</strong> Vastustaja saa automaattivoiton (18 pistettä)
                </div>
              </div>
            </div>
            <div style={{
              ...cardStyle,
              background: "rgba(201,169,110,0.04)",
              border: "1px solid rgba(201,169,110,0.2)",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--gold-mid)", fontWeight: 700, marginBottom: "12px" }}>FINAALI — POISSAOLO</div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, margin: "0 0 14px" }}>
                Jos pelaaja ei pääse osallistumaan liveturnaukseen, tilanteessa on kaksi vaihtoehtoa:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { title: "Korvaava kierros", desc: "Pelaaja pelaa ennen finaalia korvaavan kierroksen finaalikentällä. Vastustaja pelaa tätä haamukierrosta vastaan. Läsnä = 3 p / reikävoitto, haamukierros = 1,5 p." },
                  { title: "Ei korvaavaa kierrosta", desc: "Kapteeni sijoittaa yksin jääneen pelaajan pariin — ottelu muuttuu 2 vs 1 -muotoiseksi. Parempi tulos ratkaisee (best ball)." },
                ].map((opt) => (
                  <div key={opt.title} style={{
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(201,169,110,0.15)",
                    borderRadius: "var(--radius)",
                  }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", marginBottom: "4px", color: "var(--text)" }}>{opt.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. Palkintokategoriat ─── */}
        <section id="palkinnot" style={sectionGap}>
          <div className="section-label" style={{ marginBottom: "20px" }}>Palkintokategoriat</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { icon: "🏆", title: "Team Champions", detail: "Eniten pisteitä kerännyt joukkue voittaa Winter Cup 2026:n. Kaikki kierrokset lasketaan mukaan, finaali triplapisteineen." },
              { icon: "⭐", title: "MVP", detail: "Joukkueelleen eniten match-pisteitä tuonut pelaaja kauden aikana. Poissaolo ei tuota pisteitä joukkueelle." },
              { icon: "🎖️", title: "Supreme Grand Master", detail: "Pienin kokonaislyöntimäärä (brutto) kaikki kierrokset yhteensä. Poissaolo ilman korvaavaa kierrosta estää kategorian voittamisen." },
              { icon: "📊", title: "Net Champion", detail: "Paras tasoituksen huomioiva tulos (brutto × 0,5 tasoitusta). Poissaolo estää kategorian voittamisen." },
              { icon: "💥", title: "Longest Drive", detail: "Kauden kaikista kierroksista pisin hyväksytty yksittäinen draivi. Rekisterilyönti jää voimaan koko kaudeksi." },
              { icon: "🎯", title: "Sharp Shooter", detail: "Kauden tarkin yksittäinen osuma 100 metrin kohteeseen. Pienin ero 100,0 m:stä ratkaisee. Ei mitata finaalissa." },
              { icon: "🐦", title: "Birdman", detail: "Eniten birdieitä kauden kaikilla kierroksilla yhteensä. Lasketaan kaikista pelatuista kierroksista." },
            ].map((prize, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "16px",
                padding: "16px 20px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-card)",
              }}>
                <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "2px" }}>{prize.icon}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px", marginBottom: "4px", color: "var(--text)" }}>{prize.title}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>{prize.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tournament map ─── */}
        <section style={sectionGap}>
          <div className="section-label" style={{ marginBottom: "16px" }}>Turnausreitti</div>
          <div style={{
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
          }}>
            <img
              src="/tournament-map.jpg"
              alt="WC26 turnausreitti Euroopassa — 6 kenttää kuuden kuukauden aikana"
              style={{ width: "100%", display: "block" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).closest("section")!.style.display = "none"; }}
            />
          </div>
        </section>

        {/* ── CTA ─── */}
        <div style={{
          padding: "28px 32px",
          background: "rgba(201,169,110,0.06)",
          border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: "var(--radius-lg)",
          textAlign: "center",
          boxShadow: "var(--shadow-card)",
        }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", marginBottom: "8px", color: "var(--text)" }}>
            Onko sinulla kysyttävää?
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "18px", lineHeight: 1.6 }}>
            WC26 Assistentti vastaa kaikkiin kysymyksiin turnauksesta reaaliajassa.
          </div>
          <Link href="/" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 26px",
            background: "var(--text)",
            color: "#fff",
            borderRadius: "var(--radius)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textDecoration: "none",
            fontWeight: 700,
            transition: "opacity 0.15s",
          }}>
            KYSY WC26 ASSISTENTILTA →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .info-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
