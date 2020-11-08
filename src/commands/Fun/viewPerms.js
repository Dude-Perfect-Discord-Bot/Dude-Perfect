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


class ViewPerm extends Command {
    constructor() {
        super('viewPerm', {
            aliases: ['viewperm', 'myperm', 'perm'],
            channel: 'guild',
            category: 'Fun',
            description: {
                content: 'Shows what permission you have in the guild.',
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

    exec(message, args) {

        var permissions = [];


        const member = args.member;

        if (member.hasPermission("ADMINISTRATOR")) {
            permissions.push("Administrator");
        }

        if (member.hasPermission("CREATE_INSTANT_INVITE")) {
            permissions.push("Create Invite");
        }

        if (member.hasPermission("KICK_MEMBERS")) {
            permissions.push("Kick Members");
        }

        if (member.hasPermission("BAN_MEMBERS")) {
            permissions.push("Ban Members");
        }

        if (member.hasPermission("MANAGE_CHANNELS")) {
            permissions.push("Manage Channels");
        }

        if (member.hasPermission("MANAGE_GUILD")) {
            permissions.push("Manage Server");
        }

        if (member.hasPermission("ADD_REACTIONS")) {
            permissions.push("Add Reaction");
        }

        if (member.hasPermission("VIEW_AUDIT_LOG")) {
            permissions.push("View Audit Log");
        }

        if (member.hasPermission("PRIORITY_SPEAKER")) {
            permissions.push("Priority Speaker");
        }

        if (member.hasPermission("STREAM")) {
            permissions.push("Stream");
        }

        if (member.hasPermission("VIEW_CHANNEL")) {
            permissions.push("View Channel");
        }

        if (member.hasPermission("SEND_MESSAGES")) {
            permissions.push("Send Messages");
        }

        if (member.hasPermission("SEND_TTS_MESSAGES")) {
            permissions.push("Send TTS Messages");
        }

        if (member.hasPermission("MANAGE_MESSAGES")) {
            permissions.push("Manage Messages");
        }

        if (member.hasPermission("EMBED_LINKS")) {
            permissions.push("Embed Link");
        }

        if (member.hasPermission("ATTACH_FILES")) {
            permissions.push("Attach Files");
        }

        if (member.hasPermission("READ_MESSAGE_HISTORY")) {
            permissions.push("Read Message History");
        }

        if (member.hasPermission("MENTION_EVERYONE")) {
            permissions.push("KMention Everyone");
        }

        if (member.hasPermission("USE_EXTERNAL_EMOJIS")) {
            permissions.push("Use External Emojis");
        }

        if (member.hasPermission("VIEW_GUILD_INSIGHTS")) {
            permissions.push("View Server Insights");
        }

        if (member.hasPermission("CONNECT")) {
            permissions.push("Connect");
        }

        if (member.hasPermission("SPEAK")) {
            permissions.push("Speak");
        }

        if (member.hasPermission("MUTE_MEMBERS")) {
            permissions.push("Mute Members");
        }

        if (member.hasPermission("DEAFEN_MEMBERS")) {
            permissions.push("Deafen Members");
        }

        if (member.hasPermission("MOVE_MEMBERS")) {
            permissions.push("Move Members");
        }

        if (member.hasPermission("USE_VAD")) {
            permissions.push("Use Voice Activity");
        }

        if (member.hasPermission("CHANGE_NICKNAME")) {
            permissions.push("Change Nickname");
        }

        if (member.hasPermission("MANAGE_NICKNAMES")) {
            permissions.push("Manage Nickname");
        }

        if (member.hasPermission("MANAGE_ROLES")) {
            permissions.push("Manage Roles");
        }

        if (member.hasPermission("MANAGE_WEBHOOKS")) {
            permissions.push("Manage Webhooks");
        }

        if (member.hasPermission("MANAGE_EMOJIS")) {
            permissions.push("Manage Emojis");
        }

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('#00ff9e')
            .addField('You have these permissions . . .', [
                `${permissions.join(", ")}`,
                `\u200b`
            ])
            .setFooter(`Thanks for using ${this.client.user.username}`)
            .setTimestamp();
        message.channel.send(embed);
    }

}

module.exports = ViewPerm;