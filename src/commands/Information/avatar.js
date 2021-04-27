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

class Avatar extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar', 'av'],
            channel: 'guild',
            category: 'Information',
            description: {
                content: 'Displays avatar of provided user or the command executor.',
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
            ratelimit: 2
        })
    }

    async exec(message, args) {

        let msg = await message.channel.send('<a:setting:754636981459353701> Generating avatar...');

        const member = args.member;

        const embed = new MessageEmbed()
            .setImage(member.user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setColor("#00ff9e")
            .setTitle(`**Avatar of ${member.user.tag} **`)
            .setDescription("[**Avatar URL link**](" + member.user.displayAvatarURL({ dynamic: true }) + ")")
            .setFooter(
                `${this.client.user.username} is made with ❤️`,
                `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
            );

        message.channel.send(embed);

        msg.delete();

    }
}

module.exports = Avatar;