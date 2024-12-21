import type { Direction, Point } from "../../utils/point";
import { printMatrix } from "../../utils/puzzlereader";
import { Vector2 } from "../../utils/vector2";

function partA(input: string): number {
    let puzzle = parseInput(input);
    let agent = puzzle.agent;
    let grid = puzzle.field;

    for (let move of puzzle.moves) {
        let dir: Direction | null = null;
        switch (move) {
            case ">":
                dir = "E";
                break;
            case "<":
                dir = "W";
                break;
            case "^":
                dir = "N";
                break;
            case "v":
                dir = "S";
                break;
            default:
                console.log(`no direction found! ${move}`);
                continue;
        }

        let nextPosition = agent.toDirection(dir!);
        // Quickcheck - if the next position is an open position, we just move there without issue
        if (grid[nextPosition.y][nextPosition.x] === ".") {
            // update the grid
            grid[nextPosition.y][nextPosition.x] = "@";
            grid[agent.y][agent.x] = ".";
            // update the position pointer
            agent = nextPosition;
        } else {
            let nextOpen = getFirstOpen(grid, nextPosition, dir!);
            if (nextOpen === null) {
                // We hit a wall with no empty spaces, do nothing
                continue;
            } else {
                // update the grid
                grid[nextPosition.y][nextPosition.x] = "@";
                grid[agent.y][agent.x] = ".";
                grid[nextOpen.y][nextOpen.x] = "O";
                agent = nextPosition;
            }
        }
    }

    console.log(`final grid state`);
    printMatrix(grid);
    let score = calculateGridScore(grid);
    return score;
}

// Get the first open location in a direction
// We return this first open direction
function getFirstOpen(
    grid: string[][],
    currentPosition: Vector2,
    direction: Direction
): Vector2 | null {
    let checkPosition = currentPosition;

    while (grid[checkPosition.y][checkPosition.x] !== "#") {
        if (grid[checkPosition.y][checkPosition.x] === ".") {
            console.log(`empty at ${(checkPosition.x + "-" + checkPosition.y)}`);
            return checkPosition;
        } else if (grid[checkPosition.y][checkPosition.x] === "O") {
            console.log(`box at ${(checkPosition.x + "-" + checkPosition.y)}`);
            checkPosition = checkPosition.toDirection(direction);
        }
    }

    console.log(`wall at ${(checkPosition.x, checkPosition.y)}`);
    return null;
}

function partB(input: string): number {
    return 0;
}

function calculateGridScore(grid: string[][]): number {
    let result = 0;
    grid.forEach((row, ri) => {
        row.forEach((col, ci) => {
            if (col === "O") {
                let pointScore = 100 * ri + ci;
                result = result + pointScore;
            }
        });
    });
    return result;
}

function parseInput(input: string): Puzzle {
    let splitted = input.split("\n\n");

    let field = parseGrid(splitted[0]);
    let moves = splitted[1].split("");

    let agentLocation: Vector2;
    field.forEach((row, rowindex) =>
        row.forEach((val, colindex) => {
            if (val === "@") {
                agentLocation = new Vector2(colindex, rowindex);
            }
        })
    );

    printMatrix(field);
    console.log(moves);
    console.log(JSON.stringify(agentLocation!));

    return { field: field, moves: moves, agent: agentLocation! };
}

function parseGrid(input: string): string[][] {
    let field = input.split("\n").map((line) => line.split(""));
    return field;
}

type Puzzle = {
    field: string[][];
    moves: string[];
    agent: Vector2;
};

export { partA, partB };
