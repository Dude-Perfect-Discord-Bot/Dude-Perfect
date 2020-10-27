// Copyright 2019 Arindam Hazra aka Xynox < https://arindamz.github.io/>
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

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class GuildInfo extends Command {
    constructor() {
        super('guildinfo', {
            aliases: ['guildinfo', 'gi', 'serverinfo', 'si', 'server'],
            channel: 'guild',
            category: 'Information',
            description: {
                content: 'Displays information about the server.'
            },
            typing: true
        });
    }

    async exec(message) {

        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };

        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'High',
            VERY_HIGH: 'Highest'
        };

        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setDescription(`**Guild information for __${message.guild.name}__**`)
            .setColor('#00ff9e')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setImage(message.guild.bannerURL({ size: 4096, dynamic: true }))
            .addField('__General Information__', [
                `**❯ Name:** ${message.guild.name}`,
                `**❯ ID:** ${message.guild.id}`,
                `**❯ Owner:** ${message.guild.owner.user.tag} (\`${message.guild.ownerID}\`)`,
                `**❯ Voice Region:** ${regions[message.guild.region]}`,
                `**❯ Maximum Member Limit:** ${message.guild.maximumMembers}`,
                `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})`,
                '\u200b'
            ])
            .addField('__Member Presence__', [
                `**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
                `**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
                `**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                `**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
                '\u200b'
            ])
            .addField('__Server Statistics__', [
                `**❯ Members:** ${message.guild.memberCount}`,
                `**❯ Channels:** ${message.guild.channels.cache.size}`,
                `**❯ Emojis:** ${emojis.size}`,
                `**❯ Roles:** ${roles.length}`,
                '\u200b'
            ])
            .addField('__Highlights__', [
                `**❯ Boosts:** ${message.guild.premiumTier ? `Level ${message.guild.premiumTier}` : 'Level 0'} with ${message.guild.premiumSubscriptionCount || '0'} boosts`,
                `**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**❯ Features Unlocked:** ${message.guild.features || 'Nothing has unlocked yet'}`,
                '\u200b'
            ])
            .setFooter(`Thanks for using ${this.client.user.username}`)
            .setTimestamp();
        message.channel.send(embed);

    }
}
    
    module.exports = GuildInfo;