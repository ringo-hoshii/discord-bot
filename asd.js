// THIS FILE EXISTS PURELY FOR CONVENIENCE REASONS
// YOU SHOULDN'T USE IT FOR ANYTHING ELSE THAN QUICK TESTS IN REPL

const intents = require("./intents")
const token = require("./token")
const DiscordSocket = require("./discord-socket")

let bot = new DiscordSocket(
    token,
        intents.intents.GUILD_PRESENCES +
        intents.intents.GUILDS +
        intents.intents.GUILD_MESSAGES +
        intents.intents.MESSAGE_CONTENT
    )

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

    console.log("[" + new Date().toLocaleString(date_locale, date_options) + "]")
    console.log(text)
    console.log()
}

bot.onmessage = function (message) {
    if (message.op !== 1 && message.op !== 11)
        log(message)

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

bot.onping = function (message) {
    
}

bot.connect()