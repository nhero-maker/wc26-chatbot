"use client";
import type { TournamentEvent } from "@/lib/player";

const NOW_MONTH = "2026-03";
const SHORT_MONTH: Record<string, string> = {
  "2026-01": "Tam", "2026-02": "Hel", "2026-03": "Maa",
  "2026-04": "Huh", "2026-05": "Tou", "2026-06": "Kes",
};

interface Props {
  events: TournamentEvent[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function CourseSelector({ events, selectedId, onSelect }: Props) {
  return (
    <div style={{
      position: "sticky", top: "73px", zIndex: 9,
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--border)",
      overflowX: "auto", display: "flex", gap: 0,
      scrollbarWidth: "none",
    }}>
      {events.map((ev) => {
        const state = ev.event_month! < NOW_MONTH ? "completed" : ev.event_month === NOW_MONTH ? "active" : "upcoming";
        const isSelected = ev.id === selectedId;
        return (
          <button
            key={ev.id}
            onClick={() => onSelect(ev.id)}
            style={{
              flex: "0 0 auto", padding: "14px 20px",
              background: "none", border: "none",
              borderBottom: isSelected ? "2px solid var(--gold, #c9a84c)" : "2px solid transparent",
              cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: "6px", minWidth: "110px",
              transition: "border-color 0.15s",
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: state === "upcoming" ? "var(--border)" : "var(--gold, #c9a84c)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700,
              color: state === "upcoming" ? "var(--text-muted)" : "#1a1a2e",
              boxShadow: state === "active" ? "0 0 10px rgba(201,168,76,0.5)" : "none",
            }}>
              {ev.round_number}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "9px",
              letterSpacing: "0.08em", textAlign: "center",
              color: isSelected ? "var(--text)" : "var(--text-muted)",
              lineHeight: 1.2,
            }}>
              <div style={{ fontWeight: 700 }}>{ev.course_name.split(" ").slice(0, 2).join(" ")}</div>
              <div>{SHORT_MONTH[ev.event_month!] ?? ev.event_month}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
