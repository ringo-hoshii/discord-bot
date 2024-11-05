const events = {
    READY: {
        callbackname: "_onready",
        logstring: "`<@${objectdata.d.user.id}> is up and running on Gateway version ${objectdata.d.v}!`"
    },
    GUILD_CREATE: {
        callbackname: "_onguildcreate",
        logstring: ``
    },
    GUILD_UPDATE: {
        callbackname: "onguildupdate",
        logstring: ``
    },
    GUILD_DELETE: {
        callbackname: "onguilddelete",
        logstring: ``
    },
    GUILD_ROLE_CREATE: {
        callbackname: "onguildrolecreate",
        logstring: ``
    },
    GUILD_ROLE_UPDATE: {
        callbackname: "onguildroleupdate",
        logstring: ``
    },
    GUILD_ROLE_DELETE: {
        callbackname: "onguildroledelete",
        logstring: ``
    },
    CHANNEL_CREATE: {
        callbackname: "onchannelcreate",
        logstring: ``
    },
    CHANNEL_UPDATE: {
        callbackname: "onchannelupdate",
        logstring: ``
    },
    CHANNEL_DELETE: {
        callbackname: "onchanneldelete",
        logstring: ``
    },
    CHANNEL_PINS_UPDATE: {
        callbackname: "onchannelpinsupdate",
        logstring: ``
    },
    THREAD_CREATE: {
        callbackname: "onthreadcreate",
        logstring: ``
    },
    THREAD_UPDATE: {
        callbackname: "onthreadupdate",
        logstring: ``
    },
    THREAD_DELETE: {
        callbackname: "onthreaddelete",
        logstring: ``
    },
    THREAD_LIST_SYNC: {
        callbackname: "onthreadlistsync",
        logstring: ``
    },
    THREAD_MEMBER_UPDATE: {
        callbackname: "onthreadmemberupdate",
        logstring: ``
    },
    THREAD_MEMBERS_UPDATE: {
        callbackname: "onthreadmembersupdate",
        logstring: ``
    },
    STAGE_INSTANCE_CREATE: {
        callbackname: "onstageinstancecreate",
        logstring: ``
    },
    STAGE_INSTANCE_UPDATE: {
        callbackname: "onstageinstanceupdate",
        logstring: ``
    },
    STAGE_INSTANCE_DELETE: {
        callbackname: "onstageinstancedelete",
        logstring: ``
    },
    GUILD_MEMBER_ADD: {
        callbackname: "onguildmemberadd",
        logstring: ``
    },
    GUILD_MEMBER_UPDATE: {
        callbackname: "onguildmemberupdate",
        logstring: ``
    },
    GUILD_MEMBER_REMOVE: {
        callbackname: "onguildmemberremove",
        logstring: ``
    },
    THREAD_MEMBERS_UPDATE: {
        callbackname: "onthreadmembersupdate",
        logstring: ``
    },
    GUILD_AUDIT_LOG_ENTRY_CREATE: {
        callbackname: "onguildauditlogentrycreate",
        logstring: ``
    },
    GUILD_BAN_ADD: {
        callbackname: "onguildbanadd",
        logstring: ``
    },
    GUILD_BAN_REMOVE: {
        callbackname: "onguildbanremove",
        logstring: ``
    },
    GUILD_EMOJIS_UPDATE: {
        callbackname: "onguildemojisupdate",
        logstring: ``
    },
    GUILD_STICKERS_UPDATE: {
        callbackname: "onguildstickersupdate",
        logstring: ``
    },
    GUILD_SOUNDBOARD_SOUND_CREATE: {
        callbackname: "onguildsoundboardsoundcreate",
        logstring: ``
    },
    GUILD_SOUNDBOARD_SOUND_UPDATE: {
        callbackname: "onguildsoundboardsoundupdate",
        logstring: ``
    },
    GUILD_SOUNDBOARD_SOUND_DELETE: {
        callbackname: "onguildsoundboardsounddelete",
        logstring: ``
    },
    GUILD_SOUNDBOARD_SOUNDS_UPDATE: {
        callbackname: "onguildsoundboardsoundsupdate",
        logstring: ``
    },
    GUILD_INTEGRATIONS_UPDATE: {
        callbackname: "onguildintegrationsupdate",
        logstring: ``
    },
    INTEGRATION_CREATE: {
        callbackname: "onintegrationcreate",
        logstring: ``
    },
    INTEGRATION_UPDATE: {
        callbackname: "onintegrationupdate",
        logstring: ``
    },
    INTEGRATION_DELETE: {
        callbackname: "onintegrationdelete",
        logstring: ``
    },
    WEBHOOKS_UPDATE: {
        callbackname: "onwebhooksupdate",
        logstring: ``
    },
    INVITE_CREATE: {
        callbackname: "oninvitecreate",
        logstring: ``
    },
    INVITE_DELETE: {
        callbackname: "oninvitedelete",
        logstring: ``
    },
    VOICE_CHANNEL_EFFECT_SEND: {
        callbackname: "onvoicechanneleffectsend",
        logstring: ``
    },
    VOICE_STATE_UPDATE: {
        callbackname: "onvoicestateupdate",
        logstring: ``
    },
    PRESENCE_UPDATE: {
        callbackname: "onpresenceupdate",
        logstring: "`<@${objectdata.d.user.id}> from ${this.get_guild_by_id(objectdata.d.guild_id).name} (${this.get_guild_channels(objectdata.d.guild_id)}) went ${objectdata.d.status}!`"
    },
    MESSAGE_CREATE: {
        callbackname: "onmessagecreate",
        logstring: ``
    },
    MESSAGE_UPDATE: {
        callbackname: "onmessageupdate",
        logstring: ``
    },
    MESSAGE_DELETE: {
        callbackname: "onmessagedelete",
        logstring: ``
    },
    MESSAGE_DELETE_BULK: {
        callbackname: "onmessagedeletebulk",
        logstring: ``
    },
    MESSAGE_REACTION_ADD: {
        callbackname: "onmessagereactionadd",
        logstring: ``
    },
    MESSAGE_REACTION_REMOVE: {
        callbackname: "onmessagereactionremove",
        logstring: ``
    },
    MESSAGE_REACTION_REMOVE_ALL: {
        callbackname: "onmessagereactionremoveall",
        logstring: ``
    },
    MESSAGE_REACTION_REMOVE_EMOJI: {
        callbackname: "onmessagereactionremoveemoji",
        logstring: ``
    },
    TYPING_START: {
        callbackname: "ontypingstart",
        logstring: ``
    },
    MESSAGE_CREATE: {
        callbackname: "onmessagecreate",
        logstring: ``
    },
    MESSAGE_UPDATE: {
        callbackname: "onmessageupdate",
        logstring: ``
    },
    MESSAGE_DELETE: {
        callbackname: "onmessagedelete",
        logstring: ``
    },
    CHANNEL_PINS_UPDATE: {
        callbackname: "onchannelpinsupdate",
        logstring: ``
    },
    MESSAGE_REACTION_ADD: {
        callbackname: "onmessagereactionadd",
        logstring: ``
    },
    MESSAGE_REACTION_REMOVE: {
        callbackname: "onmessagereactionremove",
        logstring: ``
    },
    MESSAGE_REACTION_REMOVE_ALL: {
        callbackname: "onmessagereactionremoveall",
        logstring: ``
    },
    MESSAGE_REACTION_REMOVE_EMOJI: {
        callbackname: "onmessagereactionremoveemoji",
        logstring: ``
    },
    TYPING_START: {
        callbackname: "ontypingstart",
        logstring: ``
    },
    GUILD_SCHEDULED_EVENT_CREATE: {
        callbackname: "onguildscheduledeventcreate",
        logstring: ``
    },
    GUILD_SCHEDULED_EVENT_UPDATE: {
        callbackname: "onguildscheduledeventupdate",
        logstring: ``
    },
    GUILD_SCHEDULED_EVENT_DELETE: {
        callbackname: "onguildscheduledeventdelete",
        logstring: ``
    },
    GUILD_SCHEDULED_EVENT_USER_ADD: {
        callbackname: "onguildscheduledeventuseradd",
        logstring: ``
    },
    GUILD_SCHEDULED_EVENT_USER_REMOVE: {
        callbackname: "onguildscheduledeventuserremove",
        logstring: ``
    },
    AUTO_MODERATION_RULE_CREATE: {
        callbackname: "onautomoderationrulecreate",
        logstring: ``
    },
    AUTO_MODERATION_RULE_UPDATE: {
        callbackname: "onautomoderationruleupdate",
        logstring: ``
    },
    AUTO_MODERATION_RULE_DELETE: {
        callbackname: "onautomoderationruledelete",
        logstring: ``
    },
    AUTO_MODERATION_ACTION_EXECUTION: {
        callbackname: "onautomoderationactionexecution",
        logstring: ``
    },
    MESSAGE_POLL_VOTE_ADD: {
        callbackname: "onmessagepollvoteadd",
        logstring: ``
    },
    MESSAGE_POLL_VOTE_REMOVE: {
        callbackname: "onmessagepollvoteremove",
        logstring: ``
    },
    MESSAGE_POLL_VOTE_ADD: {
        callbackname: "onmessagepollvoteadd",
        logstring: ``
    },
    MESSAGE_POLL_VOTE_REMOVE: {
        callbackname: "onmessagepollvoteremove",
        logstring: ``
    },
}

module.exports = events
