import {
    createPoint,
    Directions,
    type Point,
    type Direction,
} from "../../utils/point";

function partA(input: string[][]): number {
    let parsed = parseInput(input);
    let result = solveA(parsed);
    return result.moveCount;
}

function partB(input: string[][]): number {
    const parsed = parseInput(input);
    let loopCount = 0;

    // Try placing an obstruction at each empty position
    for (let row = 0; row < parsed.maxLength; row++) {
        for (let col = 0; col < parsed.maxHeight; col++) {
            // Skip if this is not an empty space or if it's the guard's starting position
            if (
                parsed.originalInput[row][col] !== "." ||
                (row == parsed.guard.pos.row && col == parsed.guard.pos.col)
            ) {
                continue;
            }

            // Create a copy of the grid with a new obstruction
            const testGrid = parsed.originalInput.map((row) => [...row]);
            testGrid[row][col] = "#";

            // Test if this creates a loop
            if (
                testLooping({
                    ...parsed,
                    originalInput: testGrid,
                })
            ) {
                loopCount++;
            }
        }
    }

    return loopCount;
}

function testLooping(parsed: Puzzle): boolean {
    const guard: Guard = {...parsed.guard};
    //const guard: Guard = {direction: parsed.guard.direction, pos: parsed.guard.pos}; 
    const visited = new Set<string>();

    while (true) {
        //const guardJson = JSON.stringify(guard); //takes about 60 seconds to finish with stringify
        const guardJson = `${guard.direction}-${guard.pos.row}-${guard.pos.col}` // Takes about 15 seconds to finish
        // If we've seen this state before, we found a loop
        if (visited.has(guardJson)) {
            return true;
        }

        visited.add(guardJson);

        // Calculate next position
        const nextPos = guard.pos.toDirection(guard.direction);

        // If we hit bounds, no loop
        if (!nextPos.inBounds(parsed.maxLength, parsed.maxHeight)) {
            return false;
        }

        if (parsed.originalInput[nextPos.row][nextPos.col] === "#") {
            guard.direction =
                Directions[
                    (Directions.indexOf(guard.direction) + 2) %
                        Directions.length
                ];
        } else {
            guard.pos = nextPos;
        }
    }
}

type Puzzle = {
    guard: Guard;
    obstacles: Point[];
    maxLength: number;
    maxHeight: number;
    originalInput: string[][];
};

type Guard = {
    direction: Direction;
    pos: Point;
};

function solveA(parsed: Puzzle): { moveCount: number; moves: string[] } {
    const grid = parsed.originalInput;
    const guard = parsed.guard;

    const guardPassedJson: string[] = [];

    let steps = 0;
    // Initially flag the guard position as traversed
    while (guard.pos.inBounds(parsed.maxLength, parsed.maxHeight)) {
        grid[guard.pos.row][guard.pos.col] = "0";

        // Add the guard to a list of guards that we traversed. We can then (probably) always delete the last guard to emulate a loop.
        // There are some side-effects that are possible but we will handle these later I guess.
        // An obstacle should not be in a position that is earlier in the guard position chain
        let nextPos = guard.pos.toDirection(guard.direction);
        if (!nextPos.inBounds(parsed.maxLength, parsed.maxHeight)) {
            break;
        }
        guardPassedJson.push(
            JSON.stringify({
                direction: guard.direction,
                pos: nextPos,
            } as Guard)
        );
        let nextElement = grid[nextPos.row][nextPos.col];
        if (nextElement == "#") {
            guard.direction =
                Directions[
                    (Directions.indexOf(guard.direction) + 2) %
                        Directions.length
                ];
        } else {
            guard.pos = nextPos;
        }

        steps++;
    }

    let result = 0;
    for (let row = 0; row < grid.length; row++) {
        const currentRow = grid[row];
        for (let col = 0; col < currentRow.length; col++) {
            const element = currentRow[col];
            if (element == "0") {
                result++;
            }
        }
    }
    return { moveCount: result, moves: guardPassedJson };
}

// We receive the basic matrix as defined in the initial issue.
// We extract the guard position and the obstacles. This should have to be enough to do our calculations
function parseInput(input: string[][]): Puzzle {
    console.log(input);
    let obstacles: Point[] = [];
    let guard: Guard = { direction: Directions[0], pos: createPoint(-1, -1) }; //createPoint(-1, -1);
    let maxLength = input.length;
    let maxHeight = input[0].length;

    for (let row = 0; row < input.length; row++) {
        const currentRow = input[row];
        for (let col = 0; col < currentRow.length; col++) {
            const element = currentRow[col];
            if (element == "^") {
                guard.pos = createPoint(row, col);
            }
            if (element == "#") {
                obstacles.push(createPoint(row, col));
            }
        }
    }

    console.log(`Created guard at ${JSON.stringify(guard)}`);

    return { guard, obstacles, maxLength, maxHeight, originalInput: input };
}

export { partA, partB };
