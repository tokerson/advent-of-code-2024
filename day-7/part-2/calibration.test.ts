import { assertEquals } from "jsr:@std/assert";
import { getCalibrationResult } from "./calibration.ts";

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

Deno.test(`should return 11387 for the test input`, () => {
  assertEquals(getCalibrationResult(testInput), 11387);
});
