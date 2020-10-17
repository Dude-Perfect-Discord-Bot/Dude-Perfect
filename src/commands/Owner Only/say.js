const { Command } = require('discord-akairo');

class SayMessage extends Command {
    constructor() {
        super('say', {
            aliases: ['say', 'speak'],
            category: 'Bot Owner Only',
            ownerOnly: true,
            typing: true,
            args: [
                {
                    id: 'thing',
                    type: 'string'
                }
            ]
        });
    }

    async exec(message, { thing }) {
        message.channel.send(thing);
        message.delete();
    }
}

module.exports = SayMessage;