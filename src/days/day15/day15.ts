import type { Direction, Point } from "../../utils/point";
import { printMatrix } from "../../utils/puzzlereader";
import { Vector2 } from "../../utils/vector2";

function partA(input: string): number {
    let puzzle = parseInput(input);

    for (let move of puzzle.moves){

    }
    return 0;
}

// Get the first open location in a direction
// We return this first open direction 
function getFirstOpen(grid: string[][], currentPosition: Vector2, direction: Direction): Vector2 | null {
    if (grid[currentPosition.y][currentPosition.x] === '.') {
       return currentPosition; 
    }

    return null;
}

function partB(input: string): number {
    return 0;
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
