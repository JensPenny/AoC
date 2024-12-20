interface Vector {
    x: number
    y: number
}

class Vector2 implements Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    Add(toAdd: Vector): Vector2 {
        return new Vector2(this.x + toAdd.x, this.y + toAdd.y);
    }

    Multi(multiplier: number): Vector2 {
        return new Vector2(this.x * multiplier, this.y * multiplier);
    }

    toDirection(direction: string): Vector2 {
        switch (direction) {
            case "N":
                return this.Add({x: 0, y: -1});
            case "NE":
                return this.Add({x: 1, y: -1});
            case "E":
                return this.Add({x: 1, y: 0});
            case "SE":
                return this.Add({x: 1, y: 1});
            case "S":
                return this.Add({x: 0, y: 1});
            case "SW":
                return this.Add({x: -1, y: 1});
            case "W":
                return this.Add({x: -1, y: 0});
            case "NW":
                return this.Add({x: -1, y: -1});
            default:
                break;
        }
        return this;
    }
}

export { Vector2 };
