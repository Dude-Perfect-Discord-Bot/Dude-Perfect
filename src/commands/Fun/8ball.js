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
const { MessageEmbed } = require('discord.js');
const got = require('got');


class EightBall extends Command {
    constructor() {
        super('8ball', {
            aliases: ['8ball'],
            channel: 'guild',
            category: 'Fun',
            description: {
                content: 'Provides you a random question based on your questions.',
                usage: '<question>',
                examples: ['Why do you exist on Discord?']
            },
            args: [
                {
                    id: 'question',
                    type: 'string',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to ask a question so that I can answer to it!**"
                    },
                }
            ],
            typing: true
        });
    }

    exec (message){

        var ball = ["Yes", "No", "Certainly", "Of course", "No doubt about that", "Yep i guess", "Problably No", "Not sure", "Certainly", "If you wish so", "Why not?", "Are u sure? Coz m not!", "Yes, if u wish"];

        let answer = ball[Math.floor(Math.random() * ball.length)]

        let em = new MessageEmbed()
            .setTitle(`Asked by ${ message.author.tag }`)
            .setColor("#00ff9e")
            .setDescription(`What I think is: **${answer}**`)
            .setTimestamp()
            .setFooter(`Thanks for using ${this.client.user.username}`)

        message.channel.send(em);
    }

}

module.exports = EightBall;