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

const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'halp'],
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    default: null
                }
            ],
            category: 'Utilities',
            description: {
                content: 'Displays information about a command',
                usage: '[command]',
                examples: ['userinfo']  
            }
        });
    }

    exec(message, { command }) {
        const prefix = this.handler.prefix;
        const embed = new MessageEmbed().setColor('#00ff9e');

        if (command) {
            embed
                .setColor('#00ff9e')
                .addField(
                    '❯ Usage',
                    `\`${command.aliases[0]} ${command.description.usage ? command.description.usage : ''
                    }\``
                )
                .addField(
                    '❯ Description',
                    command.description.content || 'No Description provided'
                );

            if (command.aliases.length > 1) {
                embed.addField('❯ Aliases', `\`${command.aliases.join('`, `')}\``);
            }
            if (command.description.examples && command.description.examples.length) {
                embed.addField(
                    '❯ Examples',
                    `\`${command.aliases[0]} ${command.description.examples.join(
                        `\`\n\`${command.aliases[0]} `
                    )}\``
                );
            }
        } else {
            embed
                .setTitle('Help Interface')
                .setThumbnail(this.client.user.displayAvatarURL())
                .setDescription(
                    stripIndents`
                    These are the commands which are executable in the **${this.client.user.username}**.
					For additional info on a command, type \`${prefix}help <command>\`.
                    Some commands may require arguments ie. **<>** mean required, **[]** mean optional.
					`
                )
                .setFooter(
                    `${this.client.user.username} is made with ❤️`,
                    this.client.user.displayAvatarURL()
                );

            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `❯ ${category.id.replace(/(\b\w)/gi, (lc) =>
                        lc.toUpperCase())} - ${category.size}`,
                    `${category
                        .filter((cmd) => cmd.aliases.length > 0)
                        .map((cmd) => `\`${cmd.aliases[0]}\``)
                        .join(', ')}`
                );    
            }
            embed.addField(`❯ Check Out`, [
                ` [**Support**](https://discord.gg/ZzbZpdw) • [**Invite**](https://discord.com/api/oauth2/authorize?client_id=759763855680602122&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Finvite%2FZzbZpdw&scope=bot) • [**GitHub**](https://github.com/Dude-Perfect-Discord-Bot)`
            ]);

        }

        return message.util.send(embed);
    }
}

module.exports = HelpCommand;