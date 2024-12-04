function searchForWordDiagonally(
  matrixOfLetters: string[][],
  wordToSearch: string,
  startingPoint: { x: number; y: number },
  direction: "left-bottom" | "left-top" | "right-bottom" | "right-top"
) {
  const right = direction.includes("right") ? 1 : -1;
  const bottom = direction.includes("bottom") ? 1 : -1;

  let candidateWord = wordToSearch[0];
  for (let k = 1; k < wordToSearch.length; k++) {
    candidateWord = candidateWord.concat(matrixOfLetters[startingPoint.y + bottom * k][startingPoint.x + right * k]);
  }
  if (candidateWord === wordToSearch) {
    return true;
  }

  return false;
}

export function howManyXmas(input: string): number {
  const matrixOfLetters: string[][] = input.split("\n").map((line) => line.split(""));
  const wordToSearch = "MAS";
  const coordinatesOfFoundALettersInMas = matrixOfLetters.map((line) => line.map((_) => 0));

  for (let i = 0; i < matrixOfLetters.length; i++) {
    for (let j = 0; j < matrixOfLetters[i].length; j++) {
      if (matrixOfLetters[i][j] === wordToSearch[0]) {
        const shouldSearchLeft = j >= wordToSearch.length - 1;
        const shouldSearchRight = j <= matrixOfLetters[i].length - wordToSearch.length;
        const shouldSearchBottom = i <= matrixOfLetters.length - wordToSearch.length;
        const shouldSearchTop = i >= wordToSearch.length - 1;

        if (shouldSearchRight && shouldSearchBottom) {
          // search to the right bottom diagonal
          if (searchForWordDiagonally(matrixOfLetters, wordToSearch, { x: j, y: i }, "right-bottom")) {
            coordinatesOfFoundALettersInMas[i + 1][j + 1] += 1;
          }
        }
        if (shouldSearchLeft && shouldSearchBottom) {
          // search to the left bottom diagonal
          if (searchForWordDiagonally(matrixOfLetters, wordToSearch, { x: j, y: i }, "left-bottom")) {
            coordinatesOfFoundALettersInMas[i + 1][j - 1] += 1;
          }
        }
        if (shouldSearchLeft && shouldSearchTop) {
          // search to the left top diagonal
          if (searchForWordDiagonally(matrixOfLetters, wordToSearch, { x: j, y: i }, "left-top")) {
            coordinatesOfFoundALettersInMas[i - 1][j - 1] += 1;
          }
        }
        if (shouldSearchRight && shouldSearchTop) {
          // search to the right top diagonal
          if (searchForWordDiagonally(matrixOfLetters, wordToSearch, { x: j, y: i }, "right-top")) {
            coordinatesOfFoundALettersInMas[i - 1][j + 1] += 1;
          }
        }
      }
    }
  }

  return coordinatesOfFoundALettersInMas.reduce(
    (acc, curr) => acc + curr.filter((numberOfAs) => numberOfAs === 2).length,
    0
  );
}
