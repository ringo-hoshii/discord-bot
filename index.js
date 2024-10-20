// So this is the main file
// It should be as concise as possible
// Just the combination of everything behind the curtains
// It SHOULD be MAIN
// Like, MAIN file
// When you EXECUTE it you should FEEL that it is something CENTRALIZED and EASY TO WORK WITH, UNDERSTOOD?

const default_gateway_url = "wss://gateway.discord.gg/"

const lib = require("./lib")
const ws = require("ws")
lib.token = require("./token")
lib.intents = require("./intents.js").myintents

lib.connect()