import { createPoint, Directions, type Direction, type Point } from "../../utils/point";

function partA(input: string[][]) {
    let height = input.length;
    let width = input[0].length;

    let result = 0;
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            let trailscore = doBacktrack(0, input, createPoint(row, col), width, height);
            let uniques = new Set(trailscore.map(ts => `${ts.row}-${ts.col}`)).size;
            //console.log(`trailscore: ${uniques}`);

            result += uniques;
        }
    }
    return result;
}

function partB(input: string[][]) {
    let height = input.length;
    let width = input[0].length;

    let result = 0;
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            let trailscore = doBacktrack(0, input, createPoint(row, col), width, height);
            //let uniques = new Set(trailscore.map(ts => `${ts.row}-${ts.col}`)).size;
            //console.log(`trailscore: ${uniques}`);
            result += trailscore.length;
        }
    }
    return result;
}

const directions: Direction[] = [Directions[0], Directions[2], Directions[4], Directions[6]];
function doBacktrack(expectedValue: number, grid: string[][], currentPoint: Point, gridWidth: number, gridHeight: number): Point[]{

    //console.log(`start point [${currentPoint.row + "-" + currentPoint.col}`);
    if (!currentPoint.inBounds(gridWidth, gridHeight)){
        //console.log(`out of bounds: [${currentPoint.row + "-" + currentPoint.col}`)
        return [];
    }

    let currentValue = Number(grid[currentPoint.row][currentPoint.col]);
    //console.log(`eval ${currentValue} at ${currentPoint.row + "-" + currentPoint.col} : expecting ${expectedValue}`)
    if (currentValue !== expectedValue){
        return [];
    }

    if (currentValue === 9) {
        //console.log("found path!");
        return [currentPoint];
    }

    let amountCorrect = [];
    let nextValueToCheck = currentValue + 1;
    for (let dir of directions){
        amountCorrect.push(...doBacktrack(nextValueToCheck, grid, currentPoint.toDirection(dir), gridWidth, gridHeight));
    }

    return amountCorrect;
}

export { partA, partB };
