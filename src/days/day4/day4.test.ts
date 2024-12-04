import { describe, expect, test } from "bun:test";
import { partA, partB } from "./day4";
import { toMatrix } from "../../utils/puzzlereader";

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

describe("Day 4", () => {
    test("part A", () => {
        const result = partA(toMatrix(testInput));
        expect(result).toBe(18); 
    });

    test("Part B", () => {
        const result = partB(toMatrix(testInput));
        expect(result).toBe(9);
    })
});