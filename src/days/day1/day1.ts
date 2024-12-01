import { toLines, ReadPuzzle } from "../../utils/puzzlereader.ts";
import { join } from 'path';

const test = `3   4
4   3
2   5
1   3
3   9
3   3`

//console.log(partA(test.split('\n')));
//console.log(partB(test.split('\n')));
main();

function main() {
    ReadPuzzle(join(__dirname, "input.txt"))
        .then(toLines)
        .then(partA)
        .then(res => console.log('Day 1A:', res))

        ReadPuzzle(join(__dirname, "input.txt"))
        .then(toLines)
        .then(partB)
        .then(res => console.log('Day 1B:', res))
}

function partA(lines: string[]): number {
    let { left, right }: { left: number[]; right: number[]; } = toInputLists(lines);

    let totalDistance = 0;
    for (let index = 0; index < left.length; index++) {
        const l = left[index];
        const r = right[index];
        let distance = Math.abs(l-r);
        totalDistance += distance;
    }
    
    // console.log(left);
    // console.log(right);

    return totalDistance;
}

function partB(lines: string[]): number{
    let { left, right }: { left: number[]; right: number[]; } = toInputLists(lines);

    // Create a dict for the numbers in the right list
    let counts: Record<number, number> = {}
    for (const element of right){
        counts[element] = counts[element] ? counts[element] + 1 : 1;
    }

    // console.log(counts);

    let totalDistance = 0;
    for (let index = 0; index < left.length; index++) {
        const l = left[index];
        const multiplier = counts[l] ? counts[l] : 0;

        const result = l * multiplier;
        totalDistance += result;
    }
    
    // console.log(left);
    // console.log(right);

    return totalDistance;
}

function toInputLists(lines: string[]) {
    let left: number[] = [];
    let right: number[] = [];
    lines
        .map(l => l.split('   '))
        .forEach(pair => {
            let lNum = Number(pair[0]);
            let rNum = Number(pair[1]);

            left.push(lNum);
            right.push(rNum);
        });

    left = left.sort();
    right = right.sort();
    return { left, right };
}

export { };
