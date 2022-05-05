const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 2389 });

var clients = new Array();
var host = "null";

wss.on('connection', (ws, req) => {
    console.log("Client connected");
    console.log(req.socket.remoteAddress);
    console.log(req.socket.remotePort);

    ws.on("message", data => {
        if (data.equals(Buffer.from("host"))) {
            host = ws;
            console.log("Host connected");
        } else if (data.toString().split(";")[0] == "client") {
            if (host == "null") {
                ws.send(host);
            }
            host.send("new;" + ws._socket.remoteAddress + ";" + data.toString().split(";")[1]);
            clients.push(new Array(ws, ws._socket.remoteAddress));
            console.log(clients.length);
        } else {
            host.send(data + ";" + ws._socket.remoteAddress);
        }
    });

    ws.on("close", (num) => {
        console.log("Client disconnected");
        var ipToSend = removeWithWSFromClients(ws);
        host.send("close;" + ipToSend);

    });
})

function removeWithWSFromClients(ws) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i][0] == ws) {
            var returned = clients[i][1];
            clients.splice(i, 1);
            return returned;
        }
    }
    return -1;
}