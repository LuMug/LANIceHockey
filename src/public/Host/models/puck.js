//import "./../modules/phaser/phaser.min.js";

export default class Puck extends Phaser.GameObjects.Ellipse {

    player; //player that has the puck

    constructor(scene, posX, posY, size = 40, color = 0x202020) {
        super(scene, posX, posY, size, size, color);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        console.log("Puck created at: [" + this.x + ";" + this.y + "]");
    }

    setPlayer(p) {
        this.player = p;
    }

    update() {
        if (this.player != null) {
            this.setPosition(player.x, player.y);
        }
    }
}