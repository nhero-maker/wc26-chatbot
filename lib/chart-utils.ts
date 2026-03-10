// SVG chart utility functions

export function scaleLinear(
  domain: [number, number],
  range: [number, number]
): (value: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const ratio = d1 === d0 ? 0 : (r1 - r0) / (d1 - d0);
  return (value: number) => r0 + (value - d0) * ratio;
}

export function pointsToPolyline(points: [number, number][]): string {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

export function pointsToPath(points: [number, number][]): string {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`)
    .join(" ");
}

export function arcPathD(
  cx: number,
  cy: number,
  peakX: number,
  peakY: number,
  endX: number,
  endY: number
): string {
  // Quadratic bezier arc from start through peak to end
  return `M${cx},${cy} Q${peakX},${peakY} ${endX},${endY}`;
}

// Chart color constants (matching CSS vars for use inside SVG)
export const COLORS = {
  blueMid: "#3f5b7b",
  blueBright: "#6b8db5",
  blueGlow: "rgba(63, 91, 123, 0.25)",
  blueLight: "#a1b5cb",
  goldBright: "#dbb878",
  goldGlow: "rgba(201, 169, 110, 0.2)",
  redBright: "#f87171",
  text: "#ccd0d8",
  textMuted: "#5a6e88",
  textDim: "#1e3050",
  surface: "#0b1120",
  surface2: "#101828",
  border: "#1a2945",
  grey: "#4e5c73",
  greyLight: "#6b7a94",
};

export function niceScale(min: number, max: number, ticks: number): number[] {
  const range = max - min || 1;
  const step = Math.ceil(range / ticks / 5) * 5;
  const start = Math.floor(min / step) * step;
  const result: number[] = [];
  for (let v = start; v <= max + step; v += step) {
    result.push(v);
  }
  return result;
}
