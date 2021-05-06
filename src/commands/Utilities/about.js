const { Command, version: vakairo } = require('discord-akairo');
const { Message, MessageEmbed, version: djs } = require('discord.js');
const { version } = require('../../../package.json');
const { utc } = require('moment');
const ms = require('ms');

class About extends Command {
    constructor() {
        super('about', {
            aliases: ['about', 'botinfo', 'bot', 'stats'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'Displays information about the bot.'
            }
        });
    }

    async exec(message) {
        
        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setColor('#00ff9e')
            .setTitle(`About ${this.client.user.username}`)
            .setImage(`https://cdn.discordapp.com/attachments/748808131865215004/764348102592430091/HeavyLikableFurseal-size_restricted.gif`)
            .setDescription(
                `**${this.client.user.username} is made with ❤️**
                **${this.client.user.username}** is a bot that can do most of the things that everything you require for making a better and better Discord Server.
                `)
            .addField('__General Details__', [
                `**❯ Client:** ${this.client.user.tag} (\`${this.client.user.id}\`)`,
                `**❯ Created On:** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                `**❯ Uptime:** ${ms(this.client.uptime, { long: true })}.`,
                `**❯ Devs:** Anish, Hound, Kartik, Piyush & Xynox.`,
                '\u200b' 
            ])
            .addField('__Frontend Details__', [
                `**❯ Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
                `**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()} `,
                '\u200b'
            ], true)
            .addField(`__Backend Details__`, [
                `**❯ Version:** [v${version}](https://github.com/Dude-Perfect-Discord-Bot)`,
                `**❯ Node.js:** [${process.version}](https://nodejs.org/en/)`,
                `**❯ Discord.js:** [v${djs}](https://discord.js.org/#/docs)`,
                `**❯ Discord-Akairo:** [v${vakairo}](https://discord-akairo.github.io/#/docs)`,
                `**❯ Modules:** Total ${this.handler.modules.size} modules`,
                '\u200b'
            ], true)
            .addField('__Check Out__', [
                ` [**Wiki**](https://github.com/Dude-Perfect-Discord-Bot/Dude-Perfect/wiki) • [**Invite**](http://bit.ly/dpdb_xynox) • [**Support**](https://discord.gg/ZzbZpdw) • [**GitHub**](https://github.com/Dude-Perfect-Discord-Bot/Dude-Perfect) • [**Donate**](https://www.patreon.com/arindamz)`,
                '\u200b'
            ])
            .addField('__NOTE__', [
                `This bot is not an official bot of [**Dude Perfect**](http://dudeperfect.com/).
                It's majorly inspired by [**Dude Perfect**](http://dudeperfect.com/).
                We have taken grants for using their artworks.`,
                '\u200b'
            ])
            .setFooter(
                `${this.client.user.username} is made with ❤️`,
                `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
            );
    
        message.channel.send(embed);
    }
}

module.exports = About;