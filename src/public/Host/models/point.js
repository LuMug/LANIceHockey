export default class Point {

    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveBy(addX, addY) {
        this.x += addX;
        this.y += addY;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }
}