import { stdout } from "bun";
import { result } from "lodash";

function partA(input: string): number {
    let blocks = createFilledInput(input);
    //printBlocks(blocks);

    let lastBlocks = blocks;
    while (blocks.some((b) => b.isEmpty)) {
        // Remove trailing empty blocks
        while (
            blocks[blocks.length - 1].isEmpty ||
            blocks[blocks.length - 1].length == 0
        ) {
            //console.log(`removing empty block`);
            blocks = blocks.slice(0, blocks.length - 1);
        }
        //console.log("start loop");
        //printBlocks(blocks);
        lastBlocks = blocks;

        let lastBlock = blocks[blocks.length - 1];
        let firstEmptyIndex = blocks.findIndex((b) => b.isEmpty);
        if (firstEmptyIndex !== -1) {
            // console.log(
            //     "attempting to fill first empty at index",
            //     firstEmptyIndex
            // );
            let firstEmptyBlock = blocks[firstEmptyIndex];
            // empty is larger, empty is smaller or empty equals
            if (firstEmptyBlock.length == lastBlock.length) {
                // console.log(
                //     "perfect fit - last block can fully fit in the first empty block"
                // );
                blocks[firstEmptyIndex] = lastBlock;
                blocks = blocks.slice(0, blocks.length - 1);
            } else if (firstEmptyBlock.length > lastBlock.length) {
                // the last block can be fully contained in the first block.
                // Update the length of the first empty block
                // insert the
                // last empty block before the empty block
                // Remove the last block from the list
                // console.log(
                //     `last block can be fully contained by the first block`
                // );
                firstEmptyBlock.length =
                    firstEmptyBlock.length - lastBlock.length;
                blocks[firstEmptyIndex] = firstEmptyBlock;
                blocks = blocks.toSpliced(firstEmptyIndex, 0, lastBlock);
                blocks = blocks.slice(0, blocks.length - 1);
            } else if (firstEmptyBlock.length < lastBlock.length) {
                console.log(`last block is larger than the first block`);
                // the last block is larger that the first block.
                // create a new block in place of the empty block
                blocks[firstEmptyIndex] = {
                    current: lastBlock.current,
                    length: firstEmptyBlock.length,
                    isEmpty: false,
                };
                // update the length of the last block
                blocks[blocks.length - 1] = {
                    current: lastBlock.current,
                    length: lastBlock.length - firstEmptyBlock.length,
                    isEmpty: false,
                };
            }
        }
    }

    let iterator = 0;
    let result = 0;
    blocks.forEach((b) => {
        for (let index = 0; index < b.length; index++) {
            let currentResult = Number(b.current) * iterator;
            //console.log(`result for index ${iterator} = ${currentResult}`);
            result += currentResult;
            iterator++;
        }
    });

    return result;
}

// Copy pasted since I'm a bit too tired, don't judge, just read
function partB(input: string): number {
    let blocks = createFilledInput(input);

    for (let index = blocks.length - 1; index >= 0; index--) {
        printBlocks(blocks);
        let currentBlock = blocks[index];

        // quickbreak. If this segment is empty we do not need to reschedule it
        if (currentBlock.isEmpty || currentBlock.length == 0) {
            continue;
        }

        // Iterate over the empty indexes where the emptyIndex < index
        // If the span is equal or larger than what we need to move, move it
        for (let emptyIndex = 0; emptyIndex <= index; emptyIndex++) {
            let emptyBlock = blocks[emptyIndex];

            // Quickbreak on non empty blocks
            if (!emptyBlock.isEmpty) {
                continue;
            }

            if (emptyBlock.length == currentBlock.length) {
                console.log(`perfect fit for ${JSON.stringify(currentBlock)}  - block can fully fit in the empty block ${emptyIndex}`);
                blocks[emptyIndex] = currentBlock;
                blocks[index] = {
                    current: ".",
                    isEmpty: true,
                    length: currentBlock.length,
                };
                break;
            } else if (emptyBlock.length > currentBlock.length) {
                console.log(`contained fit for ${JSON.stringify(currentBlock)}  - block can fully fit in the empty block ${emptyIndex}`);
                emptyBlock.length = emptyBlock.length - currentBlock.length;
                blocks[emptyIndex] = emptyBlock;
                blocks[index] = {
                    current: ".",
                    isEmpty: true,
                    length: currentBlock.length,
                };
                blocks = blocks.toSpliced(emptyIndex, 0, currentBlock);
                index += 1; // We added an extra block here. This is the small bug that stumped me for day 9.
                break;
            }
        }
    }

    let iterator = 0;
    let result = 0;
    blocks.forEach((b) => {
        for (let index = 0; index < b.length; index++) {
            let currentNumber = Number(b.current);
            if (isNaN(currentNumber) || b.isEmpty) {
                iterator++;
                continue;
            }
            let currentResult = currentNumber * iterator;
            result += currentResult;
            iterator++;
        }
    });

    return result;
}

function createFilledInput(input: string): Block[] {
    let blocks: Block[] = [];

    let isEmpty = false;

    let splitted = input.split("");
    let id = 0;
    for (let index = 0; index < splitted.length; index++) {
        const current = splitted[index];
        const length = Number(current);
        if (!isEmpty) {
            if (length !== 0) {
                blocks.push({
                    current: id.toString(),
                    length: length,
                    isEmpty: isEmpty,
                });
            }
            id++;
        } else {
            if (length !== 0) {
                blocks.push({ current: ".", length: length, isEmpty: isEmpty });
            }
        }
        isEmpty = !isEmpty;
    }
    return blocks;
}

// This slows down the result, so comment it out when running
function printBlocks(blocks: Block[]): string {
    // blocks.forEach((b) => {
    //     for (let index = 0; index < b.length; index++) {
    //         stdout.writer().write(b.current);
    //     }
    // });
    // stdout.writer().write('\n');
    return "";
}

type Block = {
    current: string;
    isEmpty: boolean;
    length: number;
};

export { partA, partB };
