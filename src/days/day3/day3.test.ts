import { describe, expect, test } from "bun:test";
import { partA, partB } from "../day3/day3";

describe("day 3", () => {
    test("A", () => {
        const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
        const result = partA(testInput);
        expect(result).toBe(161);
    });
    test("B", () => {
        const testInput = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
        const result = partB(testInput);
        expect(result).toBe(48);
    })
});
