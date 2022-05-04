export default class Player extends Phaser.GameObjects.Ellipse {

    scene;
    name;
    scoredGoals = 0;
    angle = 0;
    intensity = 0;
    team;
    ip;
    followText;
    puckCollider;
    lastVelocityX;
    lastVelocityY;

    constructor(scene, name, posX, posY, ip, team) {
        super(scene, posX, posY, 20, 20, team.color);
        this.scene = scene;
        this.name = name;
        this.ip = ip;
        this.followText = scene.add.text(100, 100, '', { font: '20px Courier', fill: '#00ff00' });
        this.followText.setText(this.name);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        scene.add.existing(this.followText);
    }

    setPuckCollider(collider) {
        this.puckCollider = collider;
    }

    setAngle(angle) {
        this.angle = angle;
    }

    setIntensity(intensity) {
        this.intensity = intensity;
    }

    setColor(team) {
        this.setFillStyle(team.color);
    }

    update() {
        var x = (this.intensity * Math.cos(this.angle * Math.PI / 180)) * 4;
        var y = -(this.intensity * Math.sin(this.angle * Math.PI / 180)) * 4;
        if(x != 0 && y != 0){
            this.lastVelocityX = x;
            this.lastVelocityY = y;
        }
        this.body.setVelocity(x, y);
        this.followText.setPosition(this.x, this.y);
    }

    removeCollider() {
        this.scene.physics.world.removeCollider(this.puckCollider);
    }

    addCollider() {
        var coll = this.scene.physics.add.collider(this, this.scene.puck, this.scene.changePuckOwner);
        this.setPuckCollider(coll);
    }
}