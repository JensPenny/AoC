import { create } from "lodash";

interface Point {
    row: number;
    col: number;
    toDirection: (direction: string) => Point;
    moveTo: (target: Point) => Point[];
    inBounds: (width: number, height: number) => boolean;
}

function createPoint(row: number, col: number) {
    return new P(row, col);
}

class P implements Point {
    row: number;
    col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    inBounds(width: number, height: number): boolean{
        return this.row >= 0 && this.row < height
        && this.col >= 0 && this.col < width;
    }

    // Just a dumb way to get from point A to point B
    // The size of this list should be the manhattan distance
    moveTo(target: Point): Point[] {
        let result = [];

        let currentCol = this.col;
        let currentRow = this.row;

        while (target.col != currentCol) {
            console.log(`adding row: ${currentRow} - col: ${currentCol}`);
            if (currentCol > target.col) {
                currentCol -= 1;
            } else if (currentCol < target.col) {
                currentCol += 1;
            } else {
                break;
            }
            result.push(createPoint(this.row, currentCol));
        }

        while (target.row != this.row) {
            console.log(`adding row: ${currentRow} - col: ${currentCol}`);
            if (currentRow > target.row) {
                currentRow -= 1;
            } else if (currentRow < target.row) {
                currentRow += 1;
            } else {
                break;
            }
            result.push(createPoint(currentRow, this.col));
        }
        return result;
    }

    toDirection(direction: string): Point {
        switch (direction) {
            case "N":
                return new P(this.row - 1, this.col);
            case "NE":
                return new P(this.row - 1, this.col + 1);
            case "E":
                return new P(this.row, this.col + 1);
            case "SE":
                return new P(this.row + 1, this.col + 1);
            case "S":
                return new P(this.row + 1, this.col);
            case "SW":
                return new P(this.row + 1, this.col - 1);
            case "W":
                return new P(this.row, this.col - 1);
            case "NW":
                return new P(this.row - 1, this.col - 1);
            default:
                break;
        }
        return new P(this.row, this.col);
    }
}
const Directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
type Direction = typeof Directions[number];

export { Directions, type Point, type Direction, createPoint };
