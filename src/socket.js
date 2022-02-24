const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 2389 });

const clients = new Array();

wss.on('connection', (ws, req) => {
    console.log("Client connected");
    clients.push(ws);
    console.log(req.socket.remoteAddress);
    console.log(req.socket.remotePort);
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`);
    })

    ws.on("close", () => {
        console.log("Client disconnected");
    });
})