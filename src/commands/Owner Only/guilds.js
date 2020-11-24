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

class Guilds extends Command {
    constructor() {
        super('guilds', {
            aliases: ['guilds', 'botguild'],
            channel: 'guild',
            category: 'Bot Owner Only',
            ownerOnly: true
            });
    }

    exec(message) {

        if (message.author.id !== "594853883742912512") return message.reply("**Only `Bot Owner` can run this command.**");

        message.channel.send("** <a:star4:761157512614772736> __My Guilds__ **");

        this.client.guilds.cache.forEach(x => message.channel.send(`<:check:753484699237613630> **${x.name}** - \`${x.id}\``))

            message.delete();
    }
}
module.exports = Guilds;


