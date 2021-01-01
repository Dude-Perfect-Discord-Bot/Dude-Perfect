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

class Enlarge extends Command {
    constructor() {
        super('enlarge', {
            aliases: ['enlarge', 'emoji'],
            args: [
                {
                    id: 'emoji',
                    prompt: {
                        start: '<a:RedTick:760514410115498025> **You need to provide a emoji which is to be enlarged!**',
                        retry: '<a:RedTick:760514410115498025> **Provide a emoji which is added in this guild!**'
                    },
                    match: 'content',
                    type: 'emoji',
                    default: null
                }
            ],
            description: {
                content: 'Enlarges the provided emoji.',
                usage: '<emoji>',
                examples: [':lookingfor:', 'lookingfor', '754421240923553858', '<a:lookingfor:754421240923553858>']
            },
            category: 'Information',
            ratelimit: 2
        });
    }

    exec(message, { emoji }) {
        emoji.fetchAuthor().then(() => {
            message.channel.send(`${emoji.url}`);
        });
    }
}

module.exports = Enlarge;