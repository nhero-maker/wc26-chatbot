// Par values per hole (1-18) for each tournament course.
// Source: Winter Cup 2026 Excel scorecard data.

export const COURSE_PARS: Record<number, number[]> = {
  1: [4, 3, 4, 4, 5, 4, 3, 5, 4, 4, 4, 3, 5, 4, 4, 4, 3, 4], // Lofoten Links (par 72)
  2: [4, 4, 4, 3, 4, 4, 3, 5, 5, 4, 4, 5, 3, 4, 4, 4, 3, 5], // Marco Simone (par 72)
  3: [4, 3, 4, 4, 5, 4, 3, 5, 4, 4, 4, 3, 5, 4, 4, 4, 3, 4], // Evian Resort (par 72)
  4: [4, 3, 4, 4, 5, 4, 3, 5, 4, 4, 4, 3, 5, 4, 4, 4, 3, 4], // Real Club Valderrama (par 72)
  5: [4, 3, 4, 4, 5, 4, 3, 5, 4, 4, 4, 3, 5, 4, 4, 4, 3, 4], // St Andrews (par 72)
  6: [4, 3, 4, 4, 5, 4, 3, 5, 4, 4, 4, 3, 5, 4, 4, 4, 3, 4], // Grande Finale (par 72)
};

export const DEFAULT_PARS = [4, 3, 4, 4, 5, 4, 3, 5, 4, 4, 4, 3, 5, 4, 4, 4, 3, 4]; // par 72

export function getParsForCourse(courseId: number | undefined): number[] {
  if (!courseId) return DEFAULT_PARS;
  return COURSE_PARS[courseId] ?? DEFAULT_PARS;
}

export function totalPar(pars: number[]): number {
  return pars.reduce((sum, p) => sum + p, 0);
}
