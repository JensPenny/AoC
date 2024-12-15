import { describe, test, expect } from "bun:test";
import { partA, partB } from "./day12";
import { toMatrix } from "../../utils/puzzlereader";

const testInput = `AAAA
BBCD
BBCC
EEEC`;

const oxoInput = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`

const largeInput = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

describe("Day 12", () => {
    test("part A small", () => {
        const result = partA(toMatrix(testInput));
        expect(result).toBe(140);
    });
    test("part A oxo", () => {
        const result = partA(toMatrix(oxoInput));
        expect(result).toBe(772);
    });
    test("part A large", () => {
        const result = partA(toMatrix(largeInput));
        expect(result).toBe(1930);
    });
    
    test("part B small", () => {
        const result = partB(toMatrix(testInput));
        expect(result).toBe(80);
    });
    test("part B oxo", () => {
        const result = partB(toMatrix(oxoInput));
        expect(result).toBe(436);
    });
    test("part B large", () => {
        const result = partB(toMatrix(largeInput));
        expect(result).toBe(1206);
    });
    // test("part B", () => {
    //     const result = partB(toMatrix(largeTest));
    //     expect(result).toBe(81);
    // });     
});