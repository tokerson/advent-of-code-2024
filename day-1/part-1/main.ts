async function loadInputFromFile(filePath: string) {
  const reports = await Deno.readTextFile(filePath);
  return reports.split("\n").map((line) => line.split(" ").filter(Boolean).map(Number));
}

async function main() {
  const numbers = await loadInputFromFile("./input.txt");
  const leftSideNumbers: number[] = [];
  const rightSideNumbers: number[] = [];

  numbers.forEach(([firstNumber, secondNumber]) => {
    leftSideNumbers.push(firstNumber);
    rightSideNumbers.push(secondNumber);
  });

  leftSideNumbers.sort((a, b) => a - b);
  rightSideNumbers.sort((a, b) => a - b);

  let differences = 0;
  for (let i = 0; i < leftSideNumbers.length; i++) {
    differences += Math.abs(leftSideNumbers[i] - rightSideNumbers[i]);
  }

  console.log("Sum of differences", differences);
}

main();
