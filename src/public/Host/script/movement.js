import Game from "../models/game.js";
import Player from "../models/player.js";

export function move(player) {
    if (player.angle < 22.5) {
        player.pos.moveBy(1, 0);
    } else if (player.angle > 22.5 && player.angle < 67.5) {
        player.pos.moveBy(1, -1);
    } else if (player.angle > 67.5 && player.angle < 112.5) {
        player.pos.moveBy(0, -1);
    } else if (player.angle > 112.5 && player.angle < 157.5) {
        player.pos.moveBy(-1, -1);
    } else if (player.angle > 157.5 && player.angle < 202.5) {
        player.pos.moveBy(-1, 0);
    } else if (player.angle > 202.5 && player.angle < 247.5) {
        player.pos.moveBy(-1, 1);
    } else if (player.angle > 247.5 && player.angle < 292.5) {
        player.pos.moveBy(0, 1);
    } else if (player.angle > 292.5 && player.angle < 337, 5) {
        player.pos.moveBy(1, 1);
    }
}