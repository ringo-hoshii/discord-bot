const ws = require("ws")

let socket = new ws.WebSocket("wss://gateway.discord.gg")

socket.onopen = function (event) {
    console.log("Open")
}

socket.onclose = function (event) {
    console.log("Close")
}

socket.onmessage = function (event) {
    let message = JSON.parse(event.data)
    console.log(message)
}