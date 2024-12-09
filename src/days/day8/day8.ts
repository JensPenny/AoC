import { stdout } from "bun";
import { sortedLastIndex } from "lodash";
import { printMatrix } from "../../utils/puzzlereader";
import { createPoint, type Point } from "../../utils/point";

function partA(input: string[][]): number {
    return solve(input, calculateAntinodesA);
}

function partB(input: string[][]): number {
    return solve(input, calculateAntinodesB);
}

const calculateAntinodesB = (
    left: Point,
    right: Point,
    width: number,
    height: number
): Point[] => {
    let currentLeft = left;
    let currentRight = right;
    let antiOffset1Row = left.row - right.row;
    let antiOffset1Col = left.col - right.col;

    let result = [];
    // currentLeft = createPoint(
    //     currentLeft.row + antiOffset1Row,
    //     currentLeft.col + antiOffset1Col
    // );
    while (currentLeft.inBounds(width, height)) {
        result.push(currentLeft);
        currentLeft = createPoint(
            currentLeft.row + antiOffset1Row,
            currentLeft.col + antiOffset1Col
        );
    }

    let antiOffset2Row = right.row - left.row;
    let antiOffset2Col = right.col - left.col;
    // currentRight = createPoint(
    //     currentRight.row + antiOffset2Row,
    //     currentRight.col + antiOffset2Col
    // );
    while (currentRight.inBounds(width, height)) {
        result.push(currentRight);
        currentRight = createPoint(
            currentRight.row + antiOffset2Row,
            currentRight.col + antiOffset2Col
        );
    }

    return result;
};

const calculateAntinodesA = (
    left: Point,
    right: Point,
    width: number,
    height: number
): Point[] => {
    let anti1 = createPoint(
        left.row + (left.row - right.row),
        left.col + (left.col - right.col)
    );
    let anti2 = createPoint(
        right.row + (right.row - left.row),
        right.col + (right.col - left.col)
    );

    let result: Point[] = [];
    if (anti1.inBounds(width, height)) {
        result.push(anti1);
    }
    if (anti2.inBounds(width, height)) {
        result.push(anti2);
    }

    return result;
};

function solve(input: string[][], calc: Calculator): number {
    let antiNodes: string | undefined[][] = [[]];

    // printMatrix(input);
    let towerMap = new Map<string, Point[]>();
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            let current = input[row][col];
            if (current !== ".") {
                let toAdd = createPoint(row, col);
                if (towerMap.has(current)) {
                    towerMap.get(current)?.push(toAdd);
                } else {
                    towerMap.set(current, [toAdd]);
                }
            }
        }
    }

    // towerMap.forEach((v, k) =>
    //     console.log(`towers for ${k}: ${JSON.stringify(v)}`)
    // );

    let rows = input.length;
    let cols = input[0].length;

    let allAntiNodes: Point[] = [];
    towerMap.forEach((v, k) => {
        for (let index = 0; index < v.length; index++) {
            const currentPoint = v[index];

            let next = index + 1;
            while (next < v.length) {
                let nextPoint = v[next];
                let antiNodes = calc(currentPoint, nextPoint, rows, cols);
                allAntiNodes.push(...antiNodes);
                // console.log(`antinodes found: ${JSON.stringify(antiNodes)}`);
                next++;
            }
        }
    });

    let uniqueAntis = new Set(allAntiNodes.map((p) => `r:${p.row},c:${p.col}`));

    return uniqueAntis.size;
}

//Types the calculation function
type Calculator = (
    left: Point,
    right: Point,
    width: number,
    height: number
) => Point[];

// manhattan distance'd
// const distance = (
//     fromx: number,
//     fromy: number,
//     tox: number,
//     toy: number
// ): number => {
//     return Math.abs(fromx - tox) + Math.abs(fromy - toy);
// };

export { partA, partB };
