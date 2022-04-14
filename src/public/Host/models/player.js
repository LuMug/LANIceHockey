//import "./../modules/phaser/phaser.min.js";
export default class Player extends Phaser.GameObjects.Ellipse {

    name;
    scoredGoals = 0;
    angle = 0;
    intensity = 0;
    team;
    dimension = 20;
    ip;
    followText;

    constructor(scene, name, posX, posY, ip, team) {
        super(scene, posX, posY, 20, 20, team.color);
        this.name = name;
        this.ip = ip;
        this.followText = scene.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' });
        this.followText.setText(this.name);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        scene.add.existing(this.followText);
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
        //console.log('name: ' + this.name + ', ip: ' + this.ip + ' [' + x + ";" + y + '], team: ' + this.team.color);
        this.body.setVelocity(x, y);
        this.followText.setPosition(this.x, this.y);
    }
}