"use client";

import type { TournamentEvent } from "@/lib/player";
import { COLORS } from "@/lib/chart-utils";

interface Props {
  settings: TournamentEvent["course_settings"];
}

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: COLORS.textMuted,
  fontFamily: "Barlow, sans-serif",
  marginBottom: "2px",
};

const valueStyle: React.CSSProperties = {
  fontSize: "13px",
  color: COLORS.text,
  fontFamily: "Barlow Condensed, sans-serif",
  fontWeight: 600,
  marginBottom: "12px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "12px",
  color: COLORS.blueBright,
  fontFamily: "Barlow Condensed, sans-serif",
  fontWeight: 700,
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  marginBottom: "12px",
  paddingBottom: "6px",
  borderBottom: `1px solid ${COLORS.border}`,
};

function ConditionRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  );
}

export default function CourseConditions({ settings }: Props) {
  const hasPlaySettings = settings.male_tee || settings.female_tee ||
    settings.scoring || settings.holes || settings.putting ||
    settings.pins || settings.mulligans;

  const hasCourseSettings = settings.wind || settings.fairway_firmness ||
    settings.green_firmness || settings.green_stimp;

  if (!hasPlaySettings && !hasCourseSettings) {
    return (
      <div style={{
        textAlign: "center", padding: "32px 0",
        fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-dim)",
      }}>
        Ei asetuksia
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      padding: "16px",
      borderRadius: "8px",
      background: COLORS.surface2,
      border: `1px solid ${COLORS.border}`,
    }}>
      {/* Left column: Play settings */}
      <div>
        <div style={headingStyle}>Peliasetukset</div>
        <ConditionRow label="Miesten tiit" value={settings.male_tee} />
        <ConditionRow label="Naisten tiit" value={settings.female_tee} />
        <ConditionRow label="Pistelasku" value={settings.scoring} />
        <ConditionRow label="Reiät" value={settings.holes} />
        <ConditionRow label="Puttaus" value={settings.putting} />
        <ConditionRow label="Liput" value={settings.pins} />
        <ConditionRow label="Mulliganit" value={settings.mulligans} />
      </div>

      {/* Right column: Course settings */}
      <div>
        <div style={headingStyle}>Kentän asetukset</div>
        <ConditionRow label="Tuuli" value={settings.wind} />
        <ConditionRow label="Väylän kovuus" value={settings.fairway_firmness} />
        <ConditionRow label="Greenin kovuus" value={settings.green_firmness} />
        <ConditionRow label="Green stimp" value={settings.green_stimp} />
      </div>
    </div>
  );
}
