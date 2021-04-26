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
const figlet = require('util').promisify(require('figlet'));


class Ascii extends Command {
    constructor() {
        super('ascii', {
            aliases: ['ascii'],
            channel: 'guild',
            category: 'Fun',
            description: {
                content: 'Creates ASCII art from text.',
                usage: '<text>',
                examples: ['Dude Perfect']
            },
            args: [
                {
                    id: 'text',
                    type: 'string',
                    match: 'content',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to provide me a text!**"
                    }
                }
            ]
        });
    }

    async exec(message, { text }) {

        message.channel.send(await figlet(text), { code: true });

    }
}

module.exports = Ascii;