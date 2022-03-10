const ws = new WebSocket("ws://10.90.1.117:2389");

ws.addEventListener("open", () => {
    console.log("We are connected!");

    ws.send("client");

    ws.onmessage = function(message) {
        console.log(message.data);
        if (message.data == "null") {
            location.replace("./..");
        }
    }
});