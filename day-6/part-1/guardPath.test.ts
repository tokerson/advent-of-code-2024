import { assertEquals } from "jsr:@std/assert";
import { guardPath } from "./guardPath.ts";

const testMap = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

Deno.test(`guardPath should return 41 for the test map`, () => {
  assertEquals(guardPath(testMap), 41);
});

const testMap2 = `..........
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

Deno.test(`guardPath should return 7 for the test map`, () => {
  assertEquals(guardPath(testMap2), 7);
});

const testMap3 = `....#.....
..........
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

Deno.test(`guardPath should return 11 for the test map`, () => {
  assertEquals(guardPath(testMap3), 11);
});

const testMap4 = `....#.....
.........#
..........
..#.......
..........
..........
.#..^.....
........#.
#.........
......#...`;

Deno.test(`guardPath should return 27 for the test map`, () => {
  assertEquals(guardPath(testMap4), 27);
});
