import AuthLayout from "@/components/AuthLayout";

export default async function VerifiedPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const isError = !!error;

  return (
    <AuthLayout title={isError ? "LINKKI VANHENTUNUT" : "S\u00c4HK\u00d6POSTI VAHVISTETTU"}>
      <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "64px",
            lineHeight: 1,
            marginBottom: "20px",
            color: isError ? "var(--red-bright)" : "var(--blue-bright)",
          }}
        >
          {isError ? "\u2715" : "\u2713"}
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          {isError
            ? "Vahvistuslinkki on vanhentunut tai jo k\u00e4ytetty. Rekister\u00f6idy uudelleen tai ota yhteytt\u00e4."
            : "Tilisi on nyt aktivoitu. Kirjaudu sis\u00e4\u00e4n aloittaaksesi."}
        </p>

        <a
          href={isError ? "/register" : "/signin"}
          style={{
            display: "inline-flex",
            marginTop: "28px",
            background: isError ? "var(--surface-3)" : "var(--blue-mid)",
            color: isError ? "var(--text-muted)" : "#fff",
            padding: "12px 24px",
            borderRadius: "var(--radius)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.08em",
            textDecoration: "none",
            border: isError ? "1px solid var(--border)" : "none",
          }}
        >
          {isError ? "REKISTER\u00d6IDY UUDELLEEN" : "KIRJAUDU SIS\u00c4\u00c4N"}
        </a>
      </div>
    </AuthLayout>
  );
}
