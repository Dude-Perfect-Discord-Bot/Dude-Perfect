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
const superagent = require('superagent');


class Advice extends Command {
    constructor() {
        super('advice', {
            aliases: ['advice'],
            channel: 'guild',
            category: 'Fun',
            description: {
                content: 'Gives a random advice.'
            },
            typing: true
        });
    }

    exec (message){

        superagent.get("http://api.adviceslip.com/advice").end((err, res) => {
            if (!err && res.status === 200) {
                try {
                    JSON.parse(res.text);
                } catch (e) {
                    return message.reply(", an api error occurred.");
                }
                const advice = JSON.parse(res.text);
                message.channel.send(`👉  __**${advice.slip.advice}**__`);
            } else {
                console.error(`REST call failed: ${err}, status code: ${res.status}`);
            }
        });
    }

}

module.exports = Advice;