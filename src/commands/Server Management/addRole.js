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

class AddRole extends Command {
    constructor() {
        super('addRole', {
            aliases: ['addRole', 'addrole', 'addr', 'roleadd'],
            channel: 'guild',
            category: 'Guild Management',
            description: {
                content: 'Adds some role to the user mentioned!',
                usage: '<user> <role>',
                examples: ['Arindamz#8695 @Cool Dude']
            },
            userPermissions: ['MANAGE_ROLES'],
            clientPermissions: ['MANAGE_ROLES'],
        });
    }

    async exec(message, args) {

        let member = message.mentions.members.first();
        if (!member) return message.reply('<a:RedTick:760514410115498025> No Member Found!');
      
        let arole = args.slice(1).join(" ");
        let role = message.guild.roles.cache.find(r => r.name === arole);
        if (!role) return message.reply('<a:RedTick:760514410115498025> No Role Found!');
      
          member.roles.add(role).then(message.channel.send('<:check:753484699237613630> Added Role to User!'))
          .catch(err => {
            message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
        });

    }

}

module.exports = AddRole;
