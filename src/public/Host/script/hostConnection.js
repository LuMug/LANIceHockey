import Game from "../models/game.js";
import Player from "../models/player.js";
import { move } from "./movement.js";
const ws = new WebSocket("ws://10.90.1.117:2389");

ws.addEventListener("open", () => {
    console.log("We are connected!");
    ws.send("host");

    var game = new Game();

    ws.binaryType = "arraybuffer";

    ws.onmessage = function(message) {
        var str = message.data.split(";");
        if (str[0] == "new") {
            console.log(str[2]);
            game.teams[0].addPlayer(new Player(str[2], 100, 100, str[1]));
        } else if (str[0] == "close") {
            game.getPlayerByIp(str[1]).team.removePlayer(game.getPlayerByIp(str[1]));
            game.repaintAllPlayer();
        } else {
            var num = Number(str[0]);
            var ip = str[1];
            game.getPlayerByIp(str[1]).setAngle(num);
            move(game.getPlayerByIp(str[1]));
            game.repaintAllPlayer();
        }
    }
});