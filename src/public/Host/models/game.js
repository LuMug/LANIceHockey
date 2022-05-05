import Player from "./player.js";
import Team from "./team.js";
import Host from "../script/hostConnection.js"
import Puck from "./puck.js";
import { SET_HEIGHT, SET_WIDTH } from "../script/main.js";

export default class Game extends Phaser.Scene {

    teams;
    bordersGroup;
    puck;
    raggioAngoli;
    spessoreBordi;

    /**
     * questo metodo serve ad istanziare una nuova partita, 
     * richiama il costruttore della superclasse, crea due 
     * player di default (in futuro si potrebbero rendere customizabili) 
     * e infine creo l'Host della partita.
     */
    constructor() {
        super({ key: 'Game' });
        this.teams = new Array(new Team("Green", 0x05871b), new Team("Yellow", 0xf0d31a));
        new Host(this);
    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    /**
     * questo metodo viene richiamato da Phaser alla 
     * creazione dell'oggetto, lo utiliziamo per disegnare 
     * il campo e creare il puck.
     */
    create() {
        this.createPlayGround();

        this.createPuck();

        var resetPuckFunc = function rPuck(puck = this.puck) {
            puck.beingShoot = false;
            if (puck.player != null) {
                puck.player.addCollider();
            }
            puck.player = null;
            puck.setPosition(SET_WIDTH / 2, SET_HEIGHT / 2);
            puck.body.setVelocity(0, 0);
        };
        document.getElementById('resetPuck').onclick = resetPuckFunc;
    }

    createPlayGround() {
        this.spessoreBordi = 8;
        this.raggioAngoli = 85;
        var highSide = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli, 0, SET_WIDTH - 2 * this.raggioAngoli, this.spessoreBordi);
        var lowSide = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli, SET_HEIGHT - this.spessoreBordi, SET_WIDTH - 2 * this.raggioAngoli, this.spessoreBordi);
        var leftSide = new Phaser.GameObjects.Rectangle(this, 0, this.raggioAngoli, this.spessoreBordi, SET_HEIGHT - 2 * this.raggioAngoli);
        var rightSide = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.spessoreBordi, this.raggioAngoli, this.spessoreBordi, SET_HEIGHT - 2 * this.raggioAngoli);
        var centralRow = new Phaser.GameObjects.Rectangle(this, SET_WIDTH / 2 - this.spessoreBordi / 2, this.spessoreBordi, this.spessoreBordi, SET_HEIGHT);
        var leftThird = new Phaser.GameObjects.Rectangle(this, (SET_WIDTH - this.raggioAngoli * 2) / 4 + this.raggioAngoli, this.spessoreBordi, this.spessoreBordi, SET_HEIGHT - this.spessoreBordi * 2);
        var rightThird = new Phaser.GameObjects.Rectangle(this, (SET_WIDTH - this.raggioAngoli * 2) / 4 * 3 + this.raggioAngoli, this.spessoreBordi, this.spessoreBordi, SET_HEIGHT - this.spessoreBordi * 2);


        var leftNetRow = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli, this.spessoreBordi, this.spessoreBordi / 2 + 1, SET_HEIGHT - 2 * this.spessoreBordi);
        var rightNetRow = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli - 2 * this.spessoreBordi - this.spessoreBordi / 2, this.spessoreBordi, this.spessoreBordi / 2 + 1, SET_HEIGHT - 2 * this.spessoreBordi);

        var porta11 = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli / 2, SET_HEIGHT / 2 - this.raggioAngoli / 3 + this.spessoreBordi, 2, this.raggioAngoli / 2);
        var porta12 = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli - this.spessoreBordi * 2, SET_HEIGHT / 2 - this.raggioAngoli / 2, this.raggioAngoli / 2 + this.spessoreBordi, 2);
        var porta13 = new Phaser.GameObjects.Rectangle(this, this.raggioAngoli - this.spessoreBordi * 2, SET_HEIGHT / 2 + this.raggioAngoli / 2, this.raggioAngoli / 2 + this.spessoreBordi, 2);
        var porta21 = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli / 2 - this.spessoreBordi * 2, SET_HEIGHT / 2 - this.raggioAngoli / 3 + this.spessoreBordi, 2, this.raggioAngoli / 2);
        var porta22 = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli, SET_HEIGHT / 2 - this.raggioAngoli / 2, this.raggioAngoli / 2 + this.spessoreBordi, 2);
        var porta23 = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli, SET_HEIGHT / 2 - this.raggioAngoli / 2 + this.raggioAngoli, this.raggioAngoli / 2 + this.spessoreBordi, 2);

        var borders = Array(highSide, lowSide, leftSide, rightSide, porta11, porta12, porta13, porta21, porta22, porta23);

        //lati porte solidi
        /*borders.push(new Phaser.GameObjects.Rectangle(this, this.raggioAngoli / 2, SET_HEIGHT / 2 - this.raggioAngoli / 3 + this.spessoreBordi, 2, this.raggioAngoli / 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, this.raggioAngoli - this.spessoreBordi * 2, SET_HEIGHT / 2 - this.raggioAngoli / 2, this.raggioAngoli / 2 + this.spessoreBordi, 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, this.raggioAngoli - this.spessoreBordi * 2, SET_HEIGHT / 2 + this.raggioAngoli / 2, this.raggioAngoli / 2 + this.spessoreBordi, 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli / 2 - this.spessoreBordi * 2, SET_HEIGHT / 2 - this.raggioAngoli / 3 + this.spessoreBordi, 2, this.raggioAngoli / 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli, SET_HEIGHT / 2 - this.raggioAngoli / 2, this.raggioAngoli / 2 + this.spessoreBordi, 2));
        borders.push(new Phaser.GameObjects.Rectangle(this, SET_WIDTH - this.raggioAngoli, SET_HEIGHT / 2 - this.raggioAngoli / 2 + this.raggioAngoli, this.raggioAngoli / 2 + this.spessoreBordi, 2)); */

        this.addBorderCollider(borders)

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
        graphics.arc(this.raggioAngoli, SET_HEIGHT / 2, this.raggioAngoli / 2, 1.5 * Math.PI, 0.5 * Math.PI, true);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc(SET_WIDTH - this.raggioAngoli - this.spessoreBordi * 2 + 1, SET_HEIGHT / 2, this.raggioAngoli / 2, 0.5 * Math.PI, 1.5 * Math.PI, true);
        graphics.strokePath();
    }

    addBorderCollider(borders) {
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
    }

    resetPuck() {
        this.puck.beingShoot = false;
        this.puck.player.addCollider();
        this.puck.player = null;
        this.puck.setPosition(SET_WIDTH / 2, SET_HEIGHT / 2);
        this.puck.body.setVelocity(0, 0);
    }

    update(time, delta) {
        //aggiorna le posizioni dei player
        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                this.teams[i].players[j].update();
                //this.physics.world.collide(this.teams[i].players[j], this.borders);
            }
        }

        // If the player scored in the enemy net add a point to the player
        // if not remove a point from the player
        if (this.puck.scoredLeft || this.puck.scoredRight) {
            if (this.puck.scoredLeft) {
                if (this.puck.player.team == this.teams[1]) {
                    this.puck.player.scoredGoals++;
                }
                this.teams[1].score++;
            } else {
                if (this.puck.player.team == this.teams[0]) {
                    this.puck.player.scoredGoals++;
                }
                this.teams[0].score++;
            }

            //riavvia il puck e rimette i collider
            //this.puck.destroy();
            //this.createPuck();
            this.resetPuck();
            //for(var i = 0; i < this.teams.length; i++){
            //    for(var j = 0; j < this.teams[i].players.length; j++){
            //        var puckCollider = this.physics.add.collider(this.teams[i].players[j], this.puck, this.changePuckOwner);
            //        this.teams[i].players[j].setPuckCollider(puckCollider);
            //    }
            //}

            //riavvia le posizioni dei player
            for (let i = 0; i < this.teams.length; i++) {
                for (let j = 0; j < this.teams[i].players.length; j++) {
                    if (i == 0) {
                        this.teams[i].players[j].setPosition(SET_WIDTH / 4, SET_HEIGHT / 2);
                    } else {
                        this.teams[i].players[j].setPosition((SET_WIDTH / 4) * 3, SET_HEIGHT / 2);
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
        if (team == this.teams[0]) {
            x = SET_WIDTH / 4;
            y = SET_HEIGHT / 2;
        } else {
            x = (SET_WIDTH / 4) * 3;
            y = SET_HEIGHT / 2;
        }
        var p = new Player(this, name, x, y, ip, team);
        team.addPlayer(p);
        console.debug('new player added ' + name);
        p.addCollider();
        this.physics.add.collider(p, this.bordersGroup);
    }


    //quando il puck viene preso da un altro giocatore, invoca questo metodo
    //si occupa di rimettere il collider al giocatore che aveva il puck e toglierlo al giocatore che lo riceve
    changePuckOwner(player, puck) {
        puck.bounced = 0;
        var prePlayer = puck.player;
        puck.beingShoot = false;
        puck.setPlayer(player);
        puck.player.removeCollider();
        puck.body.setVelocity(0, 0);

        setTimeout(() => {
            if (prePlayer != null && prePlayer != puck.player) {
                prePlayer.addCollider();
            }
        }, 150);
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
        this.physics.add.collider(this.puck, this.bordersGroup, this.puckBorderCollide);
        //overlap per reti delle porte
        this.physics.add.overlap(this.puck, this.puck.rightRowScore, this.scoreRight);
        this.physics.add.overlap(this.puck, this.puck.leftRowScore, this.scoreLeft);
        //ogni rimbalzo dimezza la velocità
        this.puck.body.setBounce(0.5, 0.5);
    }

    puckBorderCollide(puck, borders) {
        puck.bounced++;
        if (puck.beingShoot && puck.bounced <= 1) {
            puck.player.addCollider();
        }
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
        allPlayers.sort(function(a, b) { return b - a });

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
        if (!this.puck.beingShoot) {
            console.log("puck shooted");
            this.puck.beingShoot = true;
            //la direzione del puck dipende dall'ultimo movimento fatto dal player
            this.puck.body.setVelocity(this.puck.player.lastVelocityX * 2, this.puck.player.lastVelocityY * 2);
        }
    }


}