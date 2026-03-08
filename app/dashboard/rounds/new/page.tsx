"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RoundForm, { type RoundFormData } from "@/components/RoundForm";
import { createRound } from "@/lib/player";

export default function NewRoundPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(data: RoundFormData) {
    setLoading(true);
    setError("");
    try {
      const res = await createRound(data);
      if (res.success) {
        router.push("/dashboard");
      } else {
        setError(res.error ?? "Tallennus epäonnistui.");
      }
    } catch {
      setError("Verkkovirhe. Yritä uudelleen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(6,8,14,0.8)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "18px",
            letterSpacing: "0.15em",
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          WC26
        </a>
        <a
          href="/dashboard"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          ← TAKAISIN
        </a>
      </header>

      <main style={{ maxWidth: "560px", margin: "0 auto", padding: "48px 32px 80px" }}>
        <div style={{ marginBottom: "40px", animation: "fadeUp 0.4s ease both" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>
            Uusi kierros
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "40px",
              color: "var(--text)",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            KIRJAA KIERROS
          </h1>
        </div>

        <div className="divider" style={{ marginBottom: "40px" }} />

        <div style={{ animation: "fadeUp 0.4s 0.1s ease both" }}>
          <RoundForm
            onSubmit={handleSubmit}
            submitLabel="TALLENNA KIERROS"
            loading={loading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
}
