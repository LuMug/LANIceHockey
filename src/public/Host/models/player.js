import Point from "./point.js";
export default class Player {

    name;
    scoredGoals = 0;
    pos;
    angle;
    velocita;
    team;
    dimension = 10;
    ip;

    constructor(name, posX, posY, ip) {
        this.name = name;
        this.pos = new Point(posX, posY);
        this.ip = ip;
    }

    setAngle(angle) {
        this.angle = angle;
    }

    paint() {
        var c = document.getElementById("playground");
        var ctx = c.getContext("2d");
        ctx.strokeStyle = this.team.color;
        ctx.fillStyle = this.team.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.dimension, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}