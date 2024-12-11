import { describe, test, expect } from "bun:test";
import { partA, partB } from "./day9";
import { toLines, toMatrix } from "../../utils/puzzlereader";

const testInput = `23331331214141314022`;

describe("Day 9", () => {
    test("part A", () => {
        const result = partA(testInput);
        expect(result).toBe(1928);
    });
    test("part B", () => {
        const result = partB(testInput);
        expect(result).toBe(2858);
    });

    test("B1", () => {
        const result = partB("673253833464635054191677274350925861527651788483");
        expect(result).toBe(149706);
    });
    test("B2", () => {
        const result = partB("23222120202525282820202020272722212121");
        expect(result).toBe(7705);
    });
    test("B3", () => {
        const result = partB("22222228282828222222282829212324252627282920");
        expect(result).toBe(9447);
    });
    test("B4", () => {
        const result = partB("48274728818");
        expect(result).toBe(1752);
    });
});
