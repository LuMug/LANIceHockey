import Player from "./player.js";
import Team from "./team.js";
import Host from "../script/hostConnection.js"
import Puck from "./puck.js";
import { SET_HEIGHT, SET_WIDTH } from "../script/main.js";

export default class Game extends Phaser.Scene {

    teams;
    bordersGroup;
    puck;
    goalScored = false;
    raggioAngoli;
    spessoreBordi;

    constructor() {
        super({ key: 'Game' });
        this.teams = new Array(new Team("Green", 0x05871b), new Team("Yellow", 0xf0d31a));
        console.log("done");
        console.log(this.teams);
        var conn = new Host(this);
    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        this.spessoreBordi = 8;
        this.raggioAngoli = 85;
        var highSide = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli, 0, SET_WIDTH - 2 * this.raggioAngoli, this.spessoreBordi);
        var lowSide = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli, SET_HEIGHT - this.spessoreBordi, SET_WIDTH - 2 * this.raggioAngoli, this.spessoreBordi);
        var leftSide = new Phaser.GameObjects.Rectangle(this, 0, this.raggioAngoli, this.spessoreBordi, SET_HEIGHT - 2 * this.raggioAngoli);
        var rightSide = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.spessoreBordi, this.raggioAngoli, this.spessoreBordi, SET_HEIGHT - 2 * this.raggioAngoli);
        var centralRow = new Phaser.GameObjects.Rectangle(this, SET_WIDTH / 2 - this.spessoreBordi / 2, this.spessoreBordi, this.spessoreBordi, SET_HEIGHT);
        var leftThird = new Phaser.GameObjects.Rectangle(this, (SET_WIDTH - this.raggioAngoli * 2) / 4 + this.raggioAngoli, this.spessoreBordi, this.spessoreBordi, SET_HEIGHT - this.spessoreBordi * 2);
        var rightThird = new Phaser.GameObjects.Rectangle(this, (SET_WIDTH - this.raggioAngoli * 2) / 4 * 3 + this.raggioAngoli, this.spessoreBordi, this.spessoreBordi, SET_HEIGHT - this.spessoreBordi * 2);

        /*var angleA = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli / 2, this.raggioAngoli / 2, 50, 1);
        angleA.setAngle(45);
        var angleB = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli / 2, this.raggioAngoli / 2, 50, 1);
        angleB.setAngle(135);
        var angleC = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli / 2, SET_HEIGHT - this.raggioAngoli / 2, 50, 1);
        angleC.setAngle(135);
        var angleD = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli / 2, SET_HEIGHT - this.raggioAngoli / 2, 50, 1);
        angleD.setAngle(45);*/

        var leftNetRow = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli, this.spessoreBordi, this.spessoreBordi / 2 + 1, SET_HEIGHT - 2 * this.spessoreBordi);
        var rightNetRow = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli - 2 * this.spessoreBordi - this.spessoreBordi / 2, this.spessoreBordi, this.spessoreBordi / 2 + 1, SET_HEIGHT - 2 * this.spessoreBordi);

        var borders = Array(highSide, lowSide, leftSide, rightSide);

        //lati porte solidi
        borders.push(new Phaser.GameObjects.Rectangle(this, this.raggioAngoli / 2, SET_HEIGHT / 2 - this.raggioAngoli/3 + this.spessoreBordi, 2, this.raggioAngoli / 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, this.raggioAngoli - this.spessoreBordi*2, SET_HEIGHT / 2 - this.raggioAngoli / 2, this.raggioAngoli / 2 + this.spessoreBordi, 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, this.raggioAngoli - this.spessoreBordi*2, SET_HEIGHT / 2 + this.raggioAngoli / 2, this.raggioAngoli / 2 + this.spessoreBordi, 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli / 2 - this.spessoreBordi*2, SET_HEIGHT / 2 - this.raggioAngoli/3 + this.spessoreBordi, 2, this.raggioAngoli / 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli, SET_HEIGHT / 2 - this.raggioAngoli / 2, this.raggioAngoli / 2 + this.spessoreBordi, 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli, SET_HEIGHT / 2 - this.raggioAngoli / 2 + this.raggioAngoli, this.raggioAngoli / 2 + this.spessoreBordi, 2));

        this.bordersGroup = this.physics.add.staticGroup();
        for (var i = 0; i < borders.length; i++) {
            this.physics.add.existing(borders[i], true);
            this.physics.world.enable(borders[i]);
            if (i < 2) {
                borders[i].body.setSize(borders[i].width * 2, borders[i].height, false);
            } else {
                borders[i].body.setSize(borders[i].width, borders[i].height * 2, false);
            }
            this.bordersGroup.add(borders[i]);
        }

        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                this.physics.add.collider(this.teams[i].players[j], this.bordersGroup);
            }
        }

        var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });

        graphics.fillRectShape(highSide);
        graphics.fillRectShape(lowSide);
        graphics.fillRectShape(leftSide);
        graphics.fillRectShape(rightSide);

        graphics = this.add.graphics({ fillStyle: { color: 0xFF0000 } });

        graphics.fillRectShape(centralRow);
        graphics.fillRectShape(rightNetRow);
        graphics.fillRectShape(leftNetRow);

        graphics = this.add.graphics({ fillStyle: { color: 0x0000FF } });

        graphics.fillRectShape(rightThird);
        graphics.fillRectShape(leftThird);

        graphics = this.add.graphics();
        graphics.lineStyle(this.spessoreBordi, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(SET_WIDTH - this.raggioAngoli - this.spessoreBordi / 2, SET_HEIGHT - this.raggioAngoli - this.spessoreBordi / 2, this.raggioAngoli, 0.5 * Math.PI, 0, true);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc(this.raggioAngoli + this.spessoreBordi / 2, SET_HEIGHT - this.raggioAngoli - this.spessoreBordi / 2, this.raggioAngoli, 1 * Math.PI, 0.5 * Math.PI, true);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc(this.raggioAngoli + this.spessoreBordi / 2, this.raggioAngoli + this.spessoreBordi / 2, this.raggioAngoli, 1.5 * Math.PI, 1 * Math.PI, true);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc(SET_WIDTH - (this.raggioAngoli + this.spessoreBordi / 2), this.raggioAngoli + this.spessoreBordi / 2, this.raggioAngoli, 0, 1.5 * Math.PI, true);
        graphics.strokePath();
        graphics.lineStyle(this.spessoreBordi, 0x0000FF, 1);
        graphics.beginPath();
        graphics.arc(SET_WIDTH / 2, SET_HEIGHT / 2, this.raggioAngoli, 0, 2 * Math.PI, true);
        graphics.strokePath();
        graphics.fillStyle(0xFF0000, 1);
        graphics.beginPath();
        graphics.arc(SET_WIDTH / 2, SET_HEIGHT / 2, this.spessoreBordi * 2, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.lineStyle(this.spessoreBordi / 2, 0xFF0000, 1);
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + this.raggioAngoli, SET_HEIGHT / 4, this.raggioAngoli, 0, 2 * Math.PI);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + this.raggioAngoli, SET_HEIGHT / 4 * 3, this.raggioAngoli, 0, 2 * Math.PI);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 * 3 + this.raggioAngoli, SET_HEIGHT / 4, this.raggioAngoli, 0, 2 * Math.PI);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 * 3 + this.raggioAngoli, SET_HEIGHT / 4 * 3, this.raggioAngoli, 0, 2 * Math.PI);
        graphics.strokePath();
        graphics.fillStyle(0xFF0000, 1);
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 + this.raggioAngoli, SET_HEIGHT / 4, this.spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 + this.raggioAngoli, SET_HEIGHT / 4 * 3, this.spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 * 2 + this.raggioAngoli, SET_HEIGHT / 4, this.spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 * 2 + this.raggioAngoli, SET_HEIGHT / 4 * 3, this.spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 * 3 + this.raggioAngoli, SET_HEIGHT / 4, this.spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 * 3 + this.raggioAngoli, SET_HEIGHT / 4 * 3, this.spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 * 0 + this.raggioAngoli, SET_HEIGHT / 4, this.spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * this.raggioAngoli) / 8 + (SET_WIDTH - 2 * this.raggioAngoli) / 4 * 0 + this.raggioAngoli, SET_HEIGHT / 4 * 3, this.spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.fillStyle(0x43c2e8, 1);
        graphics.beginPath();
        graphics.arc(this.raggioAngoli, SET_HEIGHT / 2, this.raggioAngoli / 2, 0.5 * Math.PI, 1.5 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc(SET_WIDTH - this.raggioAngoli - this.spessoreBordi * 2 + 1, SET_HEIGHT / 2, this.raggioAngoli / 2, 1.5 * Math.PI, 0.5 * Math.PI, true);
        graphics.fillPath();
        //disegno porte
        graphics.lineStyle(this.spessoreBordi, 0x000000, 1);
        graphics.beginPath();
        var leftNet = graphics.arc(this.raggioAngoli, SET_HEIGHT / 2, this.raggioAngoli / 2, 1.5 * Math.PI, 0.5 * Math.PI, true);
        graphics.strokePath();
        graphics.beginPath();
        var rightNet = graphics.arc(SET_WIDTH - this.raggioAngoli - this.spessoreBordi * 2 + 1, SET_HEIGHT / 2, this.raggioAngoli / 2, 0.5 * Math.PI, 1.5 * Math.PI, true);
        graphics.strokePath();

        this.createPuck();
    }


    update(time, delta) {
        //aggiorna le posizioni dei player
        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                this.teams[i].players[j].update();
                this.physics.world.collide(this.teams[i].players[j], this.borders);
            }
        }

        // If the player scored in the enemy net add a point to the player
        // if not remove a point from the player
        if(this.puck.scoredLeft || this.puck.scoredRight){
            if(this.puck.scoredLeft){
                if(this.puck.player.team == this.teams[1]){
                    this.puck.player.scoredGoals++;
                }
                this.teams[1].score++;
            }else{
                if(this.puck.player.team == this.teams[0]){
                    this.puck.player.scoredGoals++;
                }
                this.teams[0].score++;
            }

            //riavvia il puck e rimette i collider
            this.puck.destroy();
            this.createPuck();
            this.puck.setPosition(SET_WIDTH/2, SET_HEIGHT/2);
            this.puck.body.setVelocity(0,0);
            for(var i = 0; i < this.teams.length; i++){
                for(var j = 0; j < this.teams[i].players.length; j++){
                    var puckCollider = this.physics.add.collider(this.teams[i].players[j], this.puck, this.changePuckOwner);
                    this.teams[i].players[j].setPuckCollider(puckCollider);
                }
            }

            //riavvia le posizioni dei player
            for (let i = 0; i < this.teams.length; i++) {
                for (let j = 0; j < this.teams[i].players.length; j++) {
                    if(i == 0){
                        this.teams[i].players[j].setPosition(SET_WIDTH/4, SET_HEIGHT/2);
                    }else{
                        this.teams[i].players[j].setPosition((SET_WIDTH/4)*3, SET_HEIGHT/2);
                    }
                }
            }

            this.updateLeaderboard();
            this.puck.scoredLeft = false;
            this.puck.scoredRight = false;
        }
        this.puck.update();
    }

    //crea un player, invocato quando un player si connette
    createPlayer(name, ip) {
        var team = this.autoSetTeam();
        var x;
        var y;
        //le posizioni dei player sono fatte in base al team
        if(team == this.teams[0]){
            x = SET_WIDTH/4;
            y = SET_HEIGHT/2;
        }else{
            x = (SET_WIDTH/4)*3;
            y = SET_HEIGHT/2;
        }
        var p = new Player(this, name, x, y, ip, team);
        team.addPlayer(p);
        console.debug('new player added ' + name);
        var puckCollider = this.physics.add.collider(p, this.puck, this.changePuckOwner);
        this.physics.add.collider(p, this.bordersGroup, this.createBorderCollide);
        p.setPuckCollider(puckCollider);
    }

    createBorderCollide(player, border) {}

    //quando il puck viene preso da un altro giocatore, invoca questo metodo
    //si occupa di rimettere il collider al giocatore che aveva il puck e toglierlo al giocatore che lo riceve
    changePuckOwner(player, puck) {
        console.log('changePuckOwner to: ' + player.name);
        if (puck.beingShoot == true) {
            puck.beingShoot = false;
            puck.player.addCollider();
        }
        if (puck.player != null) {
            puck.player.addCollider();
        }
        puck.setPlayer(player);
        puck.player.removeCollider();
    }

    //crea il puck all'interno del campo, setta i collider e gli overlap che il puck possiede
    createPuck() {
        this.puck = new Puck(this, SET_WIDTH / 2, SET_HEIGHT / 2);
        //crea le reti
        this.puck.leftRowScore = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli, SET_HEIGHT / 2 - this.raggioAngoli / 2 + 43, this.spessoreBordi / 2 + 1, SET_HEIGHT / 9);
        this.puck.rightRowScore = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli - 2 * this.spessoreBordi - this.spessoreBordi / 2 + 2, SET_HEIGHT / 2 - this.raggioAngoli / 2 + 43, this.spessoreBordi / 2 + 1, SET_HEIGHT / 9);
        this.physics.world.enable(this.puck.leftRowScore);
        this.physics.world.enable(this.puck.rightRowScore);
        //collider per i bordi del campo
        this.physics.add.collider(this.puck, this.bordersGroup);
        //overlap per reti delle porte
        this.physics.add.overlap(this.puck, this.puck.rightRowScore, this.scoreRight);
        this.physics.add.overlap(this.puck, this.puck.leftRowScore, this.scoreLeft);
        //ogni rimbalzo dimezza la velocità
        this.puck.body.setBounce(0.5,0.5);
    }

    updateLeaderboard() {
        //aggiorno lo score di entrambe le squadre
        document.getElementById('team1').innerHTML = this.teams[0].score;
        document.getElementById('team2').innerHTML = this.teams[1].score;

        //creo una nuova leaderboard per aggiornarla, allPlayers conterrà i player ordinati per score
        var leaderboard = new Array();
        var allPlayers = new Array();
        for (var i = 0; i < this.teams[0].players.length; i++) {
            allPlayers.push(this.teams[0].players[i]);
        }
        for (var i = 0; i < this.teams[1].players.length; i++) {
            allPlayers.push(this.teams[1].players[i]);
        }
        allPlayers.sort(function(a,b){return b-a});

        //leaderboard contiene al massimo 10 players
        var max = 0;
        if (allPlayers.length >= 10) {
            max = 10;
        } else {
            max = allPlayers.length;
        }
        for (var i = 0; i < max; i++) {
            leaderboard.push(allPlayers[i]);
        }

        //cambio la leaderboard presente nell'html
        let theExport = "<table>";
        theExport += '<tr><td>Name</td><td>Points</td></tr>';
        leaderboard.forEach((player) => theExport += '<tr><td>' + player.name + '</td><td>' + player.scoredGoals + '</td></tr>');
        theExport += '</table>';
        document.getElementById("leaderBoard").innerHTML = theExport;
    }

    //cambia team ad un player
    switchTeam(player) { // TODO change color player (this.fillColor is not a function player.js:42)
        if (this.teams[0].players.indexOf(player) != -1) {
            this.teams[0].removePlayer(player);
            this.teams[1].addPlayer(player);
            player.setColor(this.teams[1]);
        } else {
            this.teams[1].removePlayer(player);
            this.teams[0].addPlayer(player);
            player.setColor(this.teams[0]);
        }
    }

    //ritorna il team con meno player
    autoSetTeam() {
        if (this.teams[0].players.length > this.teams[1].players.length) {
            return this.teams[1];
        }
        return this.teams[0];
    }

    //evento scatenato se si segna a sinistra
    scoreLeft(puck, net) {
        puck.scoredLeft = true;
        console.log("il puck è entrato nella porta sinistra");
    }

    //evento scatenato se si segna a destra
    scoreRight(puck, net) {
        puck.scoredRight = true;
        console.log("il puck è entrato nella porta destra");
    }

    //tramite l'ip ritorna un player
    getPlayerByIp(ip) {
        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                if (this.teams[i].players[j].ip == ip) {
                    return this.teams[i].players[j];
                }
            }
        }
    }

    //metodo invocato quando il player lancia il puck
    shoot() {
        console.log("puck shooted");
        this.puck.beingShoot = true;
        //la direzione del puck dipende dall'ultimo movimento fatto dal player
        this.puck.body.setVelocity(this.puck.player.lastX, this.puck.player.lastY);
    }
}