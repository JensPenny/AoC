import { describe, test, expect } from "bun:test";
import { partA, partB } from "./day10";
import { toMatrix } from "../../utils/puzzlereader";

const smallTest = `0123
1234
8765
9876`;

const largeTest = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

describe("Day 9", () => {
    test("part A small", () => {
        const result = partA(toMatrix(smallTest));
        expect(result).toBe(1);
    });
    test("part A large", () => {
        const result = partA(toMatrix(largeTest));
        expect(result).toBe(36);
    });
   
    test("part B", () => {
        const result = partB(toMatrix(largeTest));
        expect(result).toBe(81);
    });     
});