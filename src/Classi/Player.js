class Player {

    name;
    scoredGoals = 0;
    pos;

    constructor(name, posX, posY){
        this.name = name;
        this.pos = new Point(posX, posY);
    }
}