"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import { verifySignIn } from "@/lib/player";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setErrorMsg("Kirjautumislinkki puuttuu.");
      setStatus("error");
      return;
    }

    verifySignIn(token)
      .then((res) => {
        if (res.success) {
          router.replace("/dashboard");
        } else {
          setErrorMsg(res.error ?? "Linkki on vanhentunut tai jo k\u00e4ytetty.");
          setStatus("error");
        }
      })
      .catch(() => {
        setErrorMsg("Verkkovirhe. Yrit\u00e4 uudelleen.");
        setStatus("error");
      });
  }, [router, searchParams]);

  if (status === "loading") {
    return (
      <AuthLayout title="KIRJAUDUTAAN SIS\u00c4\u00c4N">
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div
            style={{
              display: "inline-flex",
              gap: "6px",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--blue-bright)",
                  animation: `typing-dot 1.2s ${i * 0.2}s ease infinite`,
                }}
              />
            ))}
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--text-muted)",
            }}
          >
            Vahvistetaan kirjautuminen...
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="KIRJAUTUMINEN EP\u00c4ONNISTUI">
      <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "48px",
            color: "var(--red-bright)",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          \u2715
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}
        >
          {errorMsg}
        </p>
        <a
          href="/signin"
          style={{
            display: "inline-block",
            background: "var(--blue-mid)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "var(--radius)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.08em",
            textDecoration: "none",
          }}
        >
          PYYD\u00c4 UUSI LINKKI
        </a>
      </div>
    </AuthLayout>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <AuthLayout title="KIRJAUDUTAAN SIS\u00c4\u00c4N">
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-muted)" }}>
              Ladataan...
            </p>
          </div>
        </AuthLayout>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
