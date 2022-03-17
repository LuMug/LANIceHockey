export default class Point {

    x = 0;
    y = 0;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    moveBy(addX, addY){
        this.x = x + addX;
        this.y = y + addY;
    }

    move(x, y){
        this.x = x;
        this.y = y;
    }
}