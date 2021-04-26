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

class DeleteChannel extends Command {
    constructor() {
        super('deleteChannel', {
            aliases: ['deleteChannel', 'delete-channel', 'dch'],
            channel: 'guild',
            category: 'Guild Management',
            description: {
                content: 'Deletes channel as per the arguments entered by the command executor.',
                usage: '<channel-id>',
                examples: ['000000(general-chat)']
            },
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS'],
            args: [
                {
                    id: 'ch',
                    type: 'string',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention channel id!**"
                    },
                }
            ]
        });
    }

    async exec(message, { ch }) {

        try {
            let channel = message.guild.channels.cache.get(`${ch}`)
             channel.delete()

            await message.channel.send(`<:check:753484699237613630> Channel has been successfully deleted by **${message.author.tag}**.`);

        } catch (err) {
            message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
        }

    }

}

module.exports = DeleteChannel;