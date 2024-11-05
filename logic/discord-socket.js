const ws = require("ws")
const events = require("./events")
const opcodes = require("./opcodes")
const requests = require("./requests")

// I don't fucking understand how I'm gonna make it
// I'm not even particularly interested anymore
// This is so messed up

class DiscordSocket {
    constructor(token, intents, url) {
        if (!token) {
            console.error("ERROR! You can't use the bot without a token!")
            process.exit()
        }

        let self = this
        self.default_gateway_url = "wss://gateway.discord.gg/"
        self.default_intents = 1

        self.token = token
        self.intents = intents || self.default_intents
        self.url = self.resume_gateway_url || url || self.default_gateway_url

        self.guilds = []

        self.connect = function () {
            self.socket = new ws.WebSocket(self.url)

            self.socket.onopen = self.onopen
            self.socket.onclose = self.onclose
            self.socket.onerror = self.onerror

            self.socket.onmessage = self._onmessage
        }


        self.ping = function(d) {
            let packet = {
                op: opcodes.PING,
                d: d || null,
            }
            self.socket.send(JSON.stringify(packet))
        }

        self.sendmessage = async function (channel, content) {
            let message = {}
            message.content = content
            requests.request("/channels/" + channel + "/messages", "POST", JSON.stringify(message)).then(res => {
                res.json().then(res => {
                    console.log(res)
                })
            })
        }

        self.identify = function() {
            let packet = {
                op: opcodes.IDENTIFY,
                d: {
                    token: self.token,
                    intents: self.intents,
                    properties: {
                        // There should be device, browser and os but it works without them so whatever
                    },
                },
            }
            self.socket.send(JSON.stringify(packet))
            self.onidentify(packet)
        }

        self.ondispatch = function (message) {

        }

        self._onhello = function (message) {
            try {
                self.onhello()
            } catch (err) {
                console.warn("No custom Hello callback")
            }
            self.ping(message.d)
            self.identify()
        }

        self._onready = function (message) {
            self.resume_gateway_url = message.d.resume_gateway_url
            self.onready(message)
        }

        self._onguildcreate = function (message) {
            self.guilds.push(message.d)
            self.onguildcreate(message)
        }

        self._onmessage = function (event) {
            let message = JSON.parse(event.data)
            self.onmessage(message)
            for (event in events) {
                if (message.t === event) {
                    try {
                        eval("self." + events[event].callbackname + "(message)")
                    } catch (err) {
                        console.warn(`${event} callback does not exist.`)
                        console.error(err)
                    }
                }
            }

            try {
                switch (message.op) {
                    case opcodes.HELLO:
                        self._onhello(message)
                        break
                    case opcodes.PING:
                        self.ping(message.d)
                        self.onping(message)
                        break
                    case opcodes.DISPATCH:
                        self.ondispatch(message)
                        break
                    case opcodes.RECONNECT:
                        self.connect()
                        break
                }
            } catch(err) {
                console.error(err)
            }

        }
    }
}

module.exports = DiscordSocket