const { Command } = require('discord-akairo');

class Slowmode extends Command {
    constructor() {
        super('slowmodeset', {
            aliases: ['slowmodeset', 'sm'],
            channel: 'guild',
            category: 'Guild Management',
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
                content: 'Sets the provide nickname of the user provided by the executor.',
                usage: '<time>',
                examples: ['5']
            },
            typing: true
        });
    }

    async exec(message, { time }) {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("<a:RedTick:760514410115498025> **You need `MANAGE_CHANNELS` permission to use this command!**");

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