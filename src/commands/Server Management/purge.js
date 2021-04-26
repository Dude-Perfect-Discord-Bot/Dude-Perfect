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
            cooldown: 5000,
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    id: 'count',
                    type: (_, phrase) => {
                        if (!phrase || isNaN(parseInt(phrase))) return null;
                        const num = parseInt(phrase);
                        if (num < 2 || num > 100) return null;
                        return num;
                    },
                    prompt: {
                        start: (msg) => `<a:RedTick:760514410115498025> ${msg.author}, how man messages do you want to clean ? (2-100)`,
                        retry: (msg) => `<a:RedTick:760514410115498025> ${msg.author}, please enter a number between 2 and 100!`,
                    },
                }
            ]
        });
    }

    async exec(message, { count }) {

        message.delete();

        const messages = await message.channel.messages.fetch();
        const filtered = messages
            .filter(msg => msg.id !== message.id)
            .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
            .array()
            .slice(0, count);

        message.channel.send(`Deleting ${filtered.length} messages, please wait...`).then(msg => {
            message.channel.bulkDelete(filtered, true).then(({ size }) => {
                msg.edit(`<:check:753484699237613630> **${size}** messages has been successfully purged by **${message.author.tag}**.`).then(m => {
                    m.delete({ timeout: 5000 });
                })
            })
        })
            .catch(err => {
                message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
            });

    }

}

module.exports = Purge;