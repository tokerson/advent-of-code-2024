type Level = number;
type Report = Level[];

export function isReportSafe(report: Report, allowedNumberOfBadLevels = 1): boolean {
  if (allowedNumberOfBadLevels < 0) return false;

  const reportOfDifferences = report.reduce<Report>((acc, currentLevel, currentIndex) => {
    if (currentIndex === report.length - 1) {
      return acc;
    }
    return [...acc, currentLevel - report[currentIndex + 1]];
  }, []);

  let mode: "asc" | "desc" | undefined = undefined;

  if (allowedNumberOfBadLevels === 0) {
    console.log("checking subreport", report);
  }
  for (let i = 0; i < reportOfDifferences.length; i++) {
    const absoluteDifference = Math.abs(reportOfDifferences[i]);
    const currentMode = reportOfDifferences[i] > 0 ? "asc" : "desc";

    if (!mode) {
      mode = currentMode;
    }

    if (absoluteDifference < 1 || absoluteDifference > 3 || mode !== currentMode) {
      console.log("bad report", report, i);
      if (allowedNumberOfBadLevels === 0) {
        return false;
      }

      return (
        isReportSafe(
          report.filter((_, index) => index !== i - 1),
          allowedNumberOfBadLevels - 1
        ) ||
        isReportSafe(
          report.filter((_, index) => index !== i),
          allowedNumberOfBadLevels - 1
        ) ||
        isReportSafe(
          report.filter((_, index) => index !== i + 1),
          allowedNumberOfBadLevels - 1
        )
      );
    }
  }

  return true;
}
