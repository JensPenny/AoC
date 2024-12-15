import { create } from "lodash";
import {
    createPoint,
    Directions,
    type Direction,
    type Point,
} from "../../utils/point";
import { printMatrix } from "../../utils/puzzlereader";

function partA(input: string[][]): number {
    // It's FLOOD FILL TIME!
    //printMatrix(input);
    //  let passed = 1; // Utility counter to calculate the amount of points that we have traversed
    let allResults: Point[][] = []; // A list of lists with the traversed points. This is not a matrix
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[0].length; col++) {
            // if (passed > 5) {
            //     break;
            // }
            // passed++;
            let traversed = fill(input, createPoint(row, col), input[row][col]);
            if (traversed.length !== 0) {
                allResults.push(traversed);
            }
        }
    }
    //console.log(`all traversed points: ${JSON.stringify(allResults)}`);
    //printMatrix(input);

    let result = 0;
    for (let index = 0; index < allResults.length; index++) {
        const area = allResults[index];
        let fences = calculateFences(area);
        result = result + fences * area.length;
    }
    return result;
}

// Calculate the fences for each point. We do 4 - the amount of neighbours in the result-list
const dirs = [Directions[0], Directions[2], Directions[4], Directions[6]];
function calculateFences(points: Point[]): number {
    let result = 0;
    for (let point of points) {
        for (let d of dirs) {
            let next = point.toDirection(d);
            if (
                points.findIndex(
                    (p) => p.row === next.row && p.col == next.col
                ) === -1
            ) {
                result++; //found a boundary!
            }
        }
    }

    console.log(
        `found ${result} as boundary score for points ${JSON.stringify(points)}`
    );
    return result;
}

function calculateStraightFences(points: Point[]): number {
    const pointSet = new Set(points.map((p) => `${p.row},${p.col}`));
    const visitedPointAndDir = new Set();
    34;
    let initialPoint: string;
    let initialDirection: Direction;

    let sections = 0;

    // Find next boundary point and track direction changes
    // There are two options here:
    // There is 1 boundary point: this means that the node is on an edge, and it has 1 boundary for the edge and two for each side
    // There are 2 boundaries. The point is an corner (2 boundaries that start and need to be removed) or it is a long part
    // Corners feel like they are special, while straight lines are as expected

    // The base idea could be that we ONLY count direction changes.
    // A direction change of 1 is 1 extra fence
    // An edge node will change directions twice.
    // We stop the algorithm when we find the original starting point + our first direction again. In that sense it's very similar to an earlier problem

    // As an extra, for the last point. If the last direction is the same as the first point, we need to remove the last fence that we counted.
    // If we don't do this, we'll count the first fence that we find double

    // There is another option here I think: count the corners.
    // A point can have multiple corners though, that makes this hard.
    // So the question becomes: how do we count a corner?

    return 0;
}

function partB(input: string[][]): number {
    let allResults: Point[][] = []; // A list of lists with the traversed points. This is not a matrix
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[0].length; col++) {
            // if (passed > 5) {
            //     break;
            // }
            // passed++;
            let traversed = fill(input, createPoint(row, col), input[row][col]);
            if (traversed.length !== 0) {
                allResults.push(traversed);
            }
        }
    }
    //console.log(`all traversed points: ${JSON.stringify(allResults)}`);
    //printMatrix(input);

    let result = 0;
    for (let index = 0; index < allResults.length; index++) {
        const area = allResults[index];
        let fences = calculateStraightFences(area);
        result = result + fences * area.length;
    }
    return result;
}

const filledCharacter = "."; // This is the character that we will use to annotate empty points

function fill(
    grid: string[][],
    currentPosition: Point,
    currentTarget: string
): Point[] {
    if (!currentPosition.inBounds(grid.length, grid[0].length)) {
        console.log(`out of bounds`);
        return [];
    }

    if (grid[currentPosition.row][currentPosition.col] == filledCharacter) {
        //console.log(`not the character we are looking for / already filled`);
        return [];
    }

    let traversedPoints: Point[] = [];
    let toTraverse: Point[] = [];
    toTraverse.push(currentPosition);
    //traversedPoints.push(currentPosition);

    while (toTraverse.length !== 0) {
        let currentPoint = toTraverse.pop()!;
        let lx = currentPoint.col;
        while (
            isInside(grid, createPoint(currentPoint.row, lx - 1), currentTarget)
        ) {
            setInside(
                grid,
                createPoint(currentPoint.row, lx - 1),
                traversedPoints
            );
            lx = lx - 1;
        }
        let x = currentPoint.col;
        while (
            isInside(grid, createPoint(currentPoint.row, x), currentTarget)
        ) {
            setInside(grid, createPoint(currentPoint.row, x), traversedPoints);
            x = x + 1;
        }
        scan(grid, lx, x - 1, currentPoint.row + 1, currentTarget, toTraverse);
        scan(grid, lx, x - 1, currentPoint.row - 1, currentTarget, toTraverse);
    }

    return traversedPoints;
}

// Sets a character as inside.
// 1. We add it to the results (needed?)
// 2. we set the point in the grid to the ignored character, so that we don't count it inside again
function setInside(grid: string[][], current: Point, results: Point[]) {
    results.push(current);
    grid[current.row][current.col] = filledCharacter;
}

// Scan the line for entries to add.
function scan(
    grid: string[][],
    lx: number,
    rx: number,
    y: number,
    toSearch: string,
    toTraverse: Point[]
) {
    let span_added = false;

    for (let currentX = lx; currentX <= rx; currentX++) {
        const currentPoint = createPoint(y, currentX);
        if (!isInside(grid, currentPoint, toSearch)) {
            span_added = false;
        } else if (!span_added) {
            toTraverse.push(currentPoint);
            span_added = true;
        }
    }
}

function getWidthAndHeight(matrix: string[][]): { w: number; h: number } {
    return { w: matrix[0].length, h: matrix.length };
}

// Returns if a character is 'inside' a searchable area
function isInside(
    grid: string[][],
    currentPoint: Point,
    characterToSearch: string
): boolean {
    let dimensions = getWidthAndHeight(grid);
    if (!currentPoint.inBounds(dimensions.w, dimensions.h)) {
        return false;
    }

    let current = grid[currentPoint.row][currentPoint.col];
    if (current === characterToSearch) {
        return true;
    }

    return false;
}

export { partA, partB };
