import Point from "./point.js";
import "./../modules/phaser/phaser.min.js";
export default class Player extends Phaser.GameObjects.Ellipse {

    name;
    scoredGoals = 0;
    angle = 0;
    intensity = 0;
    team;
    dimension = 20;
    ip;

    constructor(scene, name, posX, posY, ip, team) {
        super(scene, posX, posY, 20, 20, team.color);
        this.name = name;
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
        var x = (this.intensity * Math.cos(this.angle * Math.PI / 180)) * 2;
        var y = -(this.intensity * Math.sin(this.angle * Math.PI / 180)) * 2;
        //console.log(this.intensity);
        //console.log(this.angle);
        console.log('name: ' + this.name + ', ip: ' + this.ip + ' [' + x + ";" + y + '], team: ' + this.team.color);
        this.body.setVelocity(x, y);
        //this.body.setVelocity(50, 50);
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