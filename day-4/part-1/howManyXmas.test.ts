import { assertEquals } from "jsr:@std/assert";
import { howManyXmas } from "./howManyXmas.ts";

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const expectedNumberOfXmas = 18;

Deno.test(`howManyXmas should return ${expectedNumberOfXmas} for the input: ${testInput}`, () => {
  assertEquals(howManyXmas(testInput), expectedNumberOfXmas);
});
