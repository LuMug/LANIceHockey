//const json = require('./../../../settings.json');

//const ws = new WebSocket("ws://10.90.1.117:2389");
const ws = new WebSocket("ws://127.0.0.1:2389");

var currentTeam;

ws.addEventListener("open", () => {
    console.log("We are connected!");
    ws.send("client;" + window.sessionStorage.getItem("nomeUtente"));

    ws.onmessage = function(message) {
        console.log(message.data);
        if (message.data == "null") {
            location.replace("./..");
        }
    }
});

function teamChanged() {
    ws.send("team");
}

function shoot() {
    ws.send("shoot");
}

function speed(){
    ws.send("speed");
}

var x = 100;
var y = 100;
var options = {
    zone: document.getElementById('joyDiv'),
    mode: "static",
    color: "red",
    multitouch: true,
    position: {
        left: '100px',
        bottom: '100px'
    },
    size: 150,
};

var manager = nipplejs.create(options);
manager.on('move', function(evt, data) {
    ws.send(data.angle.degree + ";" + data.distance);
});

manager.on('end', function(evt, data) {
    ws.send(0 + ";" + 0);
})