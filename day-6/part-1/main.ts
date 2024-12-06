import { guardPath } from "./guardPath.ts";

async function loadReportsFromFile(filePath: string) {
  return await Deno.readTextFile(filePath);
}

async function main() {
  const input = await loadReportsFromFile("../input.txt");

  console.log(`Number of visited distinct positions: ${guardPath(input)}`);
}

main();
