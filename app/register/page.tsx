"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { registerPlayer } from "@/lib/player";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: "10px 14px",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  color: "var(--text)",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  letterSpacing: "0.12em",
  color: "var(--text-muted)",
  textTransform: "uppercase",
  marginBottom: "6px",
};

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", handicap: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await registerPlayer({
        name: form.name,
        email: form.email,
        phone: form.phone,
        handicap: parseFloat(form.handicap),
      });
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error ?? "Rekisteröinti epäonnistui.");
      }
    } catch {
      setError("Verkkovirhe. Yritä uudelleen.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <AuthLayout
        title="TARKISTA SÄHKÖPOSTI"
        subtitle="Lähetimme sinulle vahvistuslinkin. Klikkaa sitä aktivoidaksesi tilisi."
      >
        <div
          style={{
            textAlign: "center",
            padding: "16px",
            background: "rgba(63,91,123,0.08)",
            border: "1px solid rgba(63,91,123,0.2)",
            borderRadius: "var(--radius)",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "40px",
              color: "var(--blue-bright)",
              lineHeight: 1,
              marginBottom: "12px",
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            Sähköposti lähetetty osoitteeseen{" "}
            <strong style={{ color: "var(--text)" }}>{form.email}</strong>
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "var(--text-muted)",
            textAlign: "center",
          }}
        >
          Ei sähköpostia?{" "}
          <button
            onClick={() => setSuccess(false)}
            style={{
              background: "none",
              border: "none",
              color: "var(--blue-bright)",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "var(--font-body)",
            }}
          >
            Yritä uudelleen
          </button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="REKISTERÖIDY" subtitle="Luo pelaajaprofiili WC26-turnaukseen.">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Nimi</label>
          <input
            type="text"
            placeholder="Matti Meikäläinen"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Sähköposti</label>
          <input
            type="email"
            placeholder="matti@esimerkki.fi"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Puhelinnumero</label>
          <input
            type="tel"
            placeholder="+358 40 123 4567"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Tasoitus</label>
          <input
            type="number"
            placeholder="18.0"
            step="0.1"
            min={0}
            max={54}
            value={form.handicap}
            onChange={(e) => setForm((f) => ({ ...f, handicap: e.target.value }))}
            style={inputStyle}
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
            marginTop: "4px",
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
          {loading ? "REKISTERÖIDÄÄN..." : "REKISTERÖIDY"}
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
        Jo rekisteröitynyt?{" "}
        <a href="/signin" style={{ color: "var(--blue-bright)", textDecoration: "none" }}>
          Kirjaudu sisään
        </a>
      </p>
    </AuthLayout>
  );
}
