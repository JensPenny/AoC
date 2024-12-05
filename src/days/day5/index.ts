import { ReadPuzzle, toMatrix } from "../../utils/puzzlereader";
import { partA, partB } from "./day5";
import { join } from "path";

main();
function main() {
    ReadPuzzle(join(__dirname, "input.txt"))
        .then(toMatrix)
        .then(partA)
        .then((data) => console.log("Day 5A: ", data));

    ReadPuzzle(join(__dirname, "input.txt"))
        .then(toMatrix)
        .then(partB)
        .then((data) => console.log("Day 5B: ", data));
}
