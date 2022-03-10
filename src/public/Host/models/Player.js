import Point from "./point.js";
export default class Player {

    name;
    scoredGoals = 0;
    pos;
    angle;
    velocita;
    team;
    dimension = 10;

    constructor(name, posX, posY){
        this.name = name;
        this.pos = new Point(posX, posY);
    }
}