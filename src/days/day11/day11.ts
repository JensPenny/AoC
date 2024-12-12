function partA(input: string, steps: number): number {
    let puzzle = input.split(" ");

    // prefill basic memoization step
    let counter: Map<string, number> = new Map();
    for (let stone of puzzle) {
        if(counter.has(stone)){
            counter.set(stone, counter.get(stone)! + 1); 
        } else {
            counter.set(stone, 1);
        }
    }
    for (let step = 0; step < steps; step++) {
        counter = doStep(counter);
        //console.log(`step ${step}: ${puzzle}`);
    }
    return counter.values().reduce((prev, curr) => prev += curr);
}

function doStep(input: Map<string, number>): Map<string, number> {
    let result: Map<string, number> = new Map();

    for (let stone of input.entries()) {
        if (stone[0] == "0") {
            result.set("1", (result.get("1") || 0) + stone[1]);
        } else if (stone[0].length % 2 === 0) {
            // console.log(`splitting ${stone[0]}`);
            let leftStone = stone[0].slice(0, stone[0].length / 2);
            let rightStone = stone[0].slice(stone[0].length / 2, stone[0].length);
            let leftString = parseInt(leftStone, 10).toString();
            let rightString = parseInt(rightStone, 10).toString();
        
            result.set(leftString, (result.get(leftString) || 0) + stone[1]);
            result.set(rightString, (result.get(rightString) || 0) + stone[1]);
        } else {
            let targetStone = (parseInt(stone[0], 10) * 2024).toString();
            result.set(targetStone, (result.get(targetStone) || 0) + stone[1]);
        }
    }

    return result;
}

function partB(input: string, steps: number): number {
    return 0;
}

export { partA, partB };
