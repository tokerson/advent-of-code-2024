import { assertEquals } from "jsr:@std/assert";
import { getMulResult } from "./getMulResult.ts";

const testInput = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

Deno.test(`getMulResult should return 48 for the input: ${testInput}`, () => {
  assertEquals(getMulResult(testInput), 48);
});
