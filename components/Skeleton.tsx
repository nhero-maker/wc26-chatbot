"use client";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
}

export default function Skeleton({ width = "100%", height = 16, borderRadius = 4, style }: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, flexShrink: 0, ...style }}
      aria-hidden="true"
    />
  );
}

// ─── Preset layouts ───────────────────────────────────────────────────────────

export function DashboardSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Stat cards */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 0" }}>
        <div style={{ marginBottom: "40px" }}>
          <Skeleton width={120} height={12} style={{ marginBottom: "16px" }} />
          <Skeleton width={260} height={52} />
          <Skeleton width={160} height={14} style={{ marginTop: "10px" }} />
        </div>
        <div style={{ height: "1px", background: "var(--border)", marginBottom: "40px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "20px 24px" }}>
              <Skeleton width="60%" height={12} style={{ marginBottom: "12px" }} />
              <Skeleton width="80%" height={32} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", marginBottom: "48px" }}>
          <Skeleton width={160} height={44} borderRadius={4} />
          <Skeleton width={140} height={44} borderRadius={4} />
        </div>
        <Skeleton width={180} height={12} style={{ marginBottom: "20px" }} />
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ padding: "16px 24px", borderBottom: i < 2 ? "1px solid var(--border)" : "none", display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Skeleton width="55%" height={14} style={{ marginBottom: "6px" }} />
                <Skeleton width="35%" height={11} />
              </div>
              <Skeleton width={60} height={20} />
              <Skeleton width={70} height={22} borderRadius={4} />
              <Skeleton width={70} height={34} borderRadius={4} />
              <Skeleton width={60} height={34} borderRadius={4} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LeaderboardSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 32px 0" }}>
        <Skeleton width={160} height={12} style={{ marginBottom: "16px" }} />
        <Skeleton width={200} height={52} style={{ marginBottom: "40px" }} />
        <div style={{ height: "1px", background: "var(--border)", marginBottom: "32px" }} />
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "4px", display: "flex", gap: "4px", marginBottom: "32px" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width="20%" height={40} borderRadius={4} />
          ))}
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{ padding: "12px 24px", borderBottom: i < 9 ? "1px solid var(--border)" : "none", display: "flex", gap: "16px", alignItems: "center" }}>
              <Skeleton width={20} height={16} />
              <Skeleton width={10} height={10} borderRadius="50%" />
              <Skeleton width="40%" height={14} style={{ flex: 1 }} />
              <Skeleton width={40} height={11} />
              <Skeleton width={60} height={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TournamentSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 0" }}>
        <Skeleton width={120} height={12} style={{ marginBottom: "12px" }} />
        <Skeleton width={240} height={64} style={{ marginBottom: "24px" }} />
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "32px", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "48px" }}>
            <Skeleton width={120} height={120} borderRadius="50%" />
            <Skeleton width={120} height={120} borderRadius="50%" />
          </div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "32px" }}>
          <Skeleton width="100%" height={180} borderRadius={4} />
        </div>
      </div>
    </div>
  );
}

export function ScorecardSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "48px 32px 0" }}>
        <Skeleton width={120} height={12} style={{ marginBottom: "12px" }} />
        <Skeleton width={320} height={64} style={{ marginBottom: "24px" }} />
        <div style={{ height: "1px", background: "var(--border)", marginBottom: "32px" }} />
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "20px 24px", marginBottom: "40px" }}>
          <Skeleton width="100%" height={80} borderRadius={4} />
        </div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} width={100} height={36} borderRadius={4} />
          ))}
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          <Skeleton width="100%" height={320} borderRadius={0} />
        </div>
      </div>
    </div>
  );
}
