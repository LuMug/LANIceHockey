import "./../modules/phaser/phaser.min.js";

export default class Puck extends Phaser.GameObjects.Ellipse {



    constructor(scene, posX, posY) {
        super(scene, posX, posY, 10, 10, 0x000000);
        scene.physics.world.enable(this);
        scene.add.existing(this);
    }


}