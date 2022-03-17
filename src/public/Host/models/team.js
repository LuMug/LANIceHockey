export default class Team {

    players = new Array();
    color;

    constructor(color) {
        this.color = color;
    }

    addPlayer(player) {
        this.players.push(player);
        player.team = this;
    }

    removePlayer(player) {
        var index = this.players.indexOf(player);
        if (index != -1) {
            this.players.splice(index, 1);
        }
    }

    getTeamGoals() {
        var score = 0;
        for (var i = 0; i < this.players.length; i++) {
            score += this.players[i].scoredGoals;
        }
        return score;
    }
}