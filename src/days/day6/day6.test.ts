import { describe, test, expect } from "bun:test";
import { partA, partB } from "./day6";
import { toMatrix } from "../../utils/puzzlereader";

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

describe("Day 6", () => {
    test("part A", () => {
        const result = partA(toMatrix(testInput));
        expect(result).toBe(41);
    });

    test("Part B", () => {
         const result = partB(toMatrix(testInput));
         expect(result).toBe(6);
    });
});
