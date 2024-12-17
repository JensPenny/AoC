class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    Add(toAdd: Vector2): Vector2 {
        return new Vector2(this.x + toAdd.x, this.y + toAdd.y);
    }

    Multi(multiplier: number): Vector2 {
        return new Vector2(this.x * multiplier, this.y * multiplier);
    }
}

export { Vector2 };
