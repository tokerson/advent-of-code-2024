import {
  fixWronglyOrderedPages,
  getWronglyOrderedPages,
  getSumOfMiddleElementsInPages,
} from "./isPagePrintedInCorrectOrder.ts";

async function loadReportsFromFile(filePath: string) {
  return await Deno.readTextFile(filePath);
}

async function main() {
  const input = await loadReportsFromFile("../input.txt");

  const [orderRules, pages] = input.split("\n\n");

  const parsedPages = pages.split("\n").map((line) => line.split(",").map(Number));

  const sumOfMiddleElementsInFixedPages = getSumOfMiddleElementsInPages(
    getWronglyOrderedPages(parsedPages, orderRules).map((page) => fixWronglyOrderedPages(page, orderRules))
  );
  console.log(`Sum of middle elements in fixed pages: ${sumOfMiddleElementsInFixedPages}`);
}

main();
