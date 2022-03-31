import Point from "./point.js";
import "./../modules/phaser/phaser.min.js";
export default class Player extends Phaser.GameObjects.Ellipse {

    name;
    scoredGoals = 0;
    pos;
    angle;
    intensity;
    team;
    dimension = 10;
    ip;

    constructor(scene, name, posX, posY, ip, team) {
        super(scene, posX, posY, 10, 10, team.color);
        this.name = name;
        this.pos = new Point(posX, posY);
        this.ip = ip;
        scene.physics.world.enable(this);
        scene.add.existing(this);
    }

    setAngle(angle) {
        this.angle = angle;
    }

    setIntensity(intensity) {
        this.intensity = intensity;
    }

    update() {

    }

    /*paint() {
        var c = document.getElementById("playground");
        var ctx = c.getContext("2d");
        ctx.strokeStyle = this.team.color;
        ctx.fillStyle = this.team.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.dimension, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }*/
}