import { ReadPuzzle, toMatrix } from "../../utils/puzzlereader";
import { partA, partB } from "./day5";
import { join } from "path";

main();
function main() {
    ReadPuzzle(join(__dirname, "input.txt"))
        .then((input) => {
            const start = performance.now();
            const result = partA(input);
            const timing = performance.now() - start;
            return { result, timing };
        })
        .then((data) => console.log(`Day 5A: ${data.result} solved in  ${data.timing} ms`));

    ReadPuzzle(join(__dirname, "input.txt"))
    .then((input) => {
        const start = performance.now();
        const result = partB(input);
        const timing = performance.now() - start;
        return { result, timing };
    })
    .then((data) => console.log(`Day 5B: ${data.result} solved in  ${data.timing} ms`));
}
