const orderRules = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`
  .split("\n")
  .reduce((acc, rule) => {
    const [firstNumber, secondNumber] = rule.split("|").map(Number);
    // @ts-expect-error
    return { ...acc, [firstNumber]: [...(acc[firstNumber] ?? []), secondNumber] };
  }, {});

console.log(orderRules);

export function isPagePrintedInCorrectOrder(pages: number[], orderRules: Record<number, number[]>): boolean {
  for (let i = 0; i < pages.length - 1; i++) {
    const currentPage = pages[i];
    const nextPage = pages[i + 1];

    if (orderRules[currentPage] && !orderRules[currentPage].includes(nextPage)) {
      return false;
    }
    if (orderRules[nextPage] && orderRules[nextPage].includes(currentPage)) {
      return false;
    }
  }
  return true;
}

export function parseOrderRules(orderRules: string): Record<number, number[]> {
  return orderRules.split("\n").reduce((acc, rule) => {
    const [firstNumber, secondNumber] = rule.split("|").map(Number);
    // @ts-expect-error
    return { ...acc, [firstNumber]: [...(acc[firstNumber] ?? []), secondNumber] };
  }, {});
}

export function getWronglyOrderedPages(allPages: number[][], orderRules: string) {
  const parsedOrderRules = parseOrderRules(orderRules);

  return allPages.filter((page) => !isPagePrintedInCorrectOrder(page, parsedOrderRules));
}

export function fixWronglyOrderedPages(pages: number[], orderRules: string) {
  const parsedOrderRules = parseOrderRules(orderRules);

  return pages.toSorted((a, b) => {
    if (parsedOrderRules[a] && parsedOrderRules[a].includes(b)) {
      return -1;
    }
    return 1;
  });
}

export function getSumOfMiddleElementsInPages(allPages: number[][]) {
  return allPages.reduce((acc, page) => acc + page[Math.floor(page.length / 2)], 0);
}

export function getSumOfMiddleElementsInCorrectlyOrderedPages(allPages: number[][], orderRules: string) {
  const parsedOrderRules = parseOrderRules(orderRules);

  return getSumOfMiddleElementsInPages(allPages.filter((page) => isPagePrintedInCorrectOrder(page, parsedOrderRules)));
}
