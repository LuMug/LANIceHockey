const ws = new WebSocket("ws://10.90.1.117:2389");


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