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

const { Command } = require("discord-akairo");

class Nickname extends Command {
    constructor() {
        super('nickname', {
            aliases: ['nickname', 'nick'],
            category: 'Guild Management',
            description: {
                content: 'Sets the provide nickname of the user provided by the executor.',
                usage: '<user> <nickname>',
                examples: ['Xynox#0117 <nickname>']
            },
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention a user!**"
                    }
                },
                {
                    id: "nick",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention a nickname!**"
                    }


                },
            ],
            typing: true
        });
    }
    async exec(message, { member, nick }) {

        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("<a:RedTick:760514410115498025> **You need `MANAGE_NICKNAMES` permission to use this command!**");

        try {

            await member.setNickname(nick)
        return message.channel.send(`<:check:753484699237613630> Nickname of the **${member.user.tag}** has been set as **${nick}**`);

        } catch (err) 
                {  
                    message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
                }
    }
}
module.exports = Nickname;