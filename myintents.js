// Config file for intents of Discord Gateway events

const intents = require("./intents")

const myintents = (
    intents.GUILDS +
    intents.GUILD_MODERATION +
    intents.GUILD_EXPRESSIONS +
    intents.GUILD_INTEGRATIONS +
    intents.GUILD_INVITES +
    intents.GUILD_VOICE_STATES +
    intents.GUILD_PRESENCES +
    intents.GUILD_MESSAGES +
    intents.GUILD_MESSAGE_REACTIONS +
    intents.GUILD_MESSAGE_TYPING +
    intents.DIRECT_MESSAGES +
    intents.DIRECT_MESSAGE_REACTIONS +
    intents.DIRECT_MESSAGE_TYPING +
    intents.MESSAGE_CONTENT +
    intents.GUILD_MESSAGE_POLLS +
    intents.DIRECT_MESSAGE_POLLS
)

module.exports = myintents