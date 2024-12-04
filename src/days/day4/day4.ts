function partA(input: string[][]): number {
    const toFind: string[] = ["X", "M", "A", "S"];

    let total = 0;
    for (let row = 0; row < input.length; row++) {
        const currentRow = input[row];
        for (let col = 0; col < currentRow.length; col++) {
            //process.stdout.write(input[row][col] + " ");
            total += backtrack(input, new P(row, col), toFind, undefined);
        }
        //process.stdout.write("\n");
    }
    return total;
}

// The basic logic here is if we find a MAS sequence towards the SE from where we are
// together with a MAS sequence two parts further but towards the SW, we should be good
function partB(input: string[][]): number {
    const toFind1: string[] = ["M", "A", "S"];
    const toFind2: string[] = toFind1.toReversed();

    let total = 0;
    for (let row = 0; row < input.length; row++) {
        const currentRow = input[row];
        for (let col = 0; col < currentRow.length; col++) {
            let correctCount = 0;
            correctCount += backtrack(input, new P(row, col), toFind1, "SE");
            correctCount +=backtrack(input, new P(row, col), toFind2, "SE");

            correctCount += backtrack(input, new P(row, col + 2), toFind1, "SW");
            correctCount += backtrack(input, new P(row, col + 2), toFind2, "SW");

            if (correctCount == 2) {
                // we found a correct track in the two points, so we found our solution
                total++;
            }

            //process.stdout.write(input[row][col] + " ");
        }
        //process.stdout.write("\n");
    }
    return total;
}

interface Point {
    row: number;
    col: number;
    toDirection: (direction: string) => Point;
}

class P implements Point {
    row: number;
    col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    toDirection(direction: string): Point {
        switch (direction) {
            case "N":
                return new P(this.row - 1, this.col);
            case "NE":
                return new P(this.row - 1, this.col + 1);
            case "E":
                return new P(this.row, this.col + 1);
            case "SE":
                return new P(this.row + 1, this.col + 1);
            case "S":
                return new P(this.row + 1, this.col);
            case "SW":
                return new P(this.row + 1, this.col - 1);
            case "W":
                return new P(this.row, this.col - 1);
            case "NW":
                return new P(this.row - 1, this.col - 1);
            default:
                break;
        }
        return new P(this.row, this.col);
    }
}
const Directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;

function backtrack(
    input: string[][],
    currentPoint: Point,
    toFind: string[],
    currentDirection?: string
): number {
    if (toFind.length == 0) {
        return 1; // We successfully terminated our search! Huzzah
    }

    // Check if currentpoint is in bounds
    if (currentPoint.row < 0 || currentPoint.row >= input.length) {
        return 0;
    }
    if (
        currentPoint.col < 0 ||
        currentPoint.col >= input[currentPoint.row].length
    ) {
        return 0;
    }

    const currentCharacter = input[currentPoint.row][currentPoint.col];
    if (currentCharacter != toFind[0]) {
        return 0; // The current character in the point is not what we are looking for, so we stop looking
    }

    const leftToFind = toFind.slice(1);
    if (currentDirection) {
        // If we have a direction, we continue in this direction
        return backtrack(
            input,
            currentPoint.toDirection(currentDirection),
            leftToFind,
            currentDirection
        );
    } else {
        // Fan out in all possible directions and return all these results
        let result = 0;
        for (const direction of Directions) {
            result += backtrack(
                input,
                currentPoint.toDirection(direction),
                leftToFind,
                direction
            );
        }
        return result;
    }
}

export { partA, partB };
