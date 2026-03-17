"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RoundForm, { type RoundFormData } from "@/components/RoundForm";
import { createRound } from "@/lib/player";
import AppNav from "@/components/AppNav";

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
      <AppNav backHref="/dashboard" backLabel="TAKAISIN" onSignOut={() => router.push("/")} />

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
