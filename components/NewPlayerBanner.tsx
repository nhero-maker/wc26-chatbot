"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DISMISS_KEY = "wc26_info_dismissed";

export default function NewPlayerBanner() {
  const [visible, setVisible] = useState(false);
  const [collapsing, setCollapsing] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(DISMISS_KEY)) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setCollapsing(true);
    localStorage.setItem(DISMISS_KEY, "1");
    setTimeout(() => setVisible(false), 320);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        margin: "24px 0 0",
        padding: "16px 20px",
        background: "rgba(201,169,110,0.06)",
        border: "1px solid rgba(201,169,110,0.25)",
        borderLeft: "4px solid var(--gold-mid)",
        borderRadius: "var(--radius-lg)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "16px",
        opacity: collapsing ? 0 : 1,
        maxHeight: collapsing ? "0" : "200px",
        overflow: "hidden",
        transition: "opacity 0.3s ease, max-height 0.32s ease",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "14px",
            color: "var(--text)",
            letterSpacing: "0.02em",
            marginBottom: "4px",
          }}
        >
          Uusi WC26-pelaaja?
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            lineHeight: 1.55,
            marginBottom: "10px",
          }}
        >
          Lue turnauksen säännöt, kentät, skill challenget ja palkintokategoriat
          ennen ensimmäistä kierrostasi.
        </div>
        <Link
          href="/info"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "var(--gold-mid)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontWeight: 700,
          }}
        >
          TUTUSTU TURNAUKSEEN →
        </Link>
      </div>
      <button
        onClick={dismiss}
        aria-label="Sulje ilmoitus"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0",
          color: "var(--text-muted)",
          fontSize: "16px",
          lineHeight: 1,
          opacity: 0.45,
          flexShrink: 0,
          minWidth: "44px",
          minHeight: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--radius)",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.45")}
      >
        ✕
      </button>
    </div>
  );
}
