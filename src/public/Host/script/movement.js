import { Team } from "../models/Team.js";
import { Player } from "../models/Player.js";
import { Game } from "../models/Game.js";

var movement;



var teamGreen = new Team("GREEN");
var teamYellow = new Team("YELLOW");
var player = new Player("Xavi",100,100);
teamGreen.addPlayer(player);
var game = new Game(teamGreen,teamYellow);

function nippleMove(evt, data) {
    console.log(data.angle.degree);

    player.angle = data.angle.degree;
    player.velocita = data.distance;
}

function move(){
    if(angle < 22.5){
        x++;
    }else if(angle > 22.5 && angle < 67.5){
        x++;
        y--;
    }else if(angle > 67.5 && angle < 112.5){
        y--;
    }else if(angle > 112.5 && angle < 157.5){
        x--;
        y--;
    }else if(angle > 157.5 && angle < 202.5){
        x--;
    }else if(angle > 202.5 && angle < 247.5){
        x--;
        y++;
    }else if(angle > 247.5 && angle < 292.5){
        y++;
    }else if (angle > 292.5 && angle < 337,5){  
        x++;
        y++;
    }

    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");
    
    var h = c.height;
    var w = c.width;

    ctx.clearRect(0, 0, w, h);
    printPlayground();
    ctx.strokeStyle= player.team.color;
    ctx.fillStyle = player.team.color;
    ctx.beginPath();
    ctx.arc(player.pos.x, player.pos.y, player.dimension, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
}

function startMovement(){
    movement = setInterval(move, 10);
}

function endMovement(){
    clearInterval(movement);
}