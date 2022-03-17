import Team from "./team.js";
import Player from "../models/player.js";

export default class Game {


    leaderboard = new Array();
    teams;

    constructor() {
        this.teams = new Array(new Team("Green"), new Team("Yellow"));
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