"use client";

import Link from "next/link";
import { WC26_EVENTS } from "@/lib/wc26-data";

export default function NextEventBanner() {
  const today = new Date();
  const currentYearMonth = today.toISOString().slice(0, 7); // e.g. "2026-03"

  // Check if there's an event happening this month
  const currentEvent = WC26_EVENTS.find((e) => e.event_month === currentYearMonth);

  // Find the next upcoming event (month strictly in the future)
  const nextEvent = WC26_EVENTS.find((e) => e.event_month > currentYearMonth);

  if (!currentEvent && !nextEvent) return null;

  if (currentEvent) {
    return (
      <Link
        href="/tournament"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "rgba(63,91,123,0.06)",
          border: "1px solid rgba(63,91,123,0.2)",
          borderRadius: "var(--radius)",
          padding: "12px 16px",
          textDecoration: "none",
          transition: "border-color 0.2s",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--blue-bright)",
            flexShrink: 0,
            boxShadow: "0 0 6px var(--blue-bright)",
            animation: "pulse 2s infinite",
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "var(--blue-bright)",
              marginBottom: "2px",
            }}
          >
            KÄYNNISSÄ NYT · KIERROS {currentEvent.round_number}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "14px",
              color: "var(--text)",
              letterSpacing: "0.04em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {currentEvent.course_name.toUpperCase()}
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            flexShrink: 0,
          }}
        >
          {currentEvent.dates} →
        </div>
      </Link>
    );
  }

  // Next upcoming event
  const nextDate = new Date(`${nextEvent!.event_month}-01`);
  const todayDate = new Date(today.toISOString().split("T")[0]);
  const diffMs = nextDate.getTime() - todayDate.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return (
    <Link
      href="/tournament"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "12px 16px",
        textDecoration: "none",
        transition: "border-color 0.2s",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "22px",
          color: "var(--text)",
          flexShrink: 0,
          minWidth: "44px",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {days}
      </div>
      <div
        style={{
          width: "1px",
          height: "28px",
          background: "var(--border)",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            color: "var(--text-muted)",
            marginBottom: "2px",
          }}
        >
          SEURAAVA KIERROS · KIERROS {nextEvent!.round_number}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "14px",
            color: "var(--text)",
            letterSpacing: "0.04em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {nextEvent!.course_name.toUpperCase()}
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
          flexShrink: 0,
        }}
      >
        {days === 1 ? "huomenna" : `${days} pv`} →
      </div>
    </Link>
  );
}
