import Player from "./player.js";
import Team from "./team.js";
import Host from "../script/hostConnection.js"

export default class Game extends Phaser.Scene {

    leaderboard = new Array();
    teams;

    constructor() {
        super({ key: 'Game' });
        this.teams = new Array(new Team("Green", 0x05871b), new Team("Yellow", 0xf0d31a));
        console.log("done");

        console.log(this.teams);
        var conn = new Host(this);
    }

    preload() {

    }

    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

    }

    update(time, delta) {
        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                this.teams[i].players[j].update();
            }
        }
    }

    create_player(name, ip) {
        var team = this.autoSetTeam();
        team.addPlayer(new Player(this, name, 100, 100, ip, team));
        console.debug('new player added ' + name);
    }

    enablePhysicsByIp(ip){
        var player = this.getPlayerByIp(ip);

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
	    player.body.allowGravity = false;
    }

    compare(a, b) {
        if (a.scoredGoals < b.scoredGoals) {
            return 1;
        }
        if (a.scoredGoals > b.scoredGoals) {
            return -1;
        }
        return 0;
    }

    updateLeaderboard() {
        this.leaderboard = new Array();
        var allPlayers = new Array();
        for (i = 0; i < this.teams[0].players.length; i++) {
            allPlayers.push(this.teams[0].players[i]);
        }
        for (i = 0; i < this.teams[1].players.length; i++) {
            allPlayers.push(this.teams[1].players[i]);
        }
        allPlayers.sort(this.compare);

        var max = 0;
        if (allPlayers.length >= 10) {
            max = 10;
        } else {
            max = allPlayers.length;
        }
        for (i = 0; i < max; i++) {
            this.leaderboard.push(allPlayers[i]);
        }
    }

    switchTeam(player) {
        if (this.teams[0].players.indexOf(player) != -1) {
            this.teams[0].removePlayer(player);
            this.teams[1].addPlayer(player);
        } else {
            this.teams[1].removePlayer(player);
            this.teams[0].addPlayer(player);
        }
    }

    autoSetTeam() {
        if (this.teams[0].players.length > this.teams[1].players.length) {
            return this.teams[1];
        }
        return this.teams[0];
    }

    score(player) {
        player.scoredGoals++;
        this.updateLeaderboard();
    }

    getPlayerByIp(ip) {
        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                if (this.teams[i].players[j].ip == ip) {
                    return this.teams[i].players[j];
                }
            }
        }
    }

    startPaint() {
        setInterval(this.repaintAllPlayer, 1000);
    }

    repaintAllPlayer() {
        var c = document.getElementById("playground");
        var ctx = c.getContext("2d");

        var h = c.height;
        var w = c.width;

        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                this.teams[i].players[j].paint();
            }
        }
    }
}