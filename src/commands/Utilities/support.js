const { MessageEmbed } = require('discord.js');
const { Command } = require('discord-akairo');

class Support extends Command {
    constructor() {
        super('support', {
            aliases: ['support'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'Provides you the invite link of the bot to add it in other servers.'
            }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
        .setColor('#00ff9e')
        .setTitle('Want Some Support?')
        .setDescription('Join ❯ https://discord.gg/ZzbZpdw')
        .setFooter(`${this.client.user.username} is made with ❤️`, `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`)

        message.channel.send(embed)

    }
}

module.exports = Support;
