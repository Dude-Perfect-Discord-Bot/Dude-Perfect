const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Enlarge extends Command {
    constructor() {
        super('enlarge', {
            aliases: ['enlarge', 'emoji'],
            args: [
                {
                    id: 'emoji',
                    prompt: {
                        start: '<a:RedTick:760514410115498025> **You need to provide a emoji which is to be enlarged!**',
                        retry: '<a:RedTick:760514410115498025> **Provide a emoji which is added in this guild!**'
                    },
                    match: 'content',
                    type: 'emoji',
                    default: null
                }
            ],
            description: {
                content: 'Enlarges the provided emoji.',
                usage: '<emoji>',
                examples: [':lookingfor:', 'lookingfor', '754421240923553858', '<a:lookingfor:754421240923553858>']
            },
            category: 'Information',
            ratelimit: 2
        });
    }

    exec(message, { emoji }) {
        emoji.fetchAuthor().then(() => {
            message.channel.send(`${emoji.url}`);
        });
    }
}

module.exports = Enlarge;