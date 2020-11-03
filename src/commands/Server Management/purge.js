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

class Purge extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge', 'prune'],
            channel: 'guild',
            category: 'Guild Management',
            description: {
                content: 'Deletes number of messages as per the arguments entered by the command executor.',
                usage: '<number>',
                examples: ['15']
            },
            args: [
                {
                    id: 'msg',
                    type: 'number',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention number of messages to be purge ie. it should be under 100!**"
                    },
                }
            ],
            typing: true

        });
    }

    async exec(message, { msg }) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("<a:RedTick:760514410115498025> **You need `MANAGE_MESSAGES` permission to use this command!**");

        try {
            message.channel.bulkDelete(`${msg}`)

            await message.channel.send(`<:check:753484699237613630> **${msg}** messages has been successfully purged by **${message.author.tag}**.`);

        } catch (err) {
            message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
        }

    }

}

module.exports = Purge;