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
const math = require('mathjs');

class Cal extends Command {
    constructor() {
        super('cal', {
            aliases: ['cal', 'math', 'calculate'],
            channel: 'guild',
            category: 'Fun',
            description: {
                content: 'Do mathematical problems with Dude Perfect.',
                usage: '<problem>',
                examples: ['1+1']
            },
            args: [
                {
                    id: 'query',
                    type: 'string',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **Provide me the right question to be solved!**"
                    },
                },
            ],
            typing: true
        });
    }

    exec(message, { query }) {

        try {
            let output = math.evaluate(query);
            message.channel.send(this.lang.calcResult.format(query, output));
        } catch (e) {
            message.channel.send(`<a:RedTick:760514410115498025> ${e}`);
            message.reply(this.lang.invalidCalculation);
        }
    }
}

module.exports = Cal;