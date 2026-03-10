"use client";

export default function CardPanel({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "24px",
        boxShadow: "var(--shadow-card)",
        animation: `fadeUp 0.4s ${delay}s ease both`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          letterSpacing: "0.12em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
