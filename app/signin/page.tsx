"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { requestSignIn } from "@/lib/player";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await requestSignIn(email);
      setSent(true);
    } catch {
      setError("Verkkovirhe. Yrit\u00e4 uudelleen.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <AuthLayout title="TARKISTA S\u00c4HK\u00d6POSTI">
        <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "56px",
              lineHeight: 1,
              color: "var(--gold-bright)",
              marginBottom: "20px",
            }}
          >
            \u26f3
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}
          >
            Jos osoite <strong style={{ color: "var(--text)" }}>{email}</strong> on rekister\u00f6ity,
            l\u00e4hetimme sinulle kirjautumislinkin.
            <br />
            <br />
            Linkki vanhenee 15 minuutissa.
          </p>
          <button
            onClick={() => setSent(false)}
            style={{
              marginTop: "24px",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "10px 20px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-bright)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            L\u00c4HET\u00c4 UUDELLEEN
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="KIRJAUDU SIS\u00c4\u00c4N" subtitle="Sy\u00f6t\u00e4 s\u00e4hk\u00f6postisi ja saat kirjautumislinkin.">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "var(--text-muted)",
              textTransform: "uppercase" as const,
              marginBottom: "6px",
            }}
          >
            S\u00e4hk\u00f6posti
          </label>
          <input
            type="email"
            placeholder="matti@esimerkki.fi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "10px 14px",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--text)",
              outline: "none",
            }}
            required
          />
        </div>

        {error && (
          <div
            style={{
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.25)",
              borderRadius: "var(--radius)",
              padding: "10px 14px",
              fontSize: "13px",
              color: "var(--red-bright)",
              fontFamily: "var(--font-body)",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "var(--surface-3)" : "var(--blue-mid)",
            color: loading ? "var(--text-muted)" : "#fff",
            border: "none",
            borderRadius: "var(--radius)",
            padding: "14px 24px",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "16px",
            letterSpacing: "0.08em",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
          }}
        >
          {loading ? "L\u00c4HETET\u00c4\u00c4N..." : "L\u00c4HET\u00c4 LINKKI"}
        </button>
      </form>

      <p
        style={{
          marginTop: "24px",
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "var(--text-muted)",
        }}
      >
        Ei tili\u00e4 viel\u00e4?{" "}
        <a href="/register" style={{ color: "var(--blue-bright)", textDecoration: "none" }}>
          Rekister\u00f6idy
        </a>
      </p>
    </AuthLayout>
  );
}
