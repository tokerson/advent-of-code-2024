async function loadInputFromFile(filePath: string) {
  const reports = await Deno.readTextFile(filePath);
  return reports.split("\n").map((line) => line.split(" ").filter(Boolean).map(Number));
}

async function main() {
  const numbers = await loadInputFromFile("./input.txt");
  const leftSideNumbers: Record<number, number> = {};
  const rightSideNumbers: Record<number, number> = {};

  numbers.forEach(([firstNumber, secondNumber]) => {
    leftSideNumbers[firstNumber] = (leftSideNumbers[firstNumber] ?? 0) + 1;
    rightSideNumbers[secondNumber] = (rightSideNumbers[secondNumber] ?? 0) + 1;
  });

  let similarity = 0;
  Object.entries(leftSideNumbers).forEach(([number, numberOfOccurances]) => {
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    similarity += Number(number) * numberOfOccurances * (rightSideNumbers[number] ?? 0);
  });

  console.log("Sum of differences", similarity);
}

main();
