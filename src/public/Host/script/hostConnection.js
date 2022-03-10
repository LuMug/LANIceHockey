const ws = new WebSocket("ws://10.90.1.117:2389");

ws.addEventListener("open", () => {
    console.log("We are connected!");
    ws.send("host");
    ws.binaryType = "arraybuffer";

    ws.onmessage = function(message) {
        let arr = new Uint8Array(message.data);
        let str = new TextDecoder().decode(arr);
        console.log(str);
    }
});