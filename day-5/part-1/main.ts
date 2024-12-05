import { getSumOfMiddleElementsInCorrectlyOrderedPages } from "./isPagePrintedInCorrectOrder.ts";

async function loadReportsFromFile(filePath: string) {
  return await Deno.readTextFile(filePath);
}

async function main() {
  const input = await loadReportsFromFile("../input.txt");

  const [orderRules, pages] = input.split("\n\n");

  const parsedPages = pages.split("\n").map((line) => line.split(",").map(Number));

  console.log(
    `Sum of middle elements in correctly ordered pages: ${getSumOfMiddleElementsInCorrectlyOrderedPages(
      parsedPages,
      orderRules
    )}`
  );
}

main();
