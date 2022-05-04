//import "https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser-arcade-physics.min.js";
//import "./../modules/phaser/phaser.js";
import "./../modules/phaser/phaser-arcade-physics.min.js";

import Game from './../models/game.js';

export var SET_WIDTH = document.getElementById("playground").width;
export var SET_HEIGHT = document.getElementById("playground").height;

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    //pixelArt: true,
    roundPixels: true,
    parent: 'container',
    width: SET_WIDTH,
    height: SET_HEIGHT,
    //backgroundColor: "#FFFFFF",
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars