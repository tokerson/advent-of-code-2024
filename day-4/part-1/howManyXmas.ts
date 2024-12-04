export function howManyXmas(input: string): number {
  const matrixOfLetters: string[][] = input.split("\n").map((line) => line.split(""));
  const wordToSearch = "XMAS";
  let numberOfXmas = 0;
  for (let i = 0; i < matrixOfLetters.length; i++) {
    for (let j = 0; j < matrixOfLetters[i].length; j++) {
      if (matrixOfLetters[i][j] === wordToSearch[0]) {
        if (j >= wordToSearch.length - 1) {
          // search to the left
          let candidateWord = wordToSearch[0];
          for (let k = 1; k < wordToSearch.length; k++) {
            candidateWord = candidateWord.concat(matrixOfLetters[i][j - k]);
          }
          if (candidateWord === wordToSearch) {
            numberOfXmas++;
          }
        }
        if (j <= matrixOfLetters[i].length - wordToSearch.length) {
          // search to the right
          let candidateWord = wordToSearch[0];
          for (let k = 1; k < wordToSearch.length; k++) {
            candidateWord = candidateWord.concat(matrixOfLetters[i][j + k]);
          }
          if (candidateWord === wordToSearch) {
            numberOfXmas++;
          }
        }
        if (i <= matrixOfLetters.length - wordToSearch.length) {
          // search to the bottom
          let candidateWord = wordToSearch[0];
          for (let k = 1; k < wordToSearch.length; k++) {
            candidateWord = candidateWord.concat(matrixOfLetters[i + k][j]);
          }
          if (candidateWord === wordToSearch) {
            numberOfXmas++;
          }
        }
        if (i >= wordToSearch.length - 1) {
          // search to the top
          let candidateWord = wordToSearch[0];
          for (let k = 1; k < wordToSearch.length; k++) {
            candidateWord = candidateWord.concat(matrixOfLetters[i - k][j]);
          }
          if (candidateWord === wordToSearch) {
            numberOfXmas++;
          }
        }

        // and diagonals
        if (j >= wordToSearch.length - 1 && i <= matrixOfLetters.length - wordToSearch.length) {
          // search to the left bottom diagonal
          let candidateWord = wordToSearch[0];
          for (let k = 1; k < wordToSearch.length; k++) {
            candidateWord = candidateWord.concat(matrixOfLetters[i + k][j - k]);
          }
          if (candidateWord === wordToSearch) {
            numberOfXmas++;
          }
        }
        if (j <= matrixOfLetters[i].length - wordToSearch.length && i <= matrixOfLetters.length - wordToSearch.length) {
          // search to the right bottom diagonal
          let candidateWord = wordToSearch[0];
          for (let k = 1; k < wordToSearch.length; k++) {
            candidateWord = candidateWord.concat(matrixOfLetters[i + k][j + k]);
          }
          if (candidateWord === wordToSearch) {
            numberOfXmas++;
          }
        }
        if (j >= wordToSearch.length - 1 && i >= wordToSearch.length - 1) {
          // search to the left top diagonal
          let candidateWord = wordToSearch[0];
          for (let k = 1; k < wordToSearch.length; k++) {
            candidateWord = candidateWord.concat(matrixOfLetters[i - k][j - k]);
          }
          if (candidateWord === wordToSearch) {
            numberOfXmas++;
          }
        }
        if (j <= matrixOfLetters[i].length - wordToSearch.length && i >= wordToSearch.length - 1) {
          // search to the right top diagonal
          let candidateWord = wordToSearch[0];
          for (let k = 1; k < wordToSearch.length; k++) {
            candidateWord = candidateWord.concat(matrixOfLetters[i - k][j + k]);
          }
          if (candidateWord === wordToSearch) {
            numberOfXmas++;
          }
        }
      }
    }
  }

  return numberOfXmas;
}
