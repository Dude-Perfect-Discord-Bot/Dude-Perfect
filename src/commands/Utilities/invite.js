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

class Invite extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite', 'add'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'Provides you the invite link of the bot to add it in other servers.'
            }
        });
    }

    exec(message) {

        message.reply('**Invite me ❯ ** https://discord.com/api/oauth2/authorize?client_id=759763855680602122&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Finvite%2FZzbZpdw&scope=bot')

    }
}

module.exports = Invite;