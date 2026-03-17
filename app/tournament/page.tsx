"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getTournament,
  signOut,
  type TournamentData,
} from "@/lib/player";
import {
  WC26_TOURNAMENT_PLAYERS,
  WC26_EVENTS,
  WC26_MATCHUPS,
  WC26_SCORECARDS,
  WC26_ROUND_STATS,
  WC26_EVENT_PARS,
  WC26_SKILL_POINTS,
  getStaticTeamStandings,
} from "@/lib/wc26-data";
import AppNav from "@/components/AppNav";
import { TournamentSkeleton } from "@/components/Skeleton";
import CardPanel from "@/components/CardPanel";
import TeamScoreCircles from "@/components/charts/TeamScoreCircles";
import CourseSelector from "@/components/CourseSelector";
import CourseHero from "@/components/charts/CourseHero";
import EventGroupResults from "@/components/charts/EventGroupResults";
import EventTeamPoints from "@/components/charts/EventTeamPoints";
import EventMVPChart from "@/components/charts/EventMVPChart";
import EventBirdmanChart from "@/components/charts/EventBirdmanChart";
import EventDriveChart from "@/components/charts/EventDriveChart";
import EventSharpShooterChart from "@/components/charts/EventSharpShooterChart";
import EventStrokeLeaderboard from "@/components/charts/EventStrokeLeaderboard";
import CumulativeTeamPointsChart from "@/components/charts/CumulativeTeamPointsChart";
import AllPlayersMatchPointsChart from "@/components/charts/AllPlayersMatchPointsChart";
import CrossRoundProgressionChart from "@/components/charts/CrossRoundProgressionChart";

const NOW_MONTH = "2026-03";

export default function TournamentPage() {
  const router = useRouter();
  const [data, setData] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<number>(() => {
    // Default: current month's event, or last event
    const cur = WC26_EVENTS.find((e) => e.event_month === NOW_MONTH);
    return cur?.id ?? WC26_EVENTS[WC26_EVENTS.length - 1]?.id ?? 1;
  });

  useEffect(() => {
    getTournament()
      .then((res) => {
        if (res.success && res.data) {
          const d = res.data;
          const staticScoredEventIds = new Set(
            WC26_MATCHUPS
              .filter((m) => m.team1_points > 0 || m.team2_points > 0)
              .map((m) => m.event_id)
          );
          const n8nOnlyMatchups = d.matchups.filter((m) => !staticScoredEventIds.has(m.event_id));
          const mergedMatchups = [
            ...WC26_MATCHUPS.filter((m) => staticScoredEventIds.has(m.event_id)),
            ...n8nOnlyMatchups,
          ];
          const computedStandings = {
            team1_total: mergedMatchups.reduce((s, m) => s + m.team1_points, 0),
            team2_total: mergedMatchups.reduce((s, m) => s + m.team2_points, 0),
          };
          const merged: TournamentData = {
            players: d.players.length > 0 ? d.players : WC26_TOURNAMENT_PLAYERS,
            events: d.events.length > 0 ? d.events : WC26_EVENTS,
            matchups: mergedMatchups,
            bonusPoints: d.bonusPoints,
            teamStandings:
              d.teamStandings.team1_total > computedStandings.team1_total ||
              d.teamStandings.team2_total > computedStandings.team2_total
                ? d.teamStandings
                : computedStandings,
          };
          setData(merged);
        } else {
          if (res.error?.includes("kirjautunut")) {
            router.replace("/signin");
            return;
          }
          const standings = getStaticTeamStandings();
          setData({
            players: WC26_TOURNAMENT_PLAYERS,
            events: WC26_EVENTS,
            matchups: WC26_MATCHUPS,
            bonusPoints: [],
            teamStandings: standings,
          });
        }
      })
      .catch(() => {
        const standings = getStaticTeamStandings();
        setData({
          players: WC26_TOURNAMENT_PLAYERS,
          events: WC26_EVENTS,
          matchups: WC26_MATCHUPS,
          bonusPoints: [],
          teamStandings: standings,
        });
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  if (loading) {
    return <TournamentSkeleton />;
  }

  const { players, events, matchups, teamStandings } = data ?? {
    players: WC26_TOURNAMENT_PLAYERS,
    events: WC26_EVENTS,
    matchups: WC26_MATCHUPS,
    teamStandings: getStaticTeamStandings(),
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId) ?? events[0];
  const isCompleted = (selectedEvent?.event_month ?? "") < NOW_MONTH;
  const isActive = selectedEvent?.event_month === NOW_MONTH;
  const eventMatchups = matchups.filter((m) => m.event_id === selectedEventId);
  const eventSkillPoints = WC26_SKILL_POINTS.find((sp) => sp.eventId === selectedEventId);

  // Previous event id for rank-change arrows
  const selectedEventIndex = events.findIndex((e) => e.id === selectedEventId);
  const prevEventId = selectedEventIndex > 0 ? events[selectedEventIndex - 1].id : undefined;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppNav activePage="tournament" onSignOut={handleSignOut} />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 80px" }}>
        {/* Title */}
        <div style={{ marginBottom: "32px", animation: "fadeUp 0.4s ease both" }}>
          <div className="section-label" style={{ marginBottom: "12px" }}>Winter Cup 2026</div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: "clamp(48px, 8vw, 80px)", color: "var(--text)",
            lineHeight: 1, letterSpacing: "0.02em",
          }}>TURNAUS</h1>
          <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
            <span className="badge badge-blue">{players.length} pelaajaa</span>
            <span className="badge badge-blue">{events.length} kierrosta</span>
          </div>
        </div>

        {/* Overall standings */}
        <CardPanel title="Kokonaispistetilanne" delay={0.05}>
          <TeamScoreCircles
            team1Total={teamStandings.team1_total}
            team2Total={teamStandings.team2_total}
          />
        </CardPanel>

        <div style={{ height: "20px" }} />

        {/* Koko kisa — always visible */}
        <div className="section-label" style={{ marginBottom: "12px" }}>Koko kisa</div>
        <CardPanel title="Pistetilanne kierroksittain" delay={0.1}>
          <CrossRoundProgressionChart
            matchups={matchups}
            skillPoints={WC26_SKILL_POINTS}
            events={events}
          />
        </CardPanel>

        <div style={{ height: "24px" }} />
        <div className="divider" style={{ marginBottom: "0" }} />
      </main>

      {/* Course selector (sticky below header) */}
      <CourseSelector
        events={events}
        selectedId={selectedEventId}
        onSelect={setSelectedEventId}
      />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 32px 80px" }}>
        {selectedEvent && (
          <div style={{ animation: "fadeUp 0.3s ease both" }}>
            {/* Course hero */}
            <CourseHero event={selectedEvent} isCompleted={isCompleted} />

            {isCompleted || isActive ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

                {/* ── JOUKKUEPISTEET ────────────────────────────────────────── */}
                <div>
                  <div className="section-label" style={{ marginBottom: "16px" }}>Joukkuepisteet</div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                  }}>
                    <CardPanel title="Joukkuepisteet" delay={0.05}>
                      <EventTeamPoints
                        matchups={matchups}
                        eventId={selectedEventId}
                        format={selectedEvent.format}
                      />
                    </CardPanel>

                    {eventSkillPoints && (
                      <CardPanel title="Pistekertymä" delay={0.1}>
                        <CumulativeTeamPointsChart
                          matchups={eventMatchups}
                          skillPoints={eventSkillPoints}
                        />
                      </CardPanel>
                    )}
                  </div>

                  {eventSkillPoints && (
                    <div style={{ marginTop: "20px" }}>
                      <CardPanel title="Kaikkien pelaajien pisteet" delay={0.12}>
                        <AllPlayersMatchPointsChart
                          matchups={eventMatchups}
                          skillPoints={eventSkillPoints}
                        />
                      </CardPanel>
                    </div>
                  )}
                </div>

                {/* ── YKSILÖTULOKSET ────────────────────────────────────────── */}
                <div>
                  <div className="section-label" style={{ marginBottom: "16px" }}>Yksilötulokset</div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                  }}>
                    <CardPanel title="Lyöntimäärä (Gross)" delay={0.05}>
                      <EventStrokeLeaderboard
                        scorecards={WC26_SCORECARDS}
                        players={players}
                        eventId={selectedEventId}
                        mode="gross"
                        prevEventId={prevEventId}
                      />
                    </CardPanel>

                    <CardPanel title="Nettotulos" delay={0.1}>
                      <EventStrokeLeaderboard
                        scorecards={WC26_SCORECARDS}
                        players={players}
                        eventId={selectedEventId}
                        mode="net"
                        prevEventId={prevEventId}
                      />
                    </CardPanel>
                  </div>
                </div>

                {/* ── OTTELUT ───────────────────────────────────────────────── */}
                <div>
                  <div className="section-label" style={{ marginBottom: "16px" }}>Ottelut</div>
                  <CardPanel title="Ottelutulokset" delay={0.15}>
                    <EventGroupResults
                      matchups={eventMatchups}
                      format={selectedEvent.format}
                      scorecards={WC26_SCORECARDS}
                      pars={WC26_EVENT_PARS[selectedEventId]}
                      roundStats={WC26_ROUND_STATS}
                      players={players}
                      eventId={selectedEventId}
                    />
                  </CardPanel>
                </div>

                {/* ── TAITOPISTEET ──────────────────────────────────────────── */}
                <div>
                  <div className="section-label" style={{ marginBottom: "16px" }}>Taitopisteet</div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                  }}>
                    <CardPanel title="MVP Pisteet" delay={0.15}>
                      <EventMVPChart
                        roundStats={WC26_ROUND_STATS}
                        players={players}
                        eventId={selectedEventId}
                      />
                    </CardPanel>

                    <CardPanel title="Birdman" delay={0.2}>
                      <EventBirdmanChart
                        players={players}
                        eventId={selectedEventId}
                      />
                    </CardPanel>

                    <CardPanel title="Pisin Draivi" delay={0.2}>
                      <EventDriveChart
                        roundStats={WC26_ROUND_STATS}
                        players={players}
                        eventId={selectedEventId}
                      />
                    </CardPanel>

                    <CardPanel title="Tarkin 100m" delay={0.25}>
                      <EventSharpShooterChart
                        roundStats={WC26_ROUND_STATS}
                        players={players}
                        eventId={selectedEventId}
                      />
                    </CardPanel>
                  </div>
                </div>

              </div>
            ) : (
              <div style={{
                textAlign: "center", padding: "48px 32px",
                border: "1px solid var(--border)", borderRadius: "var(--radius)",
                fontFamily: "var(--font-mono)", fontSize: "13px",
                color: "var(--text-muted)", letterSpacing: "0.08em",
              }}>
                Tulokset lisätään kierroksen jälkeen.
              </div>
            )}

            <div style={{ height: "32px" }} />
          </div>
        )}

        <div className="divider" style={{ marginBottom: "32px" }} />

        {/* Players list */}
        <div className="section-label" style={{ marginBottom: "16px" }}>Pelaajat</div>
        <CardPanel title="Joukkueet" delay={0.3}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {[1, 2].map((teamNum) => (
              <div key={teamNum}>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 900,
                  fontSize: "14px", letterSpacing: "0.1em",
                  color: teamNum === 1 ? "var(--blue-team)" : "var(--red-team)",
                  marginBottom: "12px",
                }}>
                  {teamNum === 1 ? "SINISET" : "PUNAISET"}
                </div>
                {players
                  .filter((p) => p.team === teamNum)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((p) => (
                    <div key={p.id} style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text)" }}>
                        {p.name}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                        HCP {p.handicap}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </CardPanel>
      </main>
    </div>
  );
}
