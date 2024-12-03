import { assertEquals } from "jsr:@std/assert";
import { getMulResult } from "./getMulResult.ts";

const testInput = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

Deno.test(`getMulResult should return 161 for the input: ${testInput}`, () => {
  assertEquals(getMulResult(testInput), 161);
});
