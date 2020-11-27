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

class Welcome extends Command {
    constructor() {
        super('wlc', {
            aliases: ['wlc', 'greet'],
            channel: 'guild',
            category: 'Bot Owner Only',
            ownerOnly: true
        });
    }

    async exec(message) {
        const embed = new MessageEmbed()
            .setColor("5c00ff")
            .setTitle(`<a:wumpuswave:754062589746479227> ${message.guild.name} `)
            .setDescription(`**You are now the member of ${message.guild.name}\nNow read rules and about us to get informed about the server.**`)
            .setImage("https://cdn.discordapp.com/attachments/652317857316601866/658290232353095723/wlecome.gif")
            .setFooter("Made with ❤️ by Xynox.", "https://cdn.discordapp.com/attachments/748808131865215004/766901873298112512/Untitled941.png")
        message.channel.send(embed);


        await message.delete();
        return;

    }
}
module.exports = Welcome;


