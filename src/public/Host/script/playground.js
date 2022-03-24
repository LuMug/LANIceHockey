function printPlayground() {
    var c = document.getElementById("campo");
    var ctx = c.getContext("2d");

    var spessoreBalaustre = 8;
    var raggioAngoli = 85;
    var h = c.height;
    var w = c.width;
    ctx.strokeStyle = "BLACK";
    ctx.fillStyle = "BLACK";

    //CONTORNO CAMPO

    for (let i = 0; i < spessoreBalaustre; i++) {
        ctx.beginPath();
        ctx.arc(w - (raggioAngoli + spessoreBalaustre), h - (raggioAngoli + spessoreBalaustre), raggioAngoli + i, 0, 0.5 * Math.PI);
        ctx.arc(raggioAngoli + spessoreBalaustre, h - (raggioAngoli + spessoreBalaustre), raggioAngoli + i, 0.5 * Math.PI, 1 * Math.PI);
        ctx.arc(raggioAngoli + spessoreBalaustre, raggioAngoli + spessoreBalaustre, raggioAngoli + i, 1 * Math.PI, 1.5 * Math.PI);
        ctx.arc(w - (raggioAngoli + spessoreBalaustre), raggioAngoli + spessoreBalaustre, raggioAngoli + i, 1.5 * Math.PI, 0);
        ctx.stroke();
    }
    ctx.fillRect(w - spessoreBalaustre, raggioAngoli + spessoreBalaustre, spessoreBalaustre, h - 2 * raggioAngoli);
    //RIGA CENTRALE

    ctx.fillStyle = "RED";
    ctx.fillRect(w / 2 - spessoreBalaustre / 2, spessoreBalaustre, spessoreBalaustre, h - spessoreBalaustre * 2);
    //RIGHE DEI TERZI

    ctx.fillStyle = "BLUE";
    ctx.fillRect((w - raggioAngoli * 2) / 4 + raggioAngoli, spessoreBalaustre, spessoreBalaustre, h - spessoreBalaustre * 2);
    ctx.fillRect((w - raggioAngoli * 2) / 4 * 3 + raggioAngoli, spessoreBalaustre, spessoreBalaustre, h - spessoreBalaustre * 2);
    ctx.stroke();
    //CERCHIO E ZONA DI INGAGGIO CENTRALE

    ctx.beginPath();
    for (let i = 0; i < spessoreBalaustre; i++) {
        ctx.arc(w / 2, h / 2, raggioAngoli + i, 0, 2 * Math.PI);
    }
    ctx.strokeStyle = "BLUE";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, spessoreBalaustre * 2, 0, 2 * Math.PI);
    //LINEE PORTE

    ctx.fillStyle = "RED";
    ctx.strokeStyle = "RED";
    ctx.fillRect(raggioAngoli + spessoreBalaustre, spessoreBalaustre, spessoreBalaustre / 2 + 1, h - 2 * spessoreBalaustre);
    ctx.fillRect(w - raggioAngoli - spessoreBalaustre, spessoreBalaustre, spessoreBalaustre / 2 + 1, h - 2 * spessoreBalaustre);
    ctx.fill();
    ctx.stroke();
    //ZONE INGAGGIO LATERALI

    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc((w - 2 * raggioAngoli) / 8 + (w - 2 * raggioAngoli) / 4 * i + raggioAngoli, h / 4, spessoreBalaustre, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc((w - 2 * raggioAngoli) / 8 + (w - 2 * raggioAngoli) / 4 * i + raggioAngoli, h / 4 * 3, spessoreBalaustre, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc((w - 2 * raggioAngoli) / 8 + raggioAngoli, h / 4, raggioAngoli, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc((w - 2 * raggioAngoli) / 8 + raggioAngoli, h / 4 * 3, raggioAngoli, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc((w - 2 * raggioAngoli) / 8 + (w - 2 * raggioAngoli) / 4 * 3 + raggioAngoli, h / 4, raggioAngoli, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc((w - 2 * raggioAngoli) / 8 + (w - 2 * raggioAngoli) / 4 * 3 + raggioAngoli, h / 4 * 3, raggioAngoli, 0, 2 * Math.PI);
    ctx.stroke();

    //AREE

    //NEW
    ctx.fillStyle = "LIGHTBLUE";
    ctx.beginPath();
    ctx.arc(raggioAngoli + spessoreBalaustre, h / 2, raggioAngoli / 2, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w - raggioAngoli - spessoreBalaustre / 2 + 1, h / 2, raggioAngoli / 2, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.fill();
    ctx.stroke();
    //PORTE

    //NEW
    ctx.strokeStyle = "BLACK";
    ctx.beginPath();
    ctx.arc(raggioAngoli + spessoreBalaustre, h / 2, raggioAngoli / 2 - spessoreBalaustre * 2, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w - raggioAngoli - spessoreBalaustre / 2 + 1, h / 2, raggioAngoli / 2 - spessoreBalaustre * 2, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.stroke();
}