const { MessageEmbed }= require('discord.js');
const { Command } = require('discord-akairo');

class Invite extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite', 'add'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'Provides you the invite link of the bot to add it in other servers.'
            }
        });
    }

    exec(message) {
        const embed = MessageEmbed()
        .setColor('#00ff9e')
        .setTitle('Want To Invite Me?')
        .addField('Invite Link ❯', [
            '[Add Me Now!](https://discord.com/api/oauth2/authorize?client_id=759763855680602122&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Finvite%2FZzbZpdw&scope=bot)'
        ])
        .setFooter(`${this.client.user.username} is made with ❤️`, `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`)

        message.channel.send(embed)

    }
}

module.exports = Invite;
