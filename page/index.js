const https = require("https") 
const fs = require("fs")
const util = require("util")

let port = 443

let filename = "incomingrequests.txt"
let incomingreqstream = fs.createWriteStream(filename, { flags: "a" })

let locallog = []
locallog.last = () => locallog.length - 1

let debug

function log(message) {
    console.log(message)
    let messagestring = util.inspect(message)
    debug = messagestring
    console.log("fs is writing " + typeof messagestring)
    incomingreqstream.write(messagestring)
    locallog.push(message)
}

// req - incoming request
// res - object for answering back to the request issuer
function requesthandler(req, res) {
    console.log(req.headers)
    incomingreqstream.write(util.inspect(req))
}

https.createServer(requesthandler).listen(port)