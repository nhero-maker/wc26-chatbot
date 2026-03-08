import AuthLayout from "@/components/AuthLayout";

export default async function VerifiedPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const isError = !!error;

  return (
    <AuthLayout title={isError ? "LINKKI VANHENTUNUT" : "SÄHKÖPOSTI VAHVISTETTU"}>
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
          {isError ? "✕" : "✓"}
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
            ? "Vahvistuslinkki on vanhentunut tai jo käytetty. Rekisteröidy uudelleen tai ota yhteyttä."
            : "Tilisi on nyt aktivoitu. Kirjaudu sisään aloittaaksesi."}
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
          {isError ? "REKISTERÖIDY UUDELLEEN" : "KIRJAUDU SISÄÄN"}
        </a>
      </div>
    </AuthLayout>
  );
}
