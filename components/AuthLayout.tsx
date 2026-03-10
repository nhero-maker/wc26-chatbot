import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Background grid lines */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: "20px",
          left: "32px",
          textDecoration: "none",
          zIndex: 10,
        }}
      >
        <img
          src="/wc26-logo.png"
          alt="WC26"
          style={{ height: "44px", width: "auto" }}
        />
      </a>

      {/* Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "440px",
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "40px",
          boxShadow: "var(--shadow-card)",
          animation: "fadeUp 0.4s ease both",
        }}
      >
        {/* Section label */}
        <div className="section-label" style={{ marginBottom: "24px" }}>
          Winter Cup 2026
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "32px",
            letterSpacing: "0.04em",
            color: "var(--text)",
            marginBottom: subtitle ? "8px" : "32px",
            lineHeight: 1,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--text-muted)",
              marginBottom: "32px",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
