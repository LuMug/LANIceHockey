import Player from "./player.js";
import Team from "./team.js";
import Host from "../script/hostConnection.js"
import Puck from "./puck.js";
import { SET_HEIGHT, SET_WIDTH } from "../script/main.js";

export default class Game extends Phaser.Scene {

    leaderboard = new Array();
    teams;
    bordersGroup;
    puck;

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
        var spessoreBordi = 8;
        var raggioAngoli = 85;
        var highSide = new Phaser.GameObjects.Rectangle(this, raggioAngoli, 20, SET_WIDTH - 2 * raggioAngoli, spessoreBordi);
        var lowSide = new Phaser.GameObjects.Rectangle(this, raggioAngoli, SET_HEIGHT - spessoreBordi, SET_WIDTH - 2 * raggioAngoli, spessoreBordi);
        var leftSide = new Phaser.GameObjects.Rectangle(this, 0, raggioAngoli, spessoreBordi, SET_HEIGHT - 2 * raggioAngoli);
        var rightSide = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - spessoreBordi, raggioAngoli, spessoreBordi, SET_HEIGHT - 2 * raggioAngoli);
        var centralRow = new Phaser.GameObjects.Rectangle(this, SET_WIDTH / 2 - spessoreBordi / 2, spessoreBordi, spessoreBordi, SET_HEIGHT);
        var leftThird = new Phaser.GameObjects.Rectangle(this, (SET_WIDTH - raggioAngoli * 2) / 4 + raggioAngoli, spessoreBordi, spessoreBordi, SET_HEIGHT - spessoreBordi * 2);
        var rightThird = new Phaser.GameObjects.Rectangle(this, (SET_WIDTH - raggioAngoli * 2) / 4 * 3 + raggioAngoli, spessoreBordi, spessoreBordi, SET_HEIGHT - spessoreBordi * 2);

        var leftNetRow = new Phaser.GameObjects.Rectangle(this, raggioAngoli, spessoreBordi, spessoreBordi / 2 + 1, SET_HEIGHT - 2 * spessoreBordi);
        var rightNetRow = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - raggioAngoli - 2 * spessoreBordi - spessoreBordi / 2, spessoreBordi, spessoreBordi / 2 + 1, SET_HEIGHT - 2 * spessoreBordi);

        var leftRowScore = new Phaser.GameObjects.Rectangle(this, raggioAngoli, SET_HEIGHT / 2 - raggioAngoli / 2, spessoreBordi / 2 + 1, SET_HEIGHT - 2 * spessoreBordi - raggioAngoli / 2);
        var rightRowScore = new Phaser.GameObjects.Rectangle(this, SET_WIDTH - raggioAngoli - 2 * spessoreBordi - spessoreBordi / 2, SET_HEIGHT / 2 - raggioAngoli / 2, spessoreBordi / 2 + 1, SET_HEIGHT - 2 * spessoreBordi - raggioAngoli / 2);

        var borders = Array(highSide, lowSide, leftSide, rightSide);

        this.bordersGroup = this.physics.add.staticGroup();
        for (var i = 0; i < borders.length; i++) {
            //borders[i].originX = 0;
            //borders[i].originY = 0;
            this.physics.add.existing(borders[i], true);
            this.physics.world.enable(borders[i]);
            borders[i].body.setSize(borders[i].width * 2, borders[i].height * 2, false);
            //this.physics.world.enableBody(borders[i]);
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
        graphics.fillRectShape(leftRowScore);
        graphics.fillRectShape(rightRowScore);

        graphics = this.add.graphics({ fillStyle: { color: 0xFF0000 } });

        graphics.fillRectShape(centralRow);
        graphics.fillRectShape(rightNetRow);
        graphics.fillRectShape(leftNetRow);

        graphics = this.add.graphics({ fillStyle: { color: 0x0000FF } });

        graphics.fillRectShape(rightThird);
        graphics.fillRectShape(leftThird);

        graphics = this.add.graphics();
        graphics.lineStyle(spessoreBordi, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(this, SET_WIDTH - raggioAngoli - spessoreBordi / 2, SET_HEIGHT - raggioAngoli - spessoreBordi / 2, raggioAngoli, 0.5 * Math.PI, 0, true);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc(this, raggioAngoli + spessoreBordi / 2, SET_HEIGHT - raggioAngoli - spessoreBordi / 2, raggioAngoli, 1 * Math.PI, 0.5 * Math.PI, true);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc(this, raggioAngoli + spessoreBordi / 2, raggioAngoli + spessoreBordi / 2, raggioAngoli, 1.5 * Math.PI, 1 * Math.PI, true);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc(this, SET_WIDTH - (raggioAngoli + spessoreBordi / 2), raggioAngoli + spessoreBordi / 2, raggioAngoli, 0, 1.5 * Math.PI, true);
        graphics.strokePath();
        graphics.lineStyle(spessoreBordi, 0x0000FF, 1);
        graphics.beginPath();
        graphics.arc(SET_WIDTH / 2, SET_HEIGHT / 2, raggioAngoli, 0, 2 * Math.PI, true);
        graphics.strokePath();
        graphics.fillStyle(0xFF0000, 1);
        graphics.beginPath();
        graphics.arc(SET_WIDTH / 2, SET_HEIGHT / 2, spessoreBordi * 2, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.lineStyle(spessoreBordi / 2, 0xFF0000, 1);
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + raggioAngoli, SET_HEIGHT / 4, raggioAngoli, 0, 2 * Math.PI);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + raggioAngoli, SET_HEIGHT / 4 * 3, raggioAngoli, 0, 2 * Math.PI);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 * 3 + raggioAngoli, SET_HEIGHT / 4, raggioAngoli, 0, 2 * Math.PI);
        graphics.strokePath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 * 3 + raggioAngoli, SET_HEIGHT / 4 * 3, raggioAngoli, 0, 2 * Math.PI);
        graphics.strokePath();
        graphics.fillStyle(0xFF0000, 1);
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 + raggioAngoli, SET_HEIGHT / 4, spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 + raggioAngoli, SET_HEIGHT / 4 * 3, spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 * 2 + raggioAngoli, SET_HEIGHT / 4, spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 * 2 + raggioAngoli, SET_HEIGHT / 4 * 3, spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 * 3 + raggioAngoli, SET_HEIGHT / 4, spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 * 3 + raggioAngoli, SET_HEIGHT / 4 * 3, spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 * 0 + raggioAngoli, SET_HEIGHT / 4, spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc((SET_WIDTH - 2 * raggioAngoli) / 8 + (SET_WIDTH - 2 * raggioAngoli) / 4 * 0 + raggioAngoli, SET_HEIGHT / 4 * 3, spessoreBordi, 0, 2 * Math.PI, true);
        graphics.fillPath();
        graphics.fillStyle(0x43c2e8, 1);
        graphics.beginPath();
        graphics.arc(raggioAngoli, SET_HEIGHT / 2, raggioAngoli / 2, 0.5 * Math.PI, 1.5 * Math.PI, true);
        graphics.fillPath();
        graphics.beginPath();
        graphics.arc(SET_WIDTH - raggioAngoli - spessoreBordi * 2 + 1, SET_HEIGHT / 2, raggioAngoli / 2, 1.5 * Math.PI, 0.5 * Math.PI, true);
        graphics.fillPath();
        graphics.lineStyle(spessoreBordi, 0x000000, 1);
        graphics.beginPath();
        var leftNet = graphics.arc(raggioAngoli, SET_HEIGHT / 2, raggioAngoli / 2, 1.5 * Math.PI, 0.5 * Math.PI, true);
        graphics.strokePath();
        graphics.beginPath();
        var rightNet = graphics.arc(SET_WIDTH - raggioAngoli - spessoreBordi * 2 + 1, SET_HEIGHT / 2, raggioAngoli / 2, 0.5 * Math.PI, 1.5 * Math.PI, true);
        graphics.strokePath();

        this.create_puck(rightNet, leftNet);
        this.physics.add.collider(this.puck, this.bordersGroup);
    }

    update(time, delta) {
        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                this.teams[i].players[j].update();
                this.physics.world.collide(this.teams[i].players[j], this.borders);
            }
        }
        this.puck.update();
    }

    create_player(name, ip) {
        var team = this.autoSetTeam();
        var p = new Player(this, name, 100, 100, ip, team);
        team.addPlayer(p);
        console.debug('new player added ' + name);
        var puckCollider = this.physics.add.collider(p, this.puck, this.change_puck_owner);
        this.physics.add.collider(p, this.bordersGroup, this.player_border_collide);
        p.setPuckCollider(puckCollider);
    }

    player_border_collide(player, border) {
        console.log(player);
    }

    change_puck_owner(player, puck) {
        console.log('change_puck_owner to: ' + player.name);
        if (puck.beingShoot == true) {
            puck.beingShoot = false;
            puck.player.addCollider();
        }

        puck.setPlayer(player);
        puck.player.removeCollider();
    }

    create_puck(net1, net2) {
        this.puck = new Puck(this, SET_WIDTH / 2, SET_HEIGHT / 2);
        this.physics.add.overlap(this.puck, net1, this.score);
        this.physics.add.overlap(this.puck, net2, this.score);
    }

    compare(a, b) {
        if (a.scoredGoals < b.scoredGoals) { // TODO PORCO D
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

    switchTeam(player) { // TODO AAAAA
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

    autoSetTeam() {
        if (this.teams[0].players.length > this.teams[1].players.length) {
            return this.teams[1];
        }
        return this.teams[0];
    }

    score(puck) {
        puck.player.scoredGoals++;
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

    shoot() {
        console.log("puck shooted");
        this.puck.beingShoot = true;
        puck.player.physics.world.removeCollider(puck.player.collider);
        this.puck.body.setVelocity(100, 100);
    }
}