// Copyright 2019 Arindam Hazra aka Xynox <https://arindamz.github.io/>
// 
// Licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
//     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
            },
            typing: true
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
            .addField('__General__', [
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