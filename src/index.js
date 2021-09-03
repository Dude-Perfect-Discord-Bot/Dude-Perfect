
require('./lib/setup');
const { LogLevel, SapphireClient } = require('@sapphire/framework');
const { PREFIX, TOKEN } = require('./config.js');

const client = new SapphireClient({
    shards: 'auto',
    defaultPrefix: PREFIX,
    caseInsensitiveCommands: true,
    baseUserDirectory: join(__dirname, 'pieces'),
    logger: {
        level: LogLevel.Debug
    },
    presence: {
        activity: {
            name: 'dp!help | Made with ❤️',
            type: 'WATCHING'
        }
    },
    intents: [
        
        // GUILDS (guilds the bot is in)
        'GUILD_CREATE',
        'GUILD_UPDATE',
        'GUILD_DELETE',
        'GUILD_ROLE_CREATE',
        'GUILD_ROLE_UPDATE',
        'GUILD_ROLE_DELETE',
        'CHANNEL_CREATE',
        'CHANNEL_UPDATE',
        'CHANNEL_DELETE',
        'CHANNEL_PINS_UPDATE',
        'THREAD_CREATE',
        'THREAD_UPDATE',
        'THREAD_DELETE',
        'THREAD_LIST_SYNC',
        'THREAD_MEMBER_UPDATE',
        'THREAD_MEMBERS_UPDATE',
        'STAGE_INSTANCE_CREATE',
        'STAGE_INSTANCE_UPDATE',
        'STAGE_INSTANCE_DELETE',
        
        // GUILD_MEMBERS (members of the guild the bot is in)
        'GUILD_MEMBER_ADD',
        'GUILD_MEMBER_UPDATE',
        'GUILD_MEMBER_REMOVE',
        'THREAD_MEMBERS_UPDATE',
        
        // GUILD_BANS (bans of the guild the bot is in)
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        
        // GUILD_EMOJIS_AND_STICKERS (emojis and stickers of the guild the bot is in)
        'GUILD_EMOJIS_UPDATE',
        'GUILD_STICKERS_UPDATE',
        
        // GUILD_INTEGRATIONS (integrations of the guild the bot is in)
        'GUILD_INTEGRATIONS_UPDATE',
        'INTEGRATION_CREATE',
        'INTEGRATION_UPDATE',
        'INTEGRATION_DELETE',
        
        // GUILD_WEBHOOKS (webhooks of the guild the bot is in)
        'WEBHOOKS_UPDATE',
        
        // GUILD_INVITES (invites of the guild the bot is in)
        'INVITE_CREATE',
        'INVITE_DELETE',
        
        // GUILD_VOICE_STATES (voice states of the guild the bot is in)
        'VOICE_STATE_UPDATE',
        
        // GUILD_PRESENCES (presences of the guild the bot is in)
        'PRESENCE_UPDATE',
        
        // GUILD_MESSAGES (messages of the guild the bot is in)
        'MESSAGE_CREATE',
        'MESSAGE_UPDATE',
        'MESSAGE_DELETE',
        'MESSAGE_DELETE_BULK',
        
        // GUILD_MESSAGE_REACTIONS (reactions of the guild the bot is in)
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
        'MESSAGE_REACTION_REMOVE_ALL',
        'MESSAGE_REACTION_REMOVE_EMOJI',
        
        // DIRECT_MESSAGES (direct messages the bot is in)
        'DIRECT_MESSAGE_CREATE',
        'DIRECT_MESSAGE_UPDATE',
        'DIRECT_MESSAGE_DELETE',
        'CHANNEL_PINS_UPDATE',
        
        // DIRECT_MESSAGE_REACTIONS (reactions of the direct message the bot is in)
        'DIRECT_MESSAGE_REACTION_ADD',
        'DIRECT_MESSAGE_REACTION_REMOVE',
        'DIRECT_MESSAGE_REACTION_REMOVE_ALL',
        'DIRECT_MESSAGE_REACTION_REMOVE_EMOJI'
    ]
});

const main = async () => {
    try {
        client.logger.info('Logging in . . .');
        await client.login(discord_token);
        client.logger.info('Logged in successfully!');
    } catch (error) {
        client.logger.fatal(error);
        client.destroy();
        process.exit(1);
    }
};

main();
