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
        } else if (data.equals(Buffer.from("client"))) {
            ws.send(Buffer.from(host));
            clients.push(ws);
            console.log(clients.length);
        }
    });

    ws.on("close", (ws) => {
        console.log("Client disconnected");
        clients.splice(clients.indexOf(ws), 1);
    });
})