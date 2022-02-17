class Game{

    leaderboard = new Array();
    teams;

    constructor(team1, team2){
        this.teams = new Array(team1, team2);
    }

    compare(a, b) {
        if (a.scoredGoals < b.scoredGoals){
            return 1;
        }
        if (a.scoredGoals > b.scoredGoals){
            return -1;
        }
        return 0;
    }

    updateLeaderboard(){
        this.leaderboard = new Array();
        var allPlayers = new Array();
        for(i = 0;i < this.teams[0].players.length;i++){
            allPlayers.push(this.teams[0].players[i]);
        }
        for(i = 0;i < this.teams[1].players.length;i++){
            allPlayers.push(this.teams[1].players[i]);
        }
        allPlayers.sort(this.compare);

        var max = 0;
        if(allPlayers.length >= 10){
            max = 10;
        }else{
            max = allPlayers.length;
        }
        for(i = 0;i < max;i++){
            this.leaderboard.push(allPlayers[i]);
        }
    }

    switchTeam(player){
        if(this.teams[0].players.indexOf(player) != -1){
            this.teams[0].removePlayer(player);
            this.teams[1].addPlayer(player);
        }else{
            this.teams[1].removePlayer(player);
            this.teams[0].addPlayer(player);
        }
    }

    score(player){
        player.scoredGoals++;
        this.updateLeaderboard();
    }
}