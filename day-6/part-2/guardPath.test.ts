import { assertEquals } from "jsr:@std/assert";
import { getCoordinatesOfPossibleObstacles } from "./guardPath.ts";

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

Deno.test(`getCoordinatesOfPossibleObstacles should return 6 for the test map`, () => {
  assertEquals(getCoordinatesOfPossibleObstacles(testMap), 6);
});