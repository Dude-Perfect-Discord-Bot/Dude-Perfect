const { Command, version: akairoVersion } = require('discord-akairo'); 
const { Message, MessageEmbed, version: djsVersion } = require('discord.js');
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
            },
            typing: true
        });
    }

    async exec(message) {
        
        const owner = this.client.users.cache.get(this.client.ownerID);
        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('#00ff9e')
            .setTitle(`About ${this.client.user.username}`)
            .setImage(`https://cdn.discordapp.com/attachments/748808131865215004/764348102592430091/HeavyLikableFurseal-size_restricted.gif`)
            .setDescription(
                `**${this.client.user.username} is made with ❤️.**
                **${this.client.user.username}** is bot that can do most of things that everything you require for making a better and better Discord Server.
                `)
            .addField('__General__', [
                `**❯ Client:** ${this.client.user.tag} (\`${this.client.user.id}\`)`,
                `**❯ Creation Date:** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                `**❯ Devs:** Anish, Hound, Kartik, Piyush  Xynox.`,
                '\u200b'
            ])
            .addField('__Frontend Details__', [
                `**❯ Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
                `**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()} `,
                '\u200b'
            ])
            .addField(`__Backend Details__`, [
                `**❯ Version:** v${version}`,
                `**❯ Node.js:** ${process.version}`,
                `**❯ Discord.js:** v12.3.1`,
                `**❯ Discord-Akairo:** v8.1.0`,
                `**❯ Modules:** Total ${this.handler.modules.size} modules`,
                '\u200b'
            ])
            .addField('__Check Out__', [
                ` [**Support**](https://discord.gg/ZzbZpdw) • [**Invite**](https://discord.com/api/oauth2/authorize?client_id=759763855680602122&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Finvite%2FZzbZpdw&scope=bot) • [**GitHub**](https://github.com/Dude-Perfect-Discord-Bot)`,
                '\u200b'
            ])
            .addField('__NOTE__', [
                `This bot is not an official bot of [**Dude Perfect**](http://dudeperfect.com/).
                It's majorly inspired by [**Dude Perfect**](http://dudeperfect.com/).
                We have taken grants for using their artworks.`,
                '\u200b'
            ])
            .setFooter(`Thanks for using ${this.client.user.username}`)
            .setTimestamp();
    
        message.channel.send(embed);
    }
}

module.exports = About;