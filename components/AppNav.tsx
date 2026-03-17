"use client";

import { useState, useEffect, useCallback } from "react";

export type ActivePage = "dashboard" | "tournament" | "leaderboards" | "scorecards" | "info";

interface AppNavProps {
  activePage?: ActivePage;
  playerName?: string;
  onSignOut: () => void;
  /** When provided, renders a minimal header with just logo + back link */
  backHref?: string;
  backLabel?: string;
}

const NAV_LINKS: { href: string; label: string; key: ActivePage }[] = [
  { href: "/dashboard",   label: "HALLINTAPANEELI", key: "dashboard" },
  { href: "/tournament",  label: "TURNAUS",          key: "tournament" },
  { href: "/leaderboards",label: "TULOKSET",          key: "leaderboards" },
  { href: "/scorecards",  label: "TULOSKORTIT",       key: "scorecards" },
  { href: "/info",        label: "OPAS",              key: "info" },
];

export default function AppNav({ activePage, playerName, onSignOut, backHref, backLabel }: AppNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Close menu on route change (link click)
  function handleMobileLink() {
    setMenuOpen(false);
  }

  // Minimal mode for sub-pages (new round, edit round)
  if (backHref) {
    return (
      <header style={{
        borderBottom: "1px solid var(--border)",
        padding: "18px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.95)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <img src="/wc26-logo.png" alt="WC26" style={{ height: "36px", width: "auto", display: "block" }} />
        </a>
        <a href={backHref} className="nav-link" aria-label={backLabel ?? "Takaisin"}>
          ← {backLabel ?? "TAKAISIN"}
        </a>
      </header>
    );
  }

  return (
    <>
      <header style={{
        borderBottom: "1px solid var(--border)",
        padding: "18px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.95)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        gap: "16px",
      }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <img src="/wc26-logo.png" alt="WC26" style={{ height: "36px", width: "auto", display: "block" }} />
        </a>

        {/* Desktop nav links */}
        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "24px", flex: 1, justifyContent: "flex-end" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="nav-link"
              data-active={activePage === link.key ? "true" : undefined}
              aria-current={activePage === link.key ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
          {playerName && (
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--text-muted)",
              borderLeft: "1px solid var(--border)",
              paddingLeft: "16px",
              marginLeft: "4px",
            }}>
              {playerName}
            </span>
          )}
          <button className="nav-btn" onClick={onSignOut} aria-label="Kirjaudu ulos">
            KIRJAUDU ULOS
          </button>
        </nav>

        {/* Mobile right side: player name + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {playerName && (
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--text-muted)",
            }}
            className="mobile-player-name"
            >
              {playerName}
            </span>
          )}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Sulje valikko" : "Avaa valikko"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="nav-mobile-menu"
          aria-label="Mobiilinavigaatio"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="nav-mobile-link"
              data-active={activePage === link.key ? "true" : undefined}
              aria-current={activePage === link.key ? "page" : undefined}
              onClick={handleMobileLink}
            >
              {link.label}
            </a>
          ))}
          <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />
          <button
            onClick={() => { setMenuOpen(false); onSignOut(); }}
            className="nav-mobile-link"
            style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
            aria-label="Kirjaudu ulos"
          >
            KIRJAUDU ULOS
          </button>
        </nav>
      )}

      {/* Hide mobile player name on desktop */}
      <style>{`
        .mobile-player-name { display: none; }
        @media (max-width: 640px) {
          .mobile-player-name { display: inline; }
        }
      `}</style>
    </>
  );
}
