const { Command } = require('discord-akairo');

class Slowmode extends Command {
    constructor() {
        super('slowmodeset', {
            aliases: ['slowmodeset', 'sm'],
            channel: 'guild',
            category: 'Guild Management',
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS'],
            args: [
                {
                    id: "time",
                    type: "number",
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention time!**"
                    }
                },
            ],
            description: {
                content: 'Sets the slowmode in channel.',
                usage: '<time>',
                examples: ['5']
            }
        });
    }

    async exec(message, { time }) {

        try {

        await message.channel.setRateLimitPerUser(time)
        return message.channel.send(`<:check:753484699237613630> **Slowmode has been set for ${time} seconds!**`);

        } catch (err) 
                {
                    message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
                }

    }
}

module.exports = Slowmode;
