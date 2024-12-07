const operators = ["+", "*"] as const;

type Operator = (typeof operators)[number];

function getCanBeCalculated(testValue: number, numbers: number[]): boolean {
  const allPermutations: string[] = [];
  const operatorPositions = numbers.length - 1;

  for (let i = 0; i < Math.pow(operators.length, operatorPositions); i++) {
    const currentOperators: Operator[] = [];
    let num = i;

    for (let j = 0; j < operatorPositions; j++) {
      currentOperators.push(operators[num % operators.length]);
      num = Math.floor(num / operators.length);
    }

    let expression = numbers[0].toString();
    for (let j = 1; j < numbers.length; j++) {
      expression += currentOperators[j - 1] + numbers[j];
    }

    allPermutations.push(expression);
  }

  for (const expression of allPermutations) {
    let result = 0;
    const tokens = expression.match(/\d+|[+*]/g) || [];
    result = Number(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const num = Number(tokens[i + 1]);

      if (operator === "+") {
        result += num;
      } else if (operator === "*") {
        result *= num;
      }
    }

    if (result === testValue) {
      return true;
    }
  }

  return false;
}

export function getCalibrationResult(input: string): number {
  const equations = input.split("\n").reduce((acc, current) => {
    const [testValue, numbers] = current.split(": ");
    return {
      ...acc,
      [testValue]: numbers.split(" ").map(Number),
    };
  }, {});

  let result = 0;

  Object.entries(equations).forEach(([testValue, numbers]) => {
    const canBeCalculated = getCanBeCalculated(Number(testValue), numbers as number[]);
    if (canBeCalculated) {
      result += Number(testValue);
    }
  });

  return result;
}
