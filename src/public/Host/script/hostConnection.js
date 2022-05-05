export default class Host {
    ws = new WebSocket("ws://10.90.1.117:2389");
    //ws = new WebSocket("ws://127.0.0.1:2389");
    //ws = new WebSocket("ws://192.168.1.115:2389");
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
                    game.createPlayer(name, ip);
                } else if (str[0] == "close") {
                    game.getPlayerByIp(str[1]).followText.destroy();
                    game.getPlayerByIp(str[1]).destroy();
                    game.getPlayerByIp(str[1]).team.removePlayer(game.getPlayerByIp(str[1]));
                } else if (str[0] == "shoot" && game.getPlayerByIp(str[1]) == game.puck.player) {
                    game.shoot();
                } else if (str[0] == "team") {
                    var ip = str[1];
                    game.switchTeam(game.getPlayerByIp(ip));
                } else if (str[0] == "speed") {
                    game.getPlayerByIp(str[1]).speed();
                } else {
                    var num = Number(str[0]);
                    var intensity = Number(str[1]);
                    var ip = str[2];
                    game.getPlayerByIp(ip).setAngle(num);
                    game.getPlayerByIp(ip).setIntensity(intensity);
                }
            }
        });
    }

}