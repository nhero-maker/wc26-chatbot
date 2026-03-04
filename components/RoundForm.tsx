"use client";

import { useState } from "react";

const COURSES = [
  { id: 1, name: "Lofoten Links" },
  { id: 2, name: "Marco Simone Golf Club" },
  { id: 3, name: "Evian Resort Golf Club" },
  { id: 4, name: "Real Club Valderrama" },
  { id: 5, name: "St Andrews Old Course" },
  { id: 6, name: "Grande Finale" },
];

export interface RoundFormData {
  course_id?: number;
  course_name_custom?: string;
  date_played: string;
  total_shots: number;
  longest_drive?: number;
  closest_to_pin?: number;
  notes?: string;
  handicap_at_time: number;
}

interface RoundFormProps {
  initial?: Partial<RoundFormData & { course_id: number | null }>;
  onSubmit: (data: RoundFormData) => Promise<void>;
  submitLabel: string;
  loading?: boolean;
  error?: string;
}

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

const optionalStyle: React.CSSProperties = {
  color: "var(--text-dim)",
  fontFamily: "var(--font-body)",
  textTransform: "none",
  letterSpacing: 0,
  fontSize: "10px",
};

export default function RoundForm({
  initial = {},
  onSubmit,
  submitLabel,
  loading,
  error,
}: RoundFormProps) {
  const [courseId, setCourseId] = useState<string>(
    initial.course_id ? initial.course_id.toString() : ""
  );
  const [courseCustom, setCourseCustom] = useState(initial.course_name_custom ?? "");
  const [datePlayed, setDatePlayed] = useState(
    initial.date_played ?? new Date().toISOString().split("T")[0]
  );
  const [totalShots, setTotalShots] = useState(initial.total_shots?.toString() ?? "");
  const [longestDrive, setLongestDrive] = useState(initial.longest_drive?.toString() ?? "");
  const [closestToPin, setClosestToPin] = useState(initial.closest_to_pin?.toString() ?? "");
  const [notes, setNotes] = useState(initial.notes ?? "");
  const [handicap, setHandicap] = useState(initial.handicap_at_time?.toString() ?? "");

  const isOther = courseId === "other";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: RoundFormData = {
      date_played: datePlayed,
      total_shots: parseInt(totalShots),
      handicap_at_time: parseFloat(handicap),
    };

    if (isOther) {
      data.course_name_custom = courseCustom.trim();
    } else if (courseId) {
      data.course_id = parseInt(courseId);
    }

    if (longestDrive) data.longest_drive = parseInt(longestDrive);
    if (closestToPin) data.closest_to_pin = parseInt(closestToPin);
    if (notes.trim()) data.notes = notes.trim();

    await onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Course selection */}
      <div>
        <label style={labelStyle}>Kentt\u00e4</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          style={{ ...inputStyle, cursor: "pointer" }}
          required
        >
          <option value="">Valitse kentt\u00e4</option>
          {COURSES.map((c) => (
            <option key={c.id} value={c.id.toString()}>
              {c.name}
            </option>
          ))}
          <option value="other">Muu kentt\u00e4</option>
        </select>
      </div>

      {isOther && (
        <div>
          <label style={labelStyle}>Kent\u00e4n nimi</label>
          <input
            type="text"
            value={courseCustom}
            onChange={(e) => setCourseCustom(e.target.value)}
            placeholder="Sy\u00f6t\u00e4 kent\u00e4n nimi"
            style={inputStyle}
            required
          />
        </div>
      )}

      {/* Date */}
      <div>
        <label style={labelStyle}>Pelip\u00e4iv\u00e4</label>
        <input
          type="date"
          value={datePlayed}
          onChange={(e) => setDatePlayed(e.target.value)}
          style={inputStyle}
          required
        />
      </div>

      {/* Total shots + Handicap */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Ly\u00f6nnit yhteens\u00e4</label>
          <input
            type="number"
            value={totalShots}
            onChange={(e) => setTotalShots(e.target.value)}
            placeholder="72"
            min={1}
            max={299}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Tasoitus kierroksella</label>
          <input
            type="number"
            value={handicap}
            onChange={(e) => setHandicap(e.target.value)}
            placeholder="18.0"
            step="0.1"
            min={0}
            max={54}
            style={inputStyle}
            required
          />
        </div>
      </div>

      {/* Optional stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>
            Pisin ly\u00f6nti (m) <span style={optionalStyle}>valinnainen</span>
          </label>
          <input
            type="number"
            value={longestDrive}
            onChange={(e) => setLongestDrive(e.target.value)}
            placeholder="240"
            min={1}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            L\u00e4himp\u00e4n\u00e4 (cm) <span style={optionalStyle}>valinnainen</span>
          </label>
          <input
            type="number"
            value={closestToPin}
            onChange={(e) => setClosestToPin(e.target.value)}
            placeholder="150"
            min={1}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label style={labelStyle}>
          Muistiinpanot <span style={optionalStyle}>valinnainen</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Huomioita kierroksesta..."
          rows={3}
          style={{ ...inputStyle, resize: "vertical" as const }}
        />
      </div>

      {error && (
        <div
          style={{
            background: "rgba(220,38,38,0.1)",
            border: "1px solid rgba(220,38,38,0.25)",
            borderRadius: "var(--radius)",
            padding: "12px 16px",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "var(--red-bright)",
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
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
          transition: "all 0.2s",
          width: "100%",
        }}
      >
        {loading ? "TALLENNETAAN..." : submitLabel}
      </button>
    </form>
  );
}
