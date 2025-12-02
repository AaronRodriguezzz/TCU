/**
 * Computes the total grade on a 1.0–5.0 scale, considering attendance, midterm, finals.
 * - presentCount, absentCount: counts of attended/absent classes
 * - midTerm, finals: scores 0-100
 * - weights: weights for attendance, midterm, finals
 */
export const computeTotalGrade = (
  presentCount,
  absentCount,
  midTerm,
  finals,
  weights = { attendance: 0.1, midTerm: 0.45, finals: 0.45 }
) => {
  const totalClasses = presentCount + absentCount;

  // If either exam is missing or zero, show processing

  if (midTerm === 0 || finals === 0) {
    return { total: "Processing", status: "Processing" };
  }

  // Attendance percentage
  const attendanceScore = totalClasses === 0 ? 100 : (presentCount / totalClasses) * 100;

  // Weighted score
  const weightedScore =
    attendanceScore * weights.attendance +
    (midTerm || 0) * weights.midTerm +
    (finals || 0) * weights.finals;

  // Convert weighted score to GWA scale
  let totalGWA;
  if (weightedScore >= 97) totalGWA = 1.0;
  else if (weightedScore >= 94) totalGWA = 1.25;
  else if (weightedScore >= 91) totalGWA = 1.5;
  else if (weightedScore >= 88) totalGWA = 1.75;
  else if (weightedScore >= 85) totalGWA = 2.0;
  else if (weightedScore >= 82) totalGWA = 2.25;
  else if (weightedScore >= 79) totalGWA = 2.5;
  else if (weightedScore >= 76) totalGWA = 2.75;
  else if (weightedScore >= 73) totalGWA = 3.0;
  else if (weightedScore >= 70) totalGWA = 3.25;
  else if (weightedScore >= 65) totalGWA = 3.5;
  else if (weightedScore >= 60) totalGWA = 4.0;
  else totalGWA = 5.0;

  const status = totalGWA <= 3.0 ? "Passed" : "Failed";

  return { total: totalGWA, status };
};
