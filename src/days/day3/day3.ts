import { ReadPuzzle } from "../../utils/puzzlereader";
import { join } from "path";

main();
function main() {
    ReadPuzzle(join(__dirname, "input.txt"))
        .then(partA)
        .then((data) => console.log("Day 3A: ", data));

    ReadPuzzle(join(__dirname, "input.txt"))
        .then(partB)
        .then((data) => console.log("Day 3B: ", data));
}

function partA(input: string): number {
    //const regex = new RegExp("mul(\d{1-3},\d{1-3})");
    const regex = new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/g);
    const matches = input.matchAll(regex);
    //matches.forEach(res => console.log(res[0], res[1], res[2]));
    const multiplied = matches.map(
        (entry) => Number(entry[1].toString()) * Number(entry[2].toString())
    );
    return multiplied.reduce((acc, curr) => (acc += curr));
}

function partB(input: string): number {
    const regex = new RegExp(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g);
    const matches = input.matchAll(regex);
    // matches.forEach((res) => console.log(res[0]));
    let isEnabled = true;
    const multiplied = matches.map((entry) => {
        if (entry[0] == "do()"){
            isEnabled = true;
        } 
        if (entry[0] == "don't()"){
            isEnabled = false;
        }
        if (isEnabled && entry[1]){
            return Number(entry[1].toString()) * Number(entry[2].toString());
        } else {
            return 0;
        }
    });
    return multiplied.reduce((acc, curr) => (acc += curr));
}

export { partA, partB };
