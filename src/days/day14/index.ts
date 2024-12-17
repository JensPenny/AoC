import { ReadPuzzle, toLines, toMatrix } from "../../utils/puzzlereader";
import { partA, partB } from "./day14";
import { join } from "path";

main();
function main() {
    ReadPuzzle(join(__dirname, "input.txt"))
        .then((input) => {
            const start = performance.now();
            const result = partA(input, 101, 103);
            const timing = performance.now() - start;
            return { result, timing };
        })
        .then((data) =>
            console.log(`Day 14A: ${data.result} solved in  ${data.timing} ms`)
        );

    ReadPuzzle(join(__dirname, "input.txt"))
        .then((input) => {
            const start = performance.now();
            const result = partB(input, 101, 103);
            const timing = performance.now() - start;
            return { result, timing };
        })
        .then((data) =>
            console.log(`Day 14B: ${data.result} solved in  ${data.timing} ms`)
        );
}
