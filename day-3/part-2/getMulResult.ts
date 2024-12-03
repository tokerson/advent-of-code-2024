const stringStartingWithDontEndingWithDo = /don't\(\).*?do\(\)/g;
const stringStartingWithDont = /don't\(\).*/g;
const mulRegex = /mul\((-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\)/g;

function isPairOfNumbers(array: unknown): array is [number, number] {
  return (
    Array.isArray(array) && array.length === 2 && array.every((item) => !isNaN(Number(item)) && item.trim() !== "")
  );
}

export function getMulResult(input: string): number {
  const foundMulOperations = input
    .replaceAll("\n", "")
    .replaceAll(stringStartingWithDontEndingWithDo, "")
    .replaceAll(stringStartingWithDont, "")
    .match(mulRegex);

  if (!foundMulOperations) {
    return 0;
  }

  return foundMulOperations
    .map((operation) => operation.replaceAll(/mul\(|\)/g, "").split(","))
    .filter(isPairOfNumbers)
    .map((pair) => [Number(pair[0]), Number(pair[1])] as const)
    .reduce((sum, pair) => {
      return (sum += pair[0] * pair[1]);
    }, 0);
}
