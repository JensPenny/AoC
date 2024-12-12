import { ReadPuzzle, toLines, toMatrix } from "../../utils/puzzlereader";
import { partA, partB } from "./day11";
import { join } from "path";

main();
function main() {
    ReadPuzzle(join(__dirname, "input.txt"))
        .then((input) => {
            const start = performance.now();
            const result = partA(input, 25);
            const timing = performance.now() - start;
            return { result, timing };
        })
        .then((data) =>
            console.log(`Day 11A: ${data.result} solved in  ${data.timing} ms`)
        );

    ReadPuzzle(join(__dirname, "input.txt"))
        .then((input) => {
            const start = performance.now();
            const result = partA(input, 75);
            const timing = performance.now() - start;
            return { result, timing };
        })
        .then((data) =>
            console.log(`Day 11B: ${data.result} solved in  ${data.timing} ms`)
        );
}
