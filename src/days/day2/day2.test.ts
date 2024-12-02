import { describe, expect, test } from "bun:test";
import { partA, partB } from "./day2";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe("Day 2", () => {
    test("Part A should handle test input correctly", () => {
        const input = testInput.split("\n");
        const result = partA(input);
        expect(result).toBe(2); // Two sequences should be safe: "7 6 4 2 1" and "9 7 6 2 1"
    });

    test("Part B should handle test input with dampener", () => {
        const input = testInput.split("\n");
        const result = partB(input);
        expect(result).toBe(4); // With dampener=1, more sequences should be considered safe
    });

    test("part B - specific input", () => {
        const input = "1 4 3 4 5".split("\n");
        const result = partB(input);
        expect(result).toBe(1); // Should work if we remove the '4' value
    });

    test("part B - remove earlier input", () => {
        const input = "89 92 95 93 94 97 98".split("\n");
        const result = partB(input);
        expect(result).toBe(1); // If we remove the 95 value, this should work
    });
});
