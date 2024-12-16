import { invert } from "lodash";
import { JsxEmit } from "typescript";

function partA(input: string): number {
    let puzzles = parsePuzzle(input);

    let totalScore = 0;
    for (let puzzle of puzzles) {
        let { a, b } = solvePuzzle(puzzle);
        console.log(`- ${JSON.stringify(puzzle)} result: a:${a}, b:${b}`);
        if (Number.isInteger(a) && Number.isInteger(b)) {
            let score = a * 3 + b;
            totalScore += score;
        }
    }

    return totalScore;
}

function partB(input: string): number {
    const toAdd = 10_000_000_000_000;
    let puzzles = parsePuzzle(input);

    let totalScore = 0;
    for (let puzzle of puzzles) {
        puzzle.target.x = puzzle.target.x + toAdd;
        puzzle.target.y = puzzle.target.y + toAdd;
        let { a, b } = solvePuzzle(puzzle);
        console.log(`- ${JSON.stringify(puzzle)} result: a:${a}, b:${b}`);
        if (Number.isInteger(a) && Number.isInteger(b)) {
            let score = a * 3 + b;
            totalScore += score;
        }
    }

    return totalScore;    
}

// Please no extra dimension for part 2...
function solvePuzzle(input: Puzzle): { a: number; b: number } {
    // Create an equation for this
    let matrix: number[][] = [];
    matrix[0] = [];
    matrix[1] = [];
    matrix[0][0] = input.a.x;
    matrix[0][1] = input.a.y;
    matrix[1][0] = input.b.x;
    matrix[1][1] = input.b.y;

    let { inverted, determinant } = invertMatrix(matrix);

    // multiply this with the result vector
    let a =
        (inverted[0][0] / determinant) * input.target.x +
        (inverted[1][0] / determinant) * input.target.y;
    let b =
        (inverted[0][1] / determinant) * input.target.x +
        (inverted[1][1] / determinant) * input.target.y;
    a = Number(a.toFixed(2)); // floating point shenanigans. This will do for this case, but a precision of 7 would probably be better instead of a fixed decimal
    b = Number(b.toFixed(2));

    console.log(`solved: a: ${a}, b: ${b}`);

    return { a, b };
}

// Matrix
// [a, b]
// [c, d]
// Determinant = ad-bc
// Inverse matrix
// [d, -b]
// [-c, a]
function invertMatrix(input: number[][]): {
    determinant: number;
    inverted: number[][];
} {
    let result: number[][] = [];
    result[0] = [];
    result[1] = [];
    result[0][0] = input[1][1];
    result[1][1] = input[0][0];
    result[1][0] = -input[1][0];
    result[0][1] = -input[0][1];

    let determinant = input[0][0] * input[1][1] - input[0][1] * input[1][0];
    return { determinant: determinant, inverted: result };
}

function parsePuzzle(input: string): Puzzle[] {
    let result: Puzzle[] = [];

    let splittedPuzzles = input.split("\n\n");
    for (let stringPuzzle of splittedPuzzles) {
        let parts = stringPuzzle.split("\n");

        let a = stringToCoordinate(parts[0]);
        let b = stringToCoordinate(parts[1]);
        let target = stringToCoordinate(parts[2]);

        let puzzle = { a, b, target };
        result.push(puzzle);
    }

    return result;
}

function stringToCoordinate(input: string): Coordinate {
    input = input.replaceAll("X+", "");
    input = input.replaceAll("Y+", "");
    input = input.replaceAll("X=", "");
    input = input.replaceAll("Y=", "");
    let parts = input
        .split(":")[1]
        .split(",")
        .map((inp) => Number(inp));
    return { x: parts[0], y: parts[1] };
}

type Coordinate = {
    x: number;
    y: number;
};

type Puzzle = {
    a: Coordinate;
    b: Coordinate;
    target: Coordinate;
};

export { partA, partB };
