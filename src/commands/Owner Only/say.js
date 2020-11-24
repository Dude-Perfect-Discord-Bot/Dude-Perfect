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

class SayMessage extends Command {
    constructor() {
        super('say', {
            aliases: ['say', 'speak'],
            category: 'Bot Owner Only',
            ownerOnly: true,
            typing: true,
            args: [
                {
                    id: 'thing',
                    type: 'string',
                    match: 'content'
                }
            ]
        });
    }

    async exec(message, { thing }) {
        
        if (message.author.id !== "594853883742912512") return message.reply("**Only `Bot Owner` can run this command.**");

        message.channel.send(thing);
        message.delete();
    }
}

module.exports = SayMessage;