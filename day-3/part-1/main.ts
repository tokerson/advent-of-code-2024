import { getMulResult } from "./getMulResult.ts";

async function loadReportsFromFile(filePath: string) {
  return await Deno.readTextFile(filePath);
}

async function main() {
  const input = await loadReportsFromFile("../input.txt");

  console.log(`Mul result: ${getMulResult(input)}`);
}

main();
