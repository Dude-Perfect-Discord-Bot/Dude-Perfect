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

const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class Support extends Command {
    constructor() {
        super('support', {
            aliases: ['support'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'Provides you the invite link of the bot to add it in other servers.'
            }
        });
    }

    exec(message) {
        const embed = new Discord.MessageEmbed()
        .setColor('#00ff9e')
        .setTitle('Want Some Support?')
        .setDescription('Join ❯ https://discord.gg/ZzbZpdw')
        .setFooter(`${this.client.user.username} is made with ❤️`, `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`)

        message.channel.send(embed)

    }
}

module.exports = Support;
