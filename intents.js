// Intents from the official Discord Developers Portal
// Updated 19.10.2024

const intents = {
    GUILDS: 1 << 0,
    GUILD_MEMBERS: 1 << 1,
    GUILD_MODERATION: 1 << 2,
    GUILD_EXPRESSIONS: 1 << 3,
    GUILD_INTEGRATIONS: 1 << 4,
    GUILD_WEBHOOKS: 1 << 5,
    GUILD_INVITES: 1 << 6,
    GUILD_VOICE_STATES: 1 << 7,
    GUILD_PRESENCES: 1 << 8,
    GUILD_MESSAGES: 1 << 9,
    GUILD_MESSAGE_REACTIONS: 1 << 10,
    GUILD_MESSAGE_TYPING: 1 << 11,
    DIRECT_MESSAGES: 1 << 12,
    DIRECT_MESSAGE_REACTIONS: 1 << 13,
    DIRECT_MESSAGE_TYPING: 1 << 14,
    MESSAGE_CONTENT: 1 << 15,
    GUILD_SCHEDULED_EVENTS: 1 << 16,
    AUTO_MODERATION_CONFIGURATION: 1 << 20,
    AUTO_MODERATION_EXECUTION: 1 << 21,
    GUILD_MESSAGE_POLLS: 1 << 24,
    DIRECT_MESSAGE_POLLS: 1 << 25
}


// Config for intents of Discord Gateway events
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

module.exports = { intents, myintents }


