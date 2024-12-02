type Level = number;
type Report = Level[];

export function isReportSafe(report: Report) {
  let mode: "asc" | "desc" | undefined = undefined;

  for (let i = 0; i < report.length - 1; i++) {
    const differenceBetweenAdjacent = report[i] - report[i + 1];
    const currentMode = differenceBetweenAdjacent > 0 ? "desc" : "asc";
    if (!mode) {
      mode = currentMode;
    }
    if (mode !== currentMode) {
      return false;
    }

    const absoluteDifference = Math.abs(differenceBetweenAdjacent);
    if (absoluteDifference < 1) return false;
    if (absoluteDifference > 3) return false;
  }

  return true;
}
