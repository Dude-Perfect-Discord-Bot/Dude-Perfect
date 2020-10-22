const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Welcome extends Command {
    constructor() {
        super('wlc', {
            aliases: ['wlc', 'greet'],
            channel: 'guild',
            ownerOnly: true
        });
    }

    async exec(message) {

        const embed = new MessageEmbed()
            .setColor("5c00ff")
            .setTitle(`<a:wumpuswave:754062589746479227> ${message.guild.name} `)
            .setDescription(`**You are now the member of ${message.guild.name}\nNow read rules and about us to get informed about the server.**`)
            .setImage("https://cdn.discordapp.com/attachments/652317857316601866/658290232353095723/wlecome.gif")
            .setFooter("Made with ❤️ by Xynox.", "https://cdn.discordapp.com/attachments/748808131865215004/766901873298112512/Untitled941.png")
        message.channel.send(embed);


        await message.delete();
        return;

    }
}
module.exports = Welcome;


