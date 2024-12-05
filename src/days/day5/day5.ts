import { toLines } from "../../utils/puzzlereader";
import { groupBy, type Dictionary } from "lodash";

function partA(input: string): number {
    let inputParts = input.split("\n\n");
    let commands = parseCommands(inputParts[0].trim());
    let toTest = toLines(inputParts[1].trim()).map((line) =>
        line.split(",").map((item) => Number(item))
    );

    let result = 0;
    console.log(toTest);
    for (const test of toTest) {
        if (testLine(test, commands)) {
            console.log(`line ${test} is a correct line`);
            let middle = test[Math.floor(test.length / 2)];
            result += middle;
        }
    }

    return result;
}

function partB(input: string): number {
    let inputParts = input.split("\n\n");
    let commands = parseCommands(inputParts[0].trim());
    let toTest = toLines(inputParts[1].trim()).map((line) =>
        line.split(",").map((item) => Number(item))
    );

    // Step 1: filter so that we only have the unsorted left
    let unsorted = toTest.filter((singleTest) => {
        return !testLine(singleTest, commands);
    });
    //console.log(unsorted);

    // Step 2: sort
    let sorted = unsorted.map(line => sortLine(line, commands));

    //console.log("sorted!");
    //console.log(sorted);

    let result = 0;
    for (const toAdd of sorted) {
            let middle = toAdd[Math.floor(toAdd.length / 2)];
            result += middle;
    }

    return result;
}

type Command = {
    before: number;
    after: number;
};

function testLine(toTest: number[], dict: Dictionary<Command[]>): boolean {
    for (let index = 0; index < toTest.length; index++) {
        const element = toTest[index];
        //console.log("checking dict for element ", element);
        const commands = dict[element.toString()];

        if (commands == undefined) {
            continue;
        }

        for (let command of commands) {
            let otherIndex = toTest.indexOf(command.after);
            if (otherIndex != -1 && otherIndex < index) {
                return false;
            }
        }
    }
    return true;
}

function sortLine(toSort: number[], dict: Dictionary<Command[]>): number[] {
    let sorted = [...toSort];
    for (let index = 0; index < sorted.length; index++) {
        const element = sorted[index];
        const commands = dict[element.toString()];

        if (commands == undefined) {
            continue;
        }

        for (let command of commands) {
            let otherIndex = sorted.indexOf(command.after);
            if (otherIndex != -1 && otherIndex < index) {
                let tmp = sorted[index];
                sorted[index] = sorted[otherIndex];
                sorted[otherIndex] = tmp;
                index = 0;
                continue;
            }
        }
    }

    return sorted;
}

function parseCommands(input: string): Dictionary<Command[]> {
    let commands = input
        .split("\n")
        .map((line) => line.split("|"))
        .map(
            (rec: string[]): Command => ({
                before: Number(rec[0]),
                after: Number(rec[1]),
            })
        );

    // Can we flatten this list to a sorted list that should contain all numbers so that they conform?
    // Probably not, since one of the requirements is that both numbers have to be in the resulting list
    // In that case, a grouping should suffice
    let grouped = groupBy(commands, "before");
    //console.log(grouped);

    return grouped;
}

export { partA, partB };
