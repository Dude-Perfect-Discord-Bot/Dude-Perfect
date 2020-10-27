// Copyright 2019 Arindam Hazra aka Xynox < https://arindamz.github.io/>
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

class Ping extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'pong'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This provides the ping of the bot.'
            }
        });
    }

    async exec(message) {

        const msg = await message.channel.send('Pinging...');

        const latency = msg.createdTimestamp - message.createdTimestamp;
        const choices = ['Is this really my ping?', 'Is that okay? I can\'t look!', 'I hope it isn\'t bad!'];
        const reponse = choices[Math.floor(Math.random() * choices.length)];

        msg.edit(`${reponse} - **Bot Latency**: \`${latency}ms\`, **API Latency**: \`${Math.round(this.client.ws.ping)}ms\``)

    }
}

module.exports = Ping;