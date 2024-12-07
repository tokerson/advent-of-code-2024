import { getCalibrationResult } from "./calibration.ts";

async function loadReportsFromFile(filePath: string) {
  return await Deno.readTextFile(filePath);
}

async function main() {
  const input = await loadReportsFromFile("../input.txt");

  console.log(`Result: ${getCalibrationResult(input.trim())}`); // 92148721834692
}

main();