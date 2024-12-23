import { describe, test, expect } from "bun:test";
import { partA, partB } from "./day8";
import { toLines, toMatrix } from "../../utils/puzzlereader";

const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

describe("Day 8", () => {
    test("part A", () => {
        const result = partA(toMatrix(testInput));
        expect(result).toBe(14);
    });
    test("part B", () => {
        const result = partB(toMatrix(testInput));
        expect(result).toBe(34);
    });
});
