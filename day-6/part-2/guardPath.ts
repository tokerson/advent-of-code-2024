const guardIcon = "^";
const emptyIcon = ".";
const obstacleIcon = "#";
const newObstacleIcon = "0";

type Direction = "up" | "down" | "left" | "right";

function assertUnreachable(x: never): never {
  throw new Error(`Unreachable code: ${x}`);
}

function printBoard(
  gameBoard: string[][],
  iconToDisplayPosition: { x: number; y: number },
  visitedDistinctPositions: Set<string>,
  iconToDisplay: string = guardIcon
) {
  return gameBoard
    .map((row, rowIndex) =>
      row
        .map((cell, columnIndex) => {
          if (rowIndex === iconToDisplayPosition.y && columnIndex === iconToDisplayPosition.x) {
            return iconToDisplay;
          }
          if (visitedDistinctPositions.has(`${columnIndex}-${rowIndex}`)) {
            return "X";
          }
          if (iconToDisplay === guardIcon && cell === guardIcon) {
            return emptyIcon;
          }
          return cell;
        })
        .join("")
    )
    .join("\n");
}

function guardPath(input: string) {
  const gameBoard = input.split("\n").map((line) => line.split(""));

  const initialGuardRow = gameBoard.findIndex((row) => row.includes(guardIcon));
  const initialGuardColumn = gameBoard[initialGuardRow].findIndex((cell) => cell === guardIcon);
  const guardPosition = { x: initialGuardColumn, y: initialGuardRow };

  let direction: Direction = "up";
  const visitedDistinctPositions = new Set<string>();

  function getNumberOfVisitedDistinctPositions() {
    return visitedDistinctPositions.size;
  }

  let isLooped = false;
  while (!isLooped) {
    // console.log({ guardPosition, direction, rows: gameBoard.length, columns: gameBoard[0].length });

    // is out of bounds
    const previousDirection = direction;

    switch (direction) {
      case "up":
        if (gameBoard[guardPosition.y - 1] === undefined) {
          // console.log(getNumberOfVisitedDistinctPositions() + "\n");
          // const text = new TextEncoder().encode(printBoard(gameBoard, guardPosition, visitedDistinctPositions));
          // Deno.stdout.writeSync(text);
          return false;
        }
        if (gameBoard[guardPosition.y - 1][guardPosition.x] === obstacleIcon) {
          direction = "right";
          break;
        }
        isLooped =
          visitedDistinctPositions.has(`${guardPosition.x}-${guardPosition.y}-${direction}`) &&
          visitedDistinctPositions.has(`${guardPosition.x}-${guardPosition.y - 1}-${direction}`);

        guardPosition.y -= 1;

        break;
      case "right":
        if (gameBoard[guardPosition.y][guardPosition.x + 1] === undefined) {
          // console.log(getNumberOfVisitedDistinctPositions() + "\n");
          // const text = new TextEncoder().encode(printBoard(gameBoard, guardPosition, visitedDistinctPositions));
          // Deno.stdout.writeSync(text);
          return false;
        }
        if (gameBoard[guardPosition.y][guardPosition.x + 1] === obstacleIcon) {
          direction = "down";

          break;
        }
        isLooped =
          visitedDistinctPositions.has(`${guardPosition.x}-${guardPosition.y}-${direction}`) &&
          visitedDistinctPositions.has(`${guardPosition.x + 1}-${guardPosition.y}-${direction}`);

        guardPosition.x += 1;

        break;
      case "down":
        if (gameBoard[guardPosition.y + 1] === undefined) {
          // console.log(getNumberOfVisitedDistinctPositions() + "\n");
          // const text = new TextEncoder().encode(printBoard(gameBoard, guardPosition, visitedDistinctPositions));
          // Deno.stdout.writeSync(text);
          return false;
        }
        if (gameBoard[guardPosition.y + 1][guardPosition.x] === obstacleIcon) {
          direction = "left";

          break;
        }
        isLooped =
          visitedDistinctPositions.has(`${guardPosition.x}-${guardPosition.y}-${direction}`) &&
          visitedDistinctPositions.has(`${guardPosition.x}-${guardPosition.y + 1}-${direction}`);

        guardPosition.y += 1;

        break;

      case "left":
        if (gameBoard[guardPosition.y][guardPosition.x - 1] === undefined) {
          // console.log(getNumberOfVisitedDistinctPositions() + "\n");
          // const text = new TextEncoder().encode(printBoard(gameBoard, guardPosition, visitedDistinctPositions));
          // Deno.stdout.writeSync(text);
          return false;
        }
        if (gameBoard[guardPosition.y][guardPosition.x - 1] === obstacleIcon) {
          direction = "up";

          break;
        }
        isLooped =
          visitedDistinctPositions.has(`${guardPosition.x}-${guardPosition.y}-${direction}`) &&
          visitedDistinctPositions.has(`${guardPosition.x - 1}-${guardPosition.y}-${direction}`);

        guardPosition.x -= 1;

        break;

      default:
        assertUnreachable(direction);
    }
    visitedDistinctPositions.add(`${guardPosition.x}-${guardPosition.y}-${direction}`);
  }
  return isLooped;
}

export function getCoordinatesOfPossibleObstacles(input: string) {
  const gameBoard: string[][] = input.split("\n").map((line) => line.split(""));
  let numberOfPossibleObstacles = 0;

  for (let y = 0; y < gameBoard.length; y++) {
    for (let x = 0; x < gameBoard[y].length; x++) {
      if (gameBoard[y][x] === emptyIcon) {
        // console.log("-------------");
        // console.log(printBoard(gameBoard, { x, y }, new Set(), newObstacleIcon));
        const isLooped = guardPath(printBoard(gameBoard, { x, y }, new Set(), obstacleIcon));
        // console.log({ isLooped });
        // console.log("-------------");
        if (isLooped) {
          numberOfPossibleObstacles++;
        }
        console.log(
          `Completed ${y * gameBoard[y].length + x + 1} / ${gameBoard.length * gameBoard[y].length} (${
            ((y * gameBoard[y].length + x + 1) / (gameBoard.length * gameBoard[y].length)) * 100
          }%)`
        );
      }
    }
  }

  return numberOfPossibleObstacles;
}
