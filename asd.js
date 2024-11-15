// THIS FILE EXISTS PURELY FOR CONVENIENCE REASONS
// YOU SHOULDN'T USE IT FOR ANYTHING ELSE THAN QUICK TESTS IN REPL

const intents = require("./utilities/intents")
const token = require("./utilities/token")
const DiscordSocket = require("./logic/discord-socket")

const util = require("util")
const fs = require("fs")

const myintents = 
    intents.intents.GUILD_PRESENCES +
    intents.intents.GUILDS +
    intents.intents.GUILD_MESSAGES +
    intents.intents.MESSAGE_CONTENT

let commands = {
    "/help": "Print help message",
    "/time": "Print current time",
    "/test": "Greet the message author",
    "/eval": "Evaluate a JS command",
}

let logstream = fs.createWriteStream("misc/log.txt", { flags: "a" }) // a for append

function generatehelpmessage () {
    let helpmessage = ""
    for (i in commands) {
	helpmessage += i + ": " + commands[i] + "\n"
    }
    return helpmessage
}


let bot = new DiscordSocket(token, myintents)

let helpmessage = generatehelpmessage()

function log (text) {
    let date_locale = "en-GB"
    let date_options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
    }

    let timestamp = "[" + new Date().toLocaleString(date_locale, date_options) + "]"

    console.log(timestamp)
    console.log(text)
    console.log()

    if (typeof text !== "string") {
	text = util.inspect(text)
    }

    logstream.write(timestamp + "\n" + text + "\n\n\n")
}

bot.onmessage = function (message) {
    if (message.op !== 1 && message.op !== 11) {
        log(message)
    }
}

bot.onopen = function (event) {
    log("Connection opened")
}

bot.onclose = function (event) {
    log("Connection closed")
}

bot.onhello = function (message) {
    log("Server hello")
}

bot.onready = function (message) {

    const text =
        "Server is ready\n" +
        "Version: " + message.d.v +
        "\nUsername: " + message.d.user.username +
        "\nId: " + message.d.user.id

    log(text)
}

bot.onidentify = function (packet) {
    log("Identify message sent with intents: " + packet.d.intents)
}

bot.onguildcreate = function (message) {

}

bot.onpresenceupdate = function (message) {
    log("Presence update")
    let channel
    for (guild in bot.guilds) {
        if (bot.guilds[guild].id === message.d.guild_id) {
            channel = bot.guilds[guild].system_channel_id
        }
    }
    if (channel) {
        console.log(channel)
        let response = bot.sendmessage(
            channel,
            `<@633325625029034033>\n<@${message.d.user.id}> went ${message.d.status}`
        )
        console.log(response)
    }
}

bot.ondispatch = function (message) {
    if (message.t === "MESSAGE_CREATE" && message.d.author.id !== bot.id) {
	let channel_id = message.d.channel_id
	if (message.d.content[0] === "/") {
	    if (message.d.content === "/test") {
		let content = `Hey, ${message.d.author.username}! I am Orion, the all-purpose bot!`
		bot.sendmessage(channel_id, content)
	    } else if (message.d.content === "/help") {
		bot.sendmessage(channel_id, helpmessage)
	    } else if (message.d.content.split(" ")[0] === "/eval") {
		if (message.d.author.id === "633325625029034033") { // my id
		    let command = message.d.content
		    command = command.replace("/eval", "")
		    try {
			bot.sendmessage(channel_id, eval(command))
		    } catch (err) {
			bot.sendmessage(channel_id, err)
		    }
		}
	    } else {
		bot.sendmessage(channel_id, "No such command: " + message.d.content)
	    }
	}
    }
}

bot.onping = function (message) {
    
}

bot.connect()
