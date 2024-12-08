import { ReadPuzzle, toLines, toMatrix } from "../../utils/puzzlereader";
import { partA, partB } from "./day7";
import { join } from "path";

main();
function main() {
    ReadPuzzle(join(__dirname, "input.txt"))
        .then(toLines)
        .then((input) => {
            const start = performance.now();
            const result = partA(input);
            const timing = performance.now() - start;
            return { result, timing };
        })
        .then((data) =>
            console.log(`Day 7A: ${data.result} solved in  ${data.timing} ms`)
        );

    ReadPuzzle(join(__dirname, "input.txt"))
        .then(toLines)
        .then((input) => {
            const start = performance.now();
            const result = partB(input);
            const timing = performance.now() - start;
            return { result, timing };
        })
        .then((data) =>
            console.log(`Day 7B: ${data.result} solved in  ${data.timing} ms`)
        );
}
