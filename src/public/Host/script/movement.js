import  Team  from "../models/team.js";
import  Player  from "../models/player.js";

export default class Movement{
    movement;
    team;
    player;

    constructor(){
        this.team = new Team("GREEN");
        this.player = new Player("Xavi",100,100);
        this.team.addPlayer(this.player);
    }

    nippleMove(evt, data) {
        console.log(data.angle.degree);

        this.player.angle = data.angle.degree;
        this.player.velocita = data.distance;
    }

    move(player){
        if(player.angle < 22.5){
            player.pos.x++;
        }else if(player.angle > 22.5 && player.angle < 67.5){
            player.pos.x++;
            player.pos.y--;
        }else if(player.angle > 67.5 && player.angle < 112.5){
            player.pos.y--;
        }else if(player.angle > 112.5 && player.angle < 157.5){
            player.pos.x--;
            player.pos.y--;
        }else if(player.angle > 157.5 && player.angle < 202.5){
            player.pos.x--;
        }else if(player.angle > 202.5 && player.angle < 247.5){
            player.pos.x--;
            player.pos.y++;
        }else if(player.angle > 247.5 && player.angle < 292.5){
            player.pos.y++;
        }else if (player.angle > 292.5 && player.angle < 337,5){  
            player.pos.x++;
            player.pos.y++;
        }

        var c = document.getElementById("playground");
        var ctx = c.getContext("2d");
        
        var h = c.height;
        var w = c.width;

        ctx.clearRect(0, 0, w, h);
        printPlayground();
        ctx.strokeStyle= this.player.team.color;
        ctx.fillStyle = this.player.team.color;
        ctx.beginPath();
        ctx.arc(this.player.pos.x, this.player.pos.y, this.player.dimension, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    startMovement(){
        this.movement = setInterval(this.move(this.player) , 100);
    }

    endMovement(){
        clearInterval(this.movement);
    }
}