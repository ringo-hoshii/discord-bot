// I want to find out what if I don't use module.exports explicitly
// Does it still have some kind of an automatic export?

const intents = require("./intents.js")
const opcodes = require("./opcodes.js")

const ws = require("ws")
const fs = require("fs")
const util = require("util")
const notifier = require("node-notifier")

const default_gateway_url = "wss://gateway.discord.gg/"

const lib = {
    stream: fs.createWriteStream("log.txt", { flags: "a" }), // a for append
    requests: require("./requests.js"),
    discordevents: require("./events.js"),
    starttime: Date.now(),
    filter: "objectdata.op !== 11 && objectdata.t !== 'GUILD_CREATE'",
    file_filter: "objectdata.op !== 1 && objectdata.op !== 11",
    write_log_to_file: true,
    log_to_channel: true,
    log_channel: "1297669265905946744",
    log_outcoming_packets: true,
    date_locale: "en-GB",
    date_options: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
    },
    dispatches: [],
    guilds: [],
    onclose_stack: [],


    connect: function() {
        let url
        if (this.resume_gateway_url) {
            url = this.resume_gateway_url
        } else {
            url = default_gateway_url
        }
        this.socket = new ws.WebSocket(url)
        this.attach_event_listeners()
    },

    send: function (data) {
        this.socket.send(data)
        if (this.log_outcoming_packets) {
            this.log("[>>>PACKET SENT>>>]", JSON.parse(data))
        }
    },

    ping: function (data) {
        let payload = {
            op: opcodes.PING,
            d: data
        }
        this.send(JSON.stringify(payload))
    },

    identify: function (token, intents, device, os, browser) {
        let payload = {
            op: opcodes.IDENTIFY,
            d: {
                token: token,
                intents: intents,
                properties: {
                    device: device,
                    os: os,
                    browser: browser,
                }
            }
        }
        this.send(JSON.stringify(payload))
    },

    set_filter: function (expression) {
        this.filter = expression || true
    },

    log: function (textdata, objectdata) {
        let header = `\n\n\n\n\n\n[${new Date().toLocaleString(this.date_locale, this.date_options)}]`
        let evaluated_expression

        try {
            evaluated_expression = eval(this.filter)
        } catch (err) {
            //console.error(err)
            evaluated_expression = true
        }

        if (evaluated_expression) {
            let objectdata_string
            let found_logstring = false

            if (!objectdata) {
                objectdata_string = ""
            } else {
                if (this.discordevents[objectdata.t] && this.discordevents[objectdata.t].logstring) {
                    objectdata_string = "\n" + eval(this.discordevents[objectdata.t].logstring)
                    found_logstring = true
                } else {
                    objectdata_string = "\n" + util.inspect(objectdata)
                }
            }

            let end_log_text = header + "\n" + textdata + objectdata_string
            let file_log_text = header + "\n" + textdata + util.inspect(objectdata)
            
	    let file_filter_expression = true
	    try {
		file_filter_expression = eval(this.file_filter)
	    } catch (err) {
		//console.error(err)
	    }

            if (this.write_log_to_file && file_filter_expression) {
                this.stream.write(file_log_text)
            }

            if (this.log_outcoming_packets) {
                console.log(end_log_text)
            }

            if (this.log_to_channel && objectdata && objectdata.op === 0 && objectdata.d.channel_id !== this.log_channel) {
                let message = {}
                if (found_logstring) {
                    message.content = objectdata_string
                } else {
                    message.content = "```" + end_log_text + "```"
                }

                this.requests.request(`/channels/${this.log_channel}/messages`, "POST", JSON.stringify(message))
                    .then(response => {
                        console.log(response.status + " " + response.statusText)
                        response.json().then(data => {
                            console.log(data)
                        })
                    })
            }
        }
    },

    save_guild: function (message) {
        this.guilds.push(message.d)
    },

    get_user_by_id: function (id, guildid) {
        for (i in this.guilds) {
            console.log(`guilds[${i}]`)
            if (guildid && i.id !== guildid) {
                console.log("continue")
                continue
            }
            for (j in this.guilds[i].members) {
                console.log(this.guilds[i].members[j].id)
                if (this.guilds[i].members[j].user.id === id) {
                    return this.guilds[i].members[j]
                }
            }
        }
    },

    get_guild_by_id: function (id) {
	let guild
	for (i in this.guilds) {
	    if (this.guilds[i].id === id) {
		guild = this.guilds[i]
	    }
	}
	return guild
    },

    get_guild_channels: async function (guild_id) {
	let channels
	let response = await this.requests.request("/guilds/" + guild_id + "/channels")
	channels = await response.json()
	return channels
    },

    check_for_hello: function (event) {
        let message = JSON.parse(event.data)
        if (message.op === opcodes.HELLO) {
            this.identify(this.token, this.intents, this.device, this.os, this.browser)
	    // How does this even fucking work if there is no intents variable inside this class
        }
    },

    check_for_immediate_ping: function (event) {
        let message = JSON.parse(event.data)
        if (message.op === opcodes.PING || message.op === opcodes.HELLO) {
            this.ping(message.d)
        }
    },

    check_for_ready: function(event) {
        let message = JSON.parse(event.data)
        if (message.t === "READY") {
            this.resume_gateway_url = message.d.resume_gateway_url
        }
    },

    check_for_dispatch: function (event) {
        let message = JSON.parse(event.data)
        if (message.op === opcodes.DISPATCH) {
            this.last = this.dispatches.push(message) - 1
            // notifier.notify({
            //     title: "New Dispatch event!",
            //     message: `Check sequence #${message.s}`,
            //     sound: true,
            // })
        }
    },

    check_for_guild_create: function (event) {
        let message = JSON.parse(event.data)
        if (message.t === "GUILD_CREATE") {
            this.save_guild(message)
        }
    },

    onopen: function (event) {
        lib.log("[CONNECTION OPENED]")
    },

    onmessage: function (event) {
        lib.log("[<<<NEW MESSAGE<<<]", JSON.parse(event.data))
        lib.check_for_hello(event)
        lib.check_for_immediate_ping(event)
        lib.check_for_ready(event)
        lib.check_for_dispatch(event)
        lib.check_for_guild_create(event)
    },

    onerror: function (event) {
        lib.log("[ERROR OCURRED]")
        console.error(event.status + " " + event.statusText)
    },

    onclose: function (event) {
        lib.log("[CONNECTION CLOSED]")
        lib.onclose_stack.push(event)
    },

    attach_event_listeners: function () {
        this.socket.onopen = this.onopen
        this.socket.onmessage = this.onmessage
        this.socket.onerror = this.onerror
        this.socket.onclose = this.onclose
    },

}

module.exports = lib
