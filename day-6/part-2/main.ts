import { getCoordinatesOfPossibleObstacles } from "./guardPath.ts";

async function loadReportsFromFile(filePath: string) {
  return await Deno.readTextFile(filePath);
}

async function main() {
  const input = await loadReportsFromFile("../input.txt");

  console.log(`Number of possible obstacles: ${getCoordinatesOfPossibleObstacles(input)}`);
}

main();
