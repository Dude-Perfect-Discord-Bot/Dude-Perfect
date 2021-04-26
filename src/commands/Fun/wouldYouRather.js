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


class WouldYouRather extends Command {
    constructor() {
        super('wouldYouRather', {
            aliases: ['wouldYouRather', 'wyr'],
            channel: 'guild',
            category: 'Fun',
            description: {
                content: 'Chooses one of your preferences provide to the bot.',
                usage: '<choice1> <choice2>',
                examples: ['tea coffee']
            },
            args: [
                {
                    id: 'q1',
                    type: 'string',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **Provide me your choice 1!**"
                    },
                },
                {
                    id: 'q2',
                    type: 'string',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **Provide me your choice 2!**"
                    },
                }
            ]
        });
    }

    exec(message, { q1, q2}) {

        var ans = [`${q1}`, `${q2}`];

        let answer = ans[Math.floor(Math.random() * ans.length)]

        message.channel.send(`${answer}`);
    }

}

module.exports = WouldYouRather;