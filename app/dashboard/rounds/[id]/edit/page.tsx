"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import RoundForm, { type RoundFormData } from "@/components/RoundForm";
import { getDashboard, updateRound, type Round } from "@/lib/player";
import AppNav from "@/components/AppNav";
import Skeleton from "@/components/Skeleton";

export default function EditRoundPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const roundId = params.id;

  const [round, setRound] = useState<Round | null>(null);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    getDashboard().then((res) => {
      if (res.success && res.data) {
        const found = res.data.rounds.find((r) => r.id === roundId);
        if (found) {
          setRound(found);
        } else {
          setLoadError("Kierrosta ei löydy.");
        }
      } else {
        setLoadError(res.error ?? "Lataus epäonnistui.");
      }
    });
  }, [roundId]);

  async function handleSubmit(data: RoundFormData) {
    setLoading(true);
    setSubmitError("");
    try {
      const res = await updateRound(roundId, data);
      if (res.success) {
        router.push("/dashboard");
      } else {
        setSubmitError(res.error ?? "Tallennus epäonnistui.");
      }
    } catch {
      setSubmitError("Verkkovirhe. Yritä uudelleen.");
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
            Muokkaa kierrosta
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
            MUOKKAA
          </h1>
        </div>

        <div className="divider" style={{ marginBottom: "40px" }} />

        {loadError && (
          <div
            style={{
              background: "rgba(220,38,38,0.06)",
              border: "1px solid rgba(220,38,38,0.15)",
              borderRadius: "var(--radius)",
              padding: "16px",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--red-bright)",
              textAlign: "center",
            }}
          >
            {loadError}
          </div>
        )}

        {!loadError && !round && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Skeleton width="100%" height={52} />
            <Skeleton width="100%" height={52} />
            <Skeleton width="100%" height={52} />
            <Skeleton width={160} height={44} />
          </div>
        )}

        {round && (
          <div style={{ animation: "fadeUp 0.4s 0.1s ease both" }}>
            <RoundForm
              initial={{
                course_id: round.course_id ?? undefined,
                course_name_custom: round.course_name_custom ?? undefined,
                date_played: round.date_played,
                total_shots: round.total_shots,
                longest_drive: round.longest_drive ?? undefined,
                closest_to_pin: round.closest_to_pin ?? undefined,
                notes: round.notes ?? undefined,
                handicap_at_time: round.handicap_at_time,
              }}
              onSubmit={handleSubmit}
              submitLabel="TALLENNA MUUTOKSET"
              loading={loading}
              error={submitError}
            />
          </div>
        )}
      </main>
    </div>
  );
}
