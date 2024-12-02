import { assertEquals } from "jsr:@std/assert";
import { isReportSafe } from "./isReportSafe.ts";

const testCases = [
  [[7, 6, 4, 2, 1], true],
  [[1, 2, 7, 8, 9], false],
  [[9, 7, 6, 2, 1], false],
  [[1, 3, 2, 4, 5], false],
  [[8, 6, 4, 4, 1], false],
  [[1, 3, 6, 7, 9], true],
] satisfies Array<[Array<number>, boolean]>;

testCases.forEach(([report, expectedResult]) => {
  Deno.test(`should return ${expectedResult} for the report: ${report.join(" ")}`, () => {
    assertEquals(isReportSafe(report), expectedResult);
  });
});
