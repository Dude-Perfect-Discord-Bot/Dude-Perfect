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

const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class UserInfo extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'ui', 'info', 'whois', 'profile', 'me'],
            channel: 'guild',
            category: 'Information',
            description: {
                content: 'Displays information about a provided user or the command executor.',
                usage: '[user]',
                examples: ['Xynox#0117']
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ],
            ratelimit: 2,
            typing: true
        });
    }

    async exec(message, args) {

        const flags = {
            DISCORD_EMPLOYEE: '<:staff:753975912969797682>',
            DISCORD_PARTNER: '<:partner:753976272765583461>',
            BUGHUNTER_LEVEL_1: '<:bughunter:753976807799259178>',
            BUGHUNTER_LEVEL_2: '<:bughuntergold:753976795950350426>',
            HYPESQUAD_EVENTS: '<:hypesquadevents:753976575321702472>',
            HOUSE_BRAVERY: '<:bravery:753976846877458442>',
            HOUSE_BRILLIANCE: '<:brilliance:753976825150963842>',
            HOUSE_BALANCE: '<:balance:753977070865875056>',
            EARLY_SUPPORTER: '<:earlysupporter:753976621836533760>',
            TEAM_USER: 'Team User',
            SYSTEM: '<:verifieddcsystem:753976870042730648>',
            VERIFIED_BOT: '<:VerifiedBot:753976885251407872>',
            VERIFIED_DEVELOPER: '<:botdev:753976973168214176>'
        };

        const member = args.member;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = (member.user.flags ? member.user.flags.toArray() : []);

        try {

        let status = ""
        if (member.user.presence.clientStatus && member.user.presence.clientStatus.mobile) status = "Mobile"
        if (member.user.presence.clientStatus && member.user.presence.clientStatus.desktop) status = "Desktop"
        if (member.user.presence.clientStatus && member.user.presence.clientStatus.web) status = "Website"
        if (member.user.presence.status === "offline") status = "The user is offline/invisible or there is some issue to track device."

        let emoji = ""
        if (`${member.user.presence.status}` === "online") emoji = "<:OnlineStatus:753975990417358869>"
        if (`${member.user.presence.status}` === "idle") emoji = "<:IdleStatus:753976530874400918>"
        if (`${member.user.presence.status}` === "dnd") emoji = "<:status_dnd:753976689402445857>"
        if (`${member.user.presence.status}` === "offline") emoji = "<:OfflineStatus:753976062232232096>"

        let game;
        if (member.user.presence.activities.length >= 1) game = `${member.user.presence.activities[0].type} - ${member.user.presence.activities[0].name}`;
        else if (member.user.presence.activities.length < 1) game = "Not playing a game"; 

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor('#00ff9e')
            .addField('__User Information__', [
                `**❯ Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}`,
                `**❯ Tag:** ${member.user.tag}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Device:** ${status} `,
                `**❯ Status:** ${member.user.presence.status} (${emoji})`,
                `**❯ Game:** ${game}`,
                `**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} (${moment(member.user.createdTimestamp).fromNow()})`,
                `\u200b`
            ])
            .addField('__Member Information__', [
                `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**❯ Joinned:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**❯ Roles [${roles.length}]:** ${roles.slice(0, 10).join(', ') || 'None'}`,
                `\u200b`
            ])
            .setFooter(`Thanks for using ${this.client.user.username}`)
            .setTimestamp();
        message.channel.send(embed);
            console.log(member.user.presence.activities[0].type);
        } catch (err) {
            message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
        }

    }
}

module.exports = UserInfo;