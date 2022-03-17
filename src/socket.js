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
            clients.push(ws);
            console.log(clients.length);
        } else {
            host.send(data + ";" + ws._socket.remoteAddress);
        }
    });

    ws.on("close", (ws) => {
        console.log("Client disconnected");
        host.send("close;" + ws._socket.remoteAddress);
        clients.splice(clients.indexOf(ws), 1);
    });
})