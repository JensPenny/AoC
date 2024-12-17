import { stdout } from "bun";

export const ReadPuzzle = (loc: string): Promise<string> => {
    const file = Bun.file(loc);
    return file.text();
};

export const toLines = (data: string) => data.split("\n");

export const toMatrix = (data: string) =>
    toLines(data).map((line) => line.split(""));

export const printMatrix = (input: string[][]) => {
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            stdout.writer().write(input[row][col]);
        }
        stdout.writer().write("\n");
    }
};

export const matrixToString = (input: string[][]): string => {
    return input.map(arr => arr.join("")).join('\n');
}
