import { update } from "lodash";
import { matrixToString, printMatrix, toLines } from "../../utils/puzzlereader";
import { Vector2 } from "../../utils/vector2";
import { sleep } from "bun";

function partA(input: string, width: number, height: number): number {
    let vectors = toLines(input).map(parseSingleLine);
    //console.log(JSON.stringify(vectors));
    let multiplied = vectors.map((v) => v.pos.Add(v.vel.Multi(100)));
    let result = new Map<number, number>();

    for (let vector of multiplied) {
        let q = findQuadrant(vector, width, height);
        result.set(q, (result.get(q) || 0) + 1);
    }

    let total = 1;
    result.delete(0);
    result.forEach((v, k) => (total = total * v));
    //console.log(result);
    return total;
}

// Quadrants
// Q1 = x0 y0, x0 y(w/2 floor),
function findQuadrant(pos: Vector2, width: number, height: number): number {
    let { x, y } = pos; // destructuring

    x = x % width;
    if (x < 0) {
        x = width + x; // These are negative, so we need to do width + the negative for these
    }
    y = y % height;
    if (y < 0) {
        y = height + y;
    }

    let result = 0;
    if (
        x >= 0 &&
        x < Math.floor(width / 2) &&
        y >= 0 &&
        y < Math.floor(height / 2)
    ) {
        result = 1;
    } else if (
        x >= Math.ceil(width / 2) &&
        x < width &&
        y >= 0 &&
        y < Math.floor(height / 2)
    ) {
        result = 2;
    } else if (
        x >= 0 &&
        x < Math.floor(width / 2) &&
        y >= Math.ceil(height / 2) &&
        y < height
    ) {
        result = 3;
    } else if (
        x >= Math.ceil(width / 2) &&
        x < width &&
        y >= Math.ceil(height / 2) &&
        y < height
    ) {
        result = 4;
    }

    // console.log(`pos ${x},${y}-Q${result}`);

    //middle (= not found) is quadrant zero
    return result;
}

async function partB(input: string, width: number, height: number): number {
    let vectors = toLines(input).map(parseSingleLine);

    let baseField: string[][] = [];
    for (let y = 0; y < height; y++) {
        baseField[y] = [];
        baseField[y].length = width;
        baseField[y].fill(".", 0, width);
    }

    // printMatrix(baseField);

    // let start = 71;
    // let jump = 101;
    // let jumps = 100;

    // {
    //     let copy = baseField.map(function(arr) {
    //         return arr.slice();
    //     });
    //     vectors = vectors.map(v => moveVectorInGrid(v, width, height, start));
    //     vectors.forEach(v => copy[v.pos.y][v.pos.x] = "X");
    //     console.log(`second ${start}`)
    //     let mtrxString = matrixToString(copy);
    //     console.log(mtrxString);
    //     console.log('------------------')
    // }

    // for (let i = 1; i < jumps; i++) {
    //     let copy = baseField.map(function(arr) {
    //         return arr.slice();
    //     });
    //     vectors = vectors.map(v => moveVectorInGrid(v, width, height, jump));
    //     vectors.forEach(v => copy[v.pos.y][v.pos.x] = "X");
    //     console.log(`second ${i*jump+start}`)
    //     let mtrxString = matrixToString(copy);
    //     console.log(mtrxString);
    //     console.log('------------------')
    // }

    // Lets do this smart. We're going to assume that the tree gets printed in the middle.
    // So we do the whole part1 shebang, and see if Q1 == Q2 and Q3 == Q4
    for (let sec = 1; sec < 100000; sec++) {
        let result = new Map<number, number>();
        vectors = vectors.map(v => moveVectorInGrid(v, width, height, 1));
        // vectors = vectors.map(
        //     (v) => <Vector>{ pos: v.pos.Add(v.vel), vel: v.vel }
        // );

        for (let v of vectors) {
            let q = findQuadrant(v.pos, width, height);
            result.set(q, (result.get(q) || 0) + 1);
        }

        if (result.get(1) == result.get(2) && result.get(3) == result.get(4)) {
            let copy = baseField.map(function (arr) {
                return arr.slice();
            });
            vectors.forEach((ve) => (copy[ve.pos.y][ve.pos.x] = "X"));
            let mtrxString = matrixToString(copy);
            console.log(mtrxString);
            console.log(`seconds: ${sec}`)
            await sleep(1000);
            //return sec;
        }
    }

    return 0;
}

function moveVectorInGrid(
    input: Vector,
    width: number,
    height: number,
    jump: number
): Vector {
    let updated = input.pos.Add(input.vel.Multi(jump));

    updated.x = updated.x % width;
    updated.y = updated.y % height;
    if (updated.x < 0) {
        updated.x = width + updated.x;
    }
    if (updated.y < 0) {
        updated.y = height + updated.y;
    }

    return { pos: new Vector2(updated.x, updated.y), vel: input.vel };
}

interface Vector {
    pos: Vector2;
    vel: Vector2;
}
function parseSingleLine(line: string): Vector {
    let toParse = line.replaceAll("p=", "").replaceAll("v=", "");
    let vectors = toParse.split(" ").map((e) => e.split(","));

    return {
        pos: new Vector2(Number(vectors[0][0]), Number(vectors[0][1])),
        vel: new Vector2(Number(vectors[1][0]), Number(vectors[1][1])),
    };
}

export { partA, partB };
