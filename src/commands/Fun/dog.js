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
const fetch = require('node-fetch');
const subreddits = [
    'dog',
    'dogs',
    'dogpics',
    'puppies'
];

class Dog extends Command {
    constructor() {
        super('dog', {
            aliases: ['dog', 'doggo', 'dogs'],
            channel: 'guild',
            category: 'Fun',
            description: {
                content: 'Gives a random pic of a dog.'
            }
        });
    }

    async exec(message) {

        const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
            .then(response => response.json())
            .then(body => body.data);
        const selected = data[Math.floor(Math.random() * data.length)];
        return message.channel.send(
            new MessageEmbed()
                .setTitle(`Bow 🐶`)
                .setColor("#00ff9e")
                .setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`)
                .setFooter(`Thanks for using ${this.client.user.username}`)
            );

    }

}

module.exports = Dog;