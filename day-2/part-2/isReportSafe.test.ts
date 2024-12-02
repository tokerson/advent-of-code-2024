import { assertEquals } from "jsr:@std/assert";
import { isReportSafe } from "./isReportSafe.ts";

const testCases = [
  [[7, 6, 4, 2, 1], true],
  [[1, 2, 7, 8, 9], false],
  [[9, 7, 6, 2, 1], false],
  [[1, 3, 2, 4, 5], true],
  [[8, 6, 4, 4, 1], true],
  [[1, 3, 6, 7, 9], true],
  [[1, 2, 1, 2, 1], false],
  [[1, 2, 3, 6, 1], true],
  [[1, 2, 3, 7, 1], false],
  [[3, 1, 5, 7, 8], true],
  [[3, -1, 5, 7, 8], true],
  [[0, -1, 5, 7, 8], false],
  [[88, 88, 84, 81, 78], false],
  [[64, 66, 65, 64, 62, 60, 59, 54], false],
  [[27, 24, 25, 26, 28, 31, 34], true],
] satisfies Array<[Array<number>, boolean]>;

testCases.forEach(([report, expectedResult]) => {
  Deno.test(`should return ${expectedResult} for the report: ${report.join(" ")}`, () => {
    assertEquals(isReportSafe(report), expectedResult);
  });
});
