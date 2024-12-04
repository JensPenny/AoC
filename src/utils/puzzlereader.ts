export const ReadPuzzle = (loc: string): Promise<string> => {
    const file = Bun.file(loc);
    return file.text();
};

export const toLines = (data: string) => data.split("\n");

export const toMatrix = (data: string) =>
    data.split("\n").map((line) => line.split(""));
