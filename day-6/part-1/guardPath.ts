const guardIcon = "^";
const emptyIcon = ".";
const obstacleIcon = "#";

type Direction = "up" | "down" | "left" | "right";

function assertUnreachable(x: never): never {
  throw new Error(`Unreachable code: ${x}`);
}

function printBoard(
  gameBoard: string[][],
  guardPosition: { x: number; y: number },
  visitedDistinctPositions: Set<string>
) {
  return "\n".concat(
    gameBoard
      .map((row, rowIndex) =>
        row
          .map((cell, columnIndex) => {
            if (rowIndex === guardPosition.y && columnIndex === guardPosition.x) {
              return guardIcon;
            }
            if (visitedDistinctPositions.has(`${columnIndex}-${rowIndex}`)) {
              return "X";
            }
            if (cell === guardIcon) {
              return emptyIcon;
            }
            return cell;
          })
          .join("")
      )
      .join("\n")
  );
}

export function guardPath(input: string) {
  const gameBoard = input.split("\n").map((line) => line.split(""));

  const initialGuardRow = gameBoard.findIndex((row) => row.includes(guardIcon));
  const initialGuardColumn = gameBoard[initialGuardRow].findIndex((cell) => cell === guardIcon);
  const guardPosition = { x: initialGuardColumn, y: initialGuardRow };

  let direction: Direction = "up";
  const visitedDistinctPositions = new Set<string>().add(`${guardPosition.x}-${guardPosition.y}`);

  function getNumberOfVisitedDistinctPositions() {
    return visitedDistinctPositions.size;
  }

  while (true) {
    // console.log({ guardPosition, direction, rows: gameBoard.length, columns: gameBoard[0].length });

    // is out of bounds

    switch (direction) {
      case "up":
        if (gameBoard[guardPosition.y - 1] === undefined) {
          console.log(getNumberOfVisitedDistinctPositions() + "\n");
          const text = new TextEncoder().encode(printBoard(gameBoard, guardPosition, visitedDistinctPositions));
          Deno.stdout.writeSync(text);
          return getNumberOfVisitedDistinctPositions();
        }
        if (gameBoard[guardPosition.y - 1][guardPosition.x] === obstacleIcon) {
          direction = "right";
          break;
        }
        guardPosition.y -= 1;

        break;
      case "right":
        if (gameBoard[guardPosition.y][guardPosition.x + 1] === undefined) {
          console.log(getNumberOfVisitedDistinctPositions() + "\n");
          const text = new TextEncoder().encode(printBoard(gameBoard, guardPosition, visitedDistinctPositions));
          Deno.stdout.writeSync(text);
          return getNumberOfVisitedDistinctPositions();
        }
        if (gameBoard[guardPosition.y][guardPosition.x + 1] === obstacleIcon) {
          direction = "down";
          break;
        }
        guardPosition.x += 1;

        break;
      case "down":
        if (gameBoard[guardPosition.y + 1] === undefined) {
          console.log(getNumberOfVisitedDistinctPositions() + "\n");
          const text = new TextEncoder().encode(printBoard(gameBoard, guardPosition, visitedDistinctPositions));
          Deno.stdout.writeSync(text);
          return getNumberOfVisitedDistinctPositions();
        }
        if (gameBoard[guardPosition.y + 1][guardPosition.x] === obstacleIcon) {
          direction = "left";
          break;
        }
        guardPosition.y += 1;

        break;

      case "left":
        if (gameBoard[guardPosition.y][guardPosition.x - 1] === undefined) {
          console.log(getNumberOfVisitedDistinctPositions() + "\n");
          const text = new TextEncoder().encode(printBoard(gameBoard, guardPosition, visitedDistinctPositions));
          Deno.stdout.writeSync(text);
          return getNumberOfVisitedDistinctPositions();
        }
        if (gameBoard[guardPosition.y][guardPosition.x - 1] === obstacleIcon) {
          direction = "up";
          break;
        }
        guardPosition.x -= 1;

        break;

      default:
        assertUnreachable(direction);
    }
    visitedDistinctPositions.add(`${guardPosition.x}-${guardPosition.y}`);
  }
}
