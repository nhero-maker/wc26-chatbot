"use client";

import { useState, useEffect } from "react";
import { getParsForCourse } from "@/lib/course-pars";
import type { HoleScore } from "@/lib/player";

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
  holes?: HoleScore[];
}

interface RoundFormProps {
  initial?: Partial<RoundFormData & { course_id: number | null; holes: HoleScore[] }>;
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
  fontSize: "12px",
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
  fontSize: "12px",
};

function emptyHoles(): { par: number; strokes: string }[] {
  return Array.from({ length: 18 }, () => ({ par: 4, strokes: "" }));
}

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

  const [showHoles, setShowHoles] = useState(!!initial.holes?.length);
  const [holeTab, setHoleTab] = useState<"front" | "back">("front");
  const [holes, setHoles] = useState<{ par: number; strokes: string }[]>(() => {
    if (initial.holes?.length === 18) {
      return initial.holes.map((h) => ({ par: h.par, strokes: h.strokes.toString() }));
    }
    return emptyHoles();
  });

  const isOther = courseId === "other";

  // Pre-fill par values when course changes
  useEffect(() => {
    if (!isOther && courseId) {
      const pars = getParsForCourse(parseInt(courseId));
      setHoles((prev) =>
        prev.map((h, i) => ({ ...h, par: pars[i] ?? 4 }))
      );
    }
  }, [courseId, isOther]);

  // Auto-calculate total shots from holes
  const holesTotal = holes.reduce((sum, h) => {
    const s = parseInt(h.strokes);
    return sum + (isNaN(s) ? 0 : s);
  }, 0);
  const allHolesFilled = holes.every((h) => h.strokes !== "" && !isNaN(parseInt(h.strokes)));

  // Front/back 9 subtotals
  const front9Par = holes.slice(0, 9).reduce((sum, h) => sum + h.par, 0);
  const back9Par = holes.slice(9).reduce((sum, h) => sum + h.par, 0);
  const front9Strokes = holes.slice(0, 9).reduce((sum, h) => { const s = parseInt(h.strokes); return sum + (isNaN(s) ? 0 : s); }, 0);
  const back9Strokes = holes.slice(9).reduce((sum, h) => { const s = parseInt(h.strokes); return sum + (isNaN(s) ? 0 : s); }, 0);
  const front9AllFilled = holes.slice(0, 9).every((h) => h.strokes !== "" && !isNaN(parseInt(h.strokes)));
  const back9AllFilled = holes.slice(9).every((h) => h.strokes !== "" && !isNaN(parseInt(h.strokes)));

  // Auto-switch to back 9 when front 9 is all filled
  useEffect(() => {
    if (front9AllFilled && !back9AllFilled) {
      setHoleTab("back");
    }
  }, [front9AllFilled, back9AllFilled]);

  useEffect(() => {
    if (showHoles && allHolesFilled && holesTotal > 0) {
      setTotalShots(holesTotal.toString());
    }
  }, [showHoles, allHolesFilled, holesTotal]);

  function updateHole(index: number, field: "par" | "strokes", value: string) {
    setHoles((prev) => {
      const next = [...prev];
      if (field === "par") {
        next[index] = { ...next[index], par: parseInt(value) || 4 };
      } else {
        next[index] = { ...next[index], strokes: value };
      }
      return next;
    });
  }

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

    if (longestDrive) data.longest_drive = parseFloat(longestDrive);
    if (closestToPin) data.closest_to_pin = parseFloat(closestToPin);
    if (notes.trim()) data.notes = notes.trim();

    if (showHoles && allHolesFilled) {
      data.holes = holes.map((h, i) => ({
        hole_number: i + 1,
        par: h.par,
        strokes: parseInt(h.strokes),
      }));
    }

    await onSubmit(data);
  }

  const parTotal = holes.reduce((sum, h) => sum + h.par, 0);

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Course selection */}
      <div>
        <label style={labelStyle}>Kenttä</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          style={{ ...inputStyle, cursor: "pointer" }}
          required
        >
          <option value="">Valitse kenttä</option>
          {COURSES.map((c) => (
            <option key={c.id} value={c.id.toString()}>
              {c.name}
            </option>
          ))}
          <option value="other">Muu kenttä</option>
        </select>
      </div>

      {isOther && (
        <div>
          <label style={labelStyle}>Kentän nimi</label>
          <input
            type="text"
            value={courseCustom}
            onChange={(e) => setCourseCustom(e.target.value)}
            placeholder="Syötä kentän nimi"
            style={inputStyle}
            required
          />
        </div>
      )}

      {/* Date */}
      <div>
        <label style={labelStyle}>Pelipäivä</label>
        <input
          type="date"
          value={datePlayed}
          onChange={(e) => setDatePlayed(e.target.value)}
          style={inputStyle}
          required
        />
      </div>

      {/* Hole-by-hole toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowHoles(!showHoles)}
          style={{
            background: showHoles ? "rgba(63,91,123,0.06)" : "transparent",
            border: `1px solid ${showHoles ? "var(--blue-mid)" : "var(--border)"}`,
            borderRadius: "var(--radius)",
            padding: "10px 16px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            color: showHoles ? "var(--blue-mid)" : "var(--text-muted)",
            cursor: "pointer",
            transition: "all 0.2s",
            width: "100%",
            textAlign: "left",
          }}
        >
          {showHoles ? "▾ VÄYLÄKOHTAISET TULOKSET" : "▸ LISÄÄ VÄYLÄKOHTAISET TULOKSET"}
          <span style={{ ...optionalStyle, marginLeft: "8px" }}>valinnainen</span>
        </button>
      </div>

      {/* Hole-by-hole grid */}
      {showHoles && (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {/* Tab bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {(["front", "back"] as const).map((tab) => {
              const label = tab === "front" ? "ETU 9  (1–9)" : "TAKA 9  (10–18)";
              const isActive = holeTab === tab;
              const filled = tab === "front" ? front9AllFilled : back9AllFilled;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setHoleTab(tab)}
                  style={{
                    background: isActive ? "var(--surface-2)" : "transparent",
                    border: "none",
                    borderBottom: isActive ? "2px solid var(--blue-mid)" : "2px solid transparent",
                    padding: "10px 12px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: isActive ? "var(--text)" : "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  {label}
                  {filled && (
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--blue-mid)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ padding: "16px" }}>
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40px 60px 1fr",
                gap: "8px",
                marginBottom: "8px",
                paddingBottom: "8px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div style={{ ...labelStyle, marginBottom: 0 }}>Väylä</div>
              <div style={{ ...labelStyle, marginBottom: 0 }}>Par</div>
              <div style={{ ...labelStyle, marginBottom: 0 }}>Lyönnit</div>
            </div>

            {/* Hole rows — filtered to active 9 */}
            {holes.slice(holeTab === "front" ? 0 : 9, holeTab === "front" ? 9 : 18).map((hole, relIdx) => {
              const i = holeTab === "front" ? relIdx : relIdx + 9;
              const strokes = parseInt(hole.strokes);
              const diff = !isNaN(strokes) ? strokes - hole.par : 0;
              let diffColor = "var(--text-muted)";
              if (diff < 0) diffColor = "var(--blue-bright)";
              else if (diff > 0) diffColor = "var(--red-bright)";
              else if (!isNaN(strokes)) diffColor = "var(--text)";

              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 60px 1fr",
                    gap: "8px",
                    alignItems: "center",
                    padding: "3px 0",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      textAlign: "center",
                    }}
                  >
                    {i + 1}
                  </div>
                  <select
                    value={hole.par}
                    onChange={(e) => updateHole(i, "par", e.target.value)}
                    style={{
                      ...inputStyle,
                      padding: "6px 8px",
                      fontSize: "13px",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                      type="number"
                      value={hole.strokes}
                      onChange={(e) => updateHole(i, "strokes", e.target.value)}
                      placeholder="—"
                      min={1}
                      max={20}
                      style={{
                        ...inputStyle,
                        padding: "6px 8px",
                        fontSize: "13px",
                        width: "70px",
                        textAlign: "center",
                      }}
                    />
                    {hole.strokes && !isNaN(strokes) && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          color: diffColor,
                          minWidth: "28px",
                        }}
                      >
                        {diff === 0 ? "E" : diff > 0 ? `+${diff}` : diff}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Subtotals row (OUT / IN) */}
            {(() => {
              const subPar = holeTab === "front" ? front9Par : back9Par;
              const subStrokes = holeTab === "front" ? front9Strokes : back9Strokes;
              const subFilled = holeTab === "front" ? front9AllFilled : back9AllFilled;
              const subLabel = holeTab === "front" ? "OUT" : "IN";
              const subDiff = subStrokes - subPar;
              return (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 60px 1fr",
                    gap: "8px",
                    marginTop: "8px",
                    paddingTop: "8px",
                    borderTop: "1px solid var(--border)",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      textAlign: "center",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {subLabel}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textAlign: "center",
                    }}
                  >
                    {subPar}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "14px",
                        color: subFilled ? "var(--text)" : "var(--text-dim)",
                        width: "70px",
                        textAlign: "center",
                      }}
                    >
                      {subStrokes > 0 ? subStrokes : "—"}
                    </div>
                    {subFilled && subStrokes > 0 && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          color:
                            subDiff < 0
                              ? "var(--blue-bright)"
                              : subDiff > 0
                                ? "var(--red-bright)"
                                : "var(--text)",
                          minWidth: "28px",
                        }}
                      >
                        {subDiff === 0 ? "E" : subDiff > 0 ? `+${subDiff}` : subDiff}
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Grand total row — only when all 18 filled */}
            {allHolesFilled && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 60px 1fr",
                  gap: "8px",
                  marginTop: "4px",
                  paddingTop: "8px",
                  borderTop: "1px solid var(--border)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    textAlign: "center",
                    letterSpacing: "0.08em",
                  }}
                >
                  YHT
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    textAlign: "center",
                  }}
                >
                  {parTotal}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "16px",
                      color: "var(--text)",
                      width: "70px",
                      textAlign: "center",
                    }}
                  >
                    {holesTotal}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color:
                        holesTotal - parTotal < 0
                          ? "var(--blue-bright)"
                          : holesTotal - parTotal > 0
                            ? "var(--red-bright)"
                            : "var(--text)",
                      minWidth: "28px",
                    }}
                  >
                    {holesTotal - parTotal === 0
                      ? "E"
                      : holesTotal - parTotal > 0
                        ? `+${holesTotal - parTotal}`
                        : holesTotal - parTotal}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Total shots + Handicap */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>
            Lyönnit yhteensä
            {showHoles && allHolesFilled && (
              <span style={{ ...optionalStyle, marginLeft: "6px", color: "var(--blue-bright)" }}>
                (väyliltä)
              </span>
            )}
          </label>
          <input
            type="number"
            value={totalShots}
            onChange={(e) => setTotalShots(e.target.value)}
            placeholder="72"
            min={1}
            max={299}
            style={{
              ...inputStyle,
              background: showHoles && allHolesFilled ? "var(--surface-3)" : "var(--surface-2)",
            }}
            readOnly={showHoles && allHolesFilled}
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
            Pisin lyönti (m) <span style={optionalStyle}>valinnainen</span>
          </label>
          <input
            type="number"
            value={longestDrive}
            onChange={(e) => setLongestDrive(e.target.value)}
            placeholder="240"
            min={1}
            step="0.1"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            Lähimpänä (cm) <span style={optionalStyle}>valinnainen</span>
          </label>
          <input
            type="number"
            value={closestToPin}
            onChange={(e) => setClosestToPin(e.target.value)}
            placeholder="150"
            min={1}
            step="0.1"
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
            background: "rgba(220,38,38,0.06)",
            border: "1px solid rgba(220,38,38,0.15)",
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
