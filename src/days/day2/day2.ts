import { ReadPuzzle, toLines } from "../../utils/puzzlereader";
import { join } from "path";

//console.log(partA(test.split("\n")));
//console.log(partB(test.split("\n")));
main();

function main() {
    ReadPuzzle(join(__dirname, "input.txt"))
        .then(toLines)
        .then(partA)
        .then((res) => console.log("Day 2A:", res));

    ReadPuzzle(join(__dirname, "input.txt"))
        .then(toLines)
        .then(partB)
        .then((res) => console.log("Day 2B:", res));
}

type dir = "asc" | "desc" | "none";
function partA(input: string[]): number {
    let parsed = input.map((line) =>
        line.split(" ").map((single) => Number(single))
    );
    let amountSafe = calculateReactorSafe(parsed);
    return amountSafe;
}

function partB(input: string[]): number {
    let parsed = input.map((line) =>
        line.split(" ").map((single) => Number(single))
    );
    let amountSafe = calculateReactorSafe(parsed, true);
    return amountSafe;
}

function calculateReactorSafe(
    parsed: number[][],
    withDampener: boolean = false
) {
    let amountSafe = 0;
    for (const reports of parsed) {
        let direction: dir = "none";
        let prevIndex = 0;
        let isSafe = true;
        for (let index = 1; index < reports.length; index++) {
            const prev = reports[prevIndex];
            const current = reports[index];
            const distance = current - prev;

            // Check if we are still ascending or descending
            if (distance < 0) {
                if (direction == "asc") {
                    isSafe = false;
                    break;
                }
                direction = "desc";
            } else if (distance > 0) {
                if (direction == "desc") {
                    isSafe = false;
                    break;
                }
                direction = "asc";
            }

            // Check if we don't make too large of a jump
            if (Math.abs(distance) > 3) {
                isSafe = false;
                break;
            }

            // Check if we dont make too short of a jump
            if (current === prev) {
                isSafe = false;
                break;
            }

            prevIndex = index;
        }

        if (isSafe) {
            amountSafe++;
        } else {
            // if we do not find the correct range, we re-apply the algoritm without i-1, i or i+1. This should be enough
            if (withDampener) {
                console.log(
                    `found error near index ${prevIndex} for range ${reports}: safety status ${isSafe}`
                );
                const lowerBound = Math.max(0, prevIndex - 1);
                const upperBound = Math.min(reports.length - 1, prevIndex + 1);

                for (let index = lowerBound; index <= upperBound; index++) {
                    // Create a sub-runner for this slice without the current element
                    const copy = reports.toSpliced(index, 1);
                    const innerSafe = calculateReactorSafe([copy]);
                    if (innerSafe == 1) {
                        //Huzzah, we have a correct finding!
                        amountSafe++;
                        break;
                    }
                }
            }
        }
    }
    return amountSafe;
}

export { partA, partB };
