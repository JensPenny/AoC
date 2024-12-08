import { describe, test, expect } from "bun:test";
import { partA, partB } from "./day7";
import { toLines } from "../../utils/puzzlereader";

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

describe("Day 7", () => {
    test("part A", () => {
        const result = partA(toLines(testInput));
        expect(result).toBe(3749);
    });

    test("Part B", () => {
         const result = partB(toLines(testInput));
         expect(result).toBe(11387);
    });

    test("impossible case that should fail", () => {
        const impossibleInput = "525: 5 2";
        const result = partB(toLines(impossibleInput));
        expect(result).toBe(0);  // Should return 0 as this equation is impossible
    });

    test("straightforward fail", () => {
        const input = "12: 4 5";
        const result = partB(toLines(input));
        expect(result).toBe(0);  // Should return 0 as this equation is impossible
    });

    test("complicated success", () => {
        const input = "39296223432: 7 859 2 43 10 5 84 32 2";
        const result = partB(toLines(input));
        expect(result).toBe(0);  // Should return 0 as this equation is impossible
    });

    test("early fail", () => {
        const input = "100: 50 50 2";
        const result = partB(toLines(input));
        expect(result).toBe(0);
    })
});
