const { Command } = require('discord-akairo');

class Guilds extends Command {
    constructor() {
        super('guilds', {
            aliases: ['guilds', 'botguild'],
            channel: 'guild',
            category: 'Bot Owner Only',
            ownerOnly: true
            });
    }

    exec(message) {

        message.channel.send("** <a:star4:761157512614772736> __My Guilds__ **");

        this.client.guilds.cache.forEach(x => message.channel.send(`<:check:753484699237613630> ${x.name} - \`${x.id}\``))

            message.delete();
    }
}
module.exports = Guilds;


