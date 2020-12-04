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

class Slowmode extends Command {
    constructor() {
        super('slowmodeset', {
            aliases: ['slowmodeset', 'sm'],
            channel: 'guild',
            category: 'Guild Management',
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS'],
            args: [
                {
                    id: "time",
                    type: "number",
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention time!**"
                    }
                },
            ],
            description: {
                content: 'Sets the provide nickname of the user provided by the executor.',
                usage: '<time>',
                examples: ['5']
            },
            typing: true
        });
    }

    async exec(message, { time }) {

        try {

        await message.channel.setRateLimitPerUser(time)
        return message.channel.send(`<:check:753484699237613630> **Slowmode has been set for ${time} seconds!**`);

        } catch (err) 
                {
                    message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
                }

    }
}

module.exports = Slowmode;