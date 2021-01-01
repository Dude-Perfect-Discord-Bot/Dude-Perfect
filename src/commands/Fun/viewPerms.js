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
            aliases: ['perms','permissions'],
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

    exec(message, { member }) {

        const permissions = this.normalizePermFlag(member.permissions.toArray()).map(perm => `\`${perm}\``);

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('#00ff9e')
            .setDescription(`You have this permissions...${permissions.join(' | ')}`)
            .setFooter(`Thanks for using ${this.client.user.username}`)
            .setTimestamp();
        message.channel.send(embed);
    }

    normalizePermFlag(perms) {
        return perms.map(perm => perm
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/Guild/g, 'Server')
            .replace(/Use Vad/g, 'Use Voice Acitvity')
            );
      }

}

module.exports = ViewPerm;
