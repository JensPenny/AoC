import { describe, test, expect } from "bun:test";
import { partA, partB } from "./day11";
import { toMatrix } from "../../utils/puzzlereader";

const smallTest = `0 1 10 99 999`;

const largeTest = `125 17`

describe("Day 11", () => {
    test("part A small", () => {
        const result = partA(smallTest, 1);
        expect(result).toBe(7);
    });
    test("part A large", () => {
        const result = partA(largeTest, 6);
        expect(result).toBe(22);
    });

    test("part A larger", () => {
        const result = partA(largeTest, 25);
        expect(result).toBe(55312);
    });
   
    // test("part B", () => {
    //     const result = partB(toMatrix(largeTest));
    //     expect(result).toBe(81);
    // });     
});