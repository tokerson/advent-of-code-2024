import { isReportSafe } from "./isReportSafe.ts";

async function loadReportsFromFile(filePath: string) {
  const reports = await Deno.readTextFile(filePath);
  return reports.split("\n").map((line) => line.split(" ").map(Number));
}

async function main() {
  const reports = await loadReportsFromFile("../reports.txt");

  let safeReports = 0;

  for (const report of reports) {
    const isSafe = isReportSafe(report);
    if (isSafe) {
      safeReports++;
    }
  }

  console.log(`Number of safe reports: ${safeReports}`);
}

main();
