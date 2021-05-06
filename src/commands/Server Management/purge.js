const { Command } = require('discord-akairo');

class Purge extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge', 'prune'],
            channel: 'guild',
            category: 'Guild Management',
            description: {
                content: 'Deletes number of messages as per the arguments entered by the command executor.',
                usage: '<number>',
                examples: ['15']
            },
            cooldown: 5000,
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    id: 'count',
                    type: (_, phrase) => {
                        if (!phrase || isNaN(parseInt(phrase))) return null;
                        const num = parseInt(phrase);
                        if (num < 2 || num > 100) return null;
                        return num;
                    },
                    prompt: {
                        start: (msg) => `<a:RedTick:760514410115498025> ${msg.author}, how man messages do you want to clean ? (2-100)`,
                        retry: (msg) => `<a:RedTick:760514410115498025> ${msg.author}, please enter a number between 2 and 100!`,
                    },
                }
            ]
        });
    }

    async exec(message, { count }) {

        message.delete();

        const messages = await message.channel.messages.fetch();
        const filtered = messages
            .filter(msg => msg.id !== message.id)
            .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
            .array()
            .slice(0, count);

        message.channel.send(`Deleting ${filtered.length} messages, please wait...`).then(msg => {
            message.channel.bulkDelete(filtered, true).then(({ size }) => {
                msg.edit(`<:check:753484699237613630> **${size}** messages has been successfully purged by **${message.author.tag}**.`).then(m => {
                    m.delete({ timeout: 5000 });
                })
            })
        })
            .catch(err => {
                message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
            });

    }

}

module.exports = Purge;