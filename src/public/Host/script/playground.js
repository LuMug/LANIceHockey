function printPlayground(){
    var c = document.getElementById("playground");
    var ctx = c.getContext("2d");

    var spessoreBalaustre = 8;
    var raggioAngoli = 85;
    var h = c.height;
    var w = c.width;
    ctx.strokeStyle="BLACK";
    ctx.fillStyle="BLACK";

    //CONTORNO CAMPO
    // //OLD
    // ctx.beginPath();
    // ctx.arc(658, 308, 50, 0, 0.5*Math.PI);
    // ctx.arc(58, 308, 50, 0.5*Math.PI, 1*Math.PI);
    // ctx.arc(58, 58, 50, 1*Math.PI, 1.5*Math.PI);
    // ctx.arc(658, 58, 50, 1.5*Math.PI, 0);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(658, 308, 51, 0, 0.5*Math.PI);
    // ctx.arc(58, 308, 51, 0.5*Math.PI, 1*Math.PI);
    // ctx.arc(58, 58, 51, 1*Math.PI, 1.5*Math.PI);
    // ctx.arc(658, 58, 51, 1.5*Math.PI, 0);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(658, 308, 52, 0, 0.5*Math.PI);
    // ctx.arc(58, 308, 52, 0.5*Math.PI, 1*Math.PI);
    // ctx.arc(58, 58, 52, 1*Math.PI, 1.5*Math.PI);
    // ctx.arc(658, 58, 52, 1.5*Math.PI, 0);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(658, 308, 53, 0, 0.5*Math.PI);
    // ctx.arc(58, 308, 53, 0.5*Math.PI, 1*Math.PI);
    // ctx.arc(58, 58, 53, 1*Math.PI, 1.5*Math.PI);
    // ctx.arc(658, 58, 53, 1.5*Math.PI, 0);
    // ctx.stroke();
    // ctx.fillRect(707,58,5,250);
    //NEW
    for (let i = 0; i < spessoreBalaustre; i++) {
        ctx.beginPath();
        ctx.arc(w-(raggioAngoli+spessoreBalaustre), h-(raggioAngoli+spessoreBalaustre), raggioAngoli+i, 0, 0.5*Math.PI);
        ctx.arc(raggioAngoli+spessoreBalaustre, h-(raggioAngoli+spessoreBalaustre), raggioAngoli+i, 0.5*Math.PI, 1*Math.PI);
        ctx.arc(raggioAngoli+spessoreBalaustre, raggioAngoli+spessoreBalaustre, raggioAngoli+i, 1*Math.PI, 1.5*Math.PI);
        ctx.arc(w-(raggioAngoli+spessoreBalaustre), raggioAngoli+spessoreBalaustre, raggioAngoli+i, 1.5*Math.PI, 0);
        ctx.stroke();
    }
    ctx.fillRect(w-spessoreBalaustre,raggioAngoli+spessoreBalaustre,spessoreBalaustre,h-2*raggioAngoli);
    //RIGA CENTRALE
    //OLD
    // ctx.fillStyle = "RED";
    // ctx.fillRect(355,8,6,350);
    //NEW
    ctx.fillStyle = "RED";
    ctx.fillRect(w/2-spessoreBalaustre/2,spessoreBalaustre,spessoreBalaustre,h-spessoreBalaustre*2);
    //RIGHE DEI TERZI
    //OLD
    // ctx.fillStyle = "BLUE";
    // ctx.fillRect(205,8,6,350);
    // ctx.fillRect(505,8,6,350);
    // ctx.stroke();
    //NEW
    ctx.fillStyle = "BLUE";
    ctx.fillRect((w-raggioAngoli*2)/4+raggioAngoli,spessoreBalaustre,spessoreBalaustre,h-spessoreBalaustre*2);
    ctx.fillRect((w-raggioAngoli*2)/4*3+raggioAngoli,spessoreBalaustre,spessoreBalaustre,h-spessoreBalaustre*2);
    ctx.stroke();
    //CERCHIO E ZONA DI INGAGGIO CENTRALE
    //OLD
    // ctx.beginPath();
    // ctx.arc(358, 183, 50, 0, 2*Math.PI);
    // ctx.arc(358, 183, 51, 0, 2*Math.PI);
    // ctx.arc(358, 183, 52, 0, 2*Math.PI);
    // ctx.arc(358, 183, 53, 0, 2*Math.PI);
    // ctx.strokeStyle="BLUE";
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(358, 183, 8, 0, 2*Math.PI);
    //NEW
    ctx.beginPath();
    for (let i = 0; i < spessoreBalaustre; i++) {
        ctx.arc(w/2, h/2, raggioAngoli+i, 0, 2*Math.PI);
    }
    ctx.strokeStyle="BLUE";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w/2, h/2, spessoreBalaustre*2, 0, 2*Math.PI);
    //LINEE PORTE
    //OLD
    // ctx.fillStyle = "RED";
    // ctx.strokeStyle="RED";
    // ctx.fillRect(58,8,4,350);
    // ctx.fillRect(658,8,4,350);
    // ctx.fill();
    // ctx.stroke();
    //NEW
    ctx.fillStyle = "RED";
    ctx.strokeStyle="RED";
    ctx.fillRect(raggioAngoli+spessoreBalaustre,spessoreBalaustre,spessoreBalaustre/2+1,h-2*spessoreBalaustre);
    ctx.fillRect(w-raggioAngoli-spessoreBalaustre,spessoreBalaustre,spessoreBalaustre/2+1,h-2*spessoreBalaustre);
    ctx.fill();
    ctx.stroke();
    //ZONE INGAGGIO LATERALI
    //OLD
    // ctx.beginPath();
    // ctx.arc(130, 100, 5, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(130, 100, 50, 0, 2*Math.PI);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.beginPath();
    // ctx.arc(280, 100, 5, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(430, 100, 5, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(580, 100, 5, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(580, 100, 50, 0, 2*Math.PI);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.beginPath();
    // ctx.arc(130, 266, 5, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(130, 266, 50, 0, 2*Math.PI);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(280, 266, 5, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(430, 266, 5, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(580, 266, 5, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(580, 266, 50, 0, 2*Math.PI);
    // ctx.stroke();
    //NEW
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc((w-2*raggioAngoli)/8+(w-2*raggioAngoli)/4*i+raggioAngoli, h/4, spessoreBalaustre, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc((w-2*raggioAngoli)/8+(w-2*raggioAngoli)/4*i+raggioAngoli, h/4*3, spessoreBalaustre, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc((w-2*raggioAngoli)/8+raggioAngoli, h/4, raggioAngoli, 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc((w-2*raggioAngoli)/8+raggioAngoli, h/4*3, raggioAngoli, 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc((w-2*raggioAngoli)/8+(w-2*raggioAngoli)/4*3+raggioAngoli, h/4, raggioAngoli, 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc((w-2*raggioAngoli)/8+(w-2*raggioAngoli)/4*3+raggioAngoli, h/4*3, raggioAngoli, 0, 2*Math.PI);
    ctx.stroke();
    
    //AREE
    //OLD
    // ctx.fillStyle = "LIGHTBLUE";
    // ctx.beginPath();
    // ctx.arc(58, 183, 20,1.5*Math.PI, 0.5*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(662, 183, 20,0.5*Math.PI, 1.5*Math.PI);
    // ctx.fill();
    // ctx.stroke();
    //NEW
    ctx.fillStyle = "LIGHTBLUE";
    ctx.beginPath();
    ctx.arc(raggioAngoli+spessoreBalaustre, h/2, raggioAngoli/2,1.5*Math.PI, 0.5*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w-raggioAngoli-spessoreBalaustre/2+1, h/2, raggioAngoli/2,0.5*Math.PI, 1.5*Math.PI);
    ctx.fill();
    ctx.stroke();
    //PORTE
    //OLD
    // ctx.strokeStyle="BLACK";
    // ctx.beginPath();
    // ctx.arc(58, 183, 15,0.5*Math.PI, 1.5*Math.PI);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(662, 183, 15,1.5*Math.PI, 0.5*Math.PI);
    // ctx.stroke();
    //NEW
    ctx.strokeStyle="BLACK";
    ctx.beginPath();
    ctx.arc(raggioAngoli+spessoreBalaustre, h/2, raggioAngoli/2-spessoreBalaustre*2,0.5*Math.PI, 1.5*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w-raggioAngoli-spessoreBalaustre/2+1, h/2, raggioAngoli/2-spessoreBalaustre*2,1.5*Math.PI, 0.5*Math.PI);
    ctx.stroke();
}