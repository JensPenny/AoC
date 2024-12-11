import { ReadPuzzle, toLines, toMatrix } from "../../utils/puzzlereader";
import { partA, partB } from "./day10";
import { join } from "path";

main();
function main() {
    ReadPuzzle(join(__dirname, "input.txt"))
        .then(toMatrix)
        .then((input) => {
            const start = performance.now();
            const result = partA(input);
            const timing = performance.now() - start;
            return { result, timing };
        })
        .then((data) =>
            console.log(`Day 10A: ${data.result} solved in  ${data.timing} ms`)
        );

    ReadPuzzle(join(__dirname, "input.txt"))
        .then(toMatrix)
        .then((input) => {
            const start = performance.now();
            const result = partB(input);
            const timing = performance.now() - start;
            return { result, timing };
        })
        .then((data) =>
            console.log(`Day 10B: ${data.result} solved in  ${data.timing} ms`)
        );
}
