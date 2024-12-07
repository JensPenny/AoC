import { ReadPuzzle, toMatrix } from "../../utils/puzzlereader";
import { partA, partB } from "./day6";
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
            console.log(`Day 6A: ${data.result} solved in  ${data.timing} ms`)
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
            console.log(`Day 6B: ${data.result} solved in  ${data.timing} ms`)
        );
}
