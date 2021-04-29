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

class RoleColorCommand extends Command {
    constructor() {
        super('rolecolor', {
            aliases: ['rolecolor', 'rc'],
            category: 'Miscellaneous',
            description: {
                content: 'Get information about a role\'s color',
                permissions: ['EMBED_LINKS']
            },
            args: [{
                id: 'role',
                type: 'role',
                default: message => message.member.roles.highest
            }],
            clientPermissions: ['EMBED_LINKS']
        });
    }

    async exec(message, args) {
        let role = args.role;
        let hex = role.hexColor.replace(/#/g, "");
        const data = await this.client.flipnote.others.color(hex);
        return message.util.send({
            embed: this.client.util.embed()
                .setTitle(`**${role.name}** Role Color`)
                .setDescription(`Hex Code: ${data.hex}\nName: [${data.name}](${data.image})`)
                .setColor(`${role.hexColor}`)
                .setThumbnail(this.client.avatar)
                .setImage(`${data.image}`)
                .setFooter(`Requested by ${message.author.username}`)
                .setTimestamp()
        })
    }
}

module.exports = RoleColorCommand;
