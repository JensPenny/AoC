
function partA(input: string[]): number {
    let puzzle = input.map(parseInput);

    const funcs: ops[] = [add, mul];
    let result = 0;
    for (let index = 0; index < puzzle.length; index++) {
        const current = puzzle[index];
        let toCheck = current.values;
        const first = toCheck.shift();
        if (solveRec(first!, current.target, [...toCheck], funcs) == true) {
            //console.log("solved: ", logPuzzle(current));
            result += current.target;
        } else {
            // console.log("faulty: ", logPuzzle(current));
        }
    }

    return result;
}

function partB(input: string[]): number {
    let puzzle = input.map(parseInput);

    const funcs: ops[] = [add, mul,conc];
    let result = 0;
    for (let index = 0; index < puzzle.length; index++) {
        const current = puzzle[index];
        let toCheck = current.values;
        const first = toCheck.shift();
        if (solveRec(first!, current.target, [...toCheck], funcs) == true) {
            //console.log("solved: ", logPuzzle(current));
            result += current.target;
        } else {
            // console.log("faulty: ", logPuzzle(current));
        }
    }

    return result;
}

const add: ops = (left: number, right: number): number => {
    return left + right;
};
const mul: ops = (left: number, right: number): number => {
    return left * right;
};

// AHAHAH JAVASCRIPT 
const conc: ops = (left: number, right: number) => {
    return Number('' + left + right);
};

type ops = (left: number, right: number) => number;

function solveRec(
    input: number,
    target: number,
    toHandle: number[],
    operations: ops[]
): boolean {
    // Quickbreak: there are no negatives or ways to lower the calcs, so if input > target we break immediately
    // If it is the same, we found our solution
    if (input > target) {
        return false;
    }

    if (toHandle.length == 0) {
        return input == target; // We didnt get there :(
    }

    // Grab the input and the first element of tohandle.
    let current = toHandle.shift()!;
    let next = [...toHandle];
    // Do all operations on these elements
    for (const op of operations) {
        let nextInput = op(input, current);
        // console.log(`intermediate value: ${nextInput}`)
        let test = solveRec(nextInput, target, [...next], operations);
        if (test == true) {
            return true;
        }
    }
    return false;
}

type Puzzle = {
    target: number;
    values: number[];
};

const logPuzzle = (p: Puzzle): string => `t: ${p.target} - v: ${p.values}`;

function parseInput(input: string): Puzzle {
    const splitted = input.split(":");
    const target = Number(splitted[0]);
    const values = splitted[1]
        .trim()
        .split(" ")
        .map((val) => Number(val));
    return { target, values };
}

export { partA, partB };


