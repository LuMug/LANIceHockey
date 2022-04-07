//import Game from "../models/game.js";
import Player from "../models/player.js";
//import { move } from "./movement.js";

export default class Host {
    ws = new WebSocket("ws://10.90.1.117:2389");

    constructor(game) {
        this.ws.addEventListener("open", () => {
            console.log("We are connected!");
            this.ws.send("host");

            this.ws.binaryType = "arraybuffer";

            this.ws.onmessage = function(message) {
                var str = message.data.split(";");
                if (str[0] == "new") {
                    let name = str[2];
                    let ip = str[1];
                    console.log('new player connecting ' + name);

                    game.create_player(name, ip)
                } else if (str[0] == "close") {
                    game.getPlayerByIp(str[1]).team.removePlayer(game.getPlayerByIp(str[1]));
                } else {
                    var num = Number(str[0]);
                    var intensity = Number(str[1]);
                    var ip = str[2];
                    game.getPlayerByIp(ip).setAngle(num);
                    game.getPlayerByIp(ip).setIntensity(intensity);
                    //console.log("Funziona");
                    //game.getPlayerByIp(ip).update();
                    //move(game.getPlayerByIp(ip));
                    //game.repaintAllPlayer();
                }
            }
        });
    }

}