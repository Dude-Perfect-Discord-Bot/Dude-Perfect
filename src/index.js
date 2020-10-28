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

const { log } = require('console');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

const { config } = require('dotenv');
const { join } = require('path');

config();

const commandsPath = join(__dirname, '..', 'commands/');
const listenersPath = join(__dirname, '..', 'listeners/');

class XynoxClient extends AkairoClient{
    constructor() {
        super(
            {
                ownerID: process.env.ownerID
            },
            {
                disableEveryone: true
            }
        );

        // Handlers . . .
        this.commandHandler = new CommandHandler(this, {
            prefix: 'dp!',
            blockBots: true,
            blockClient: true,
            allowMention: true,
            defaultCooldown: 500,
            commandUtil: true,
            ignoreCooldown: ['259008949427109891', '430236084744749058', '371600898822111234', '365644930556755969'],
            directory: join(__dirname, "commands")
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "listeners")
        });

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
    }
}

const client = new XynoxClient();
client.login(process.env.TOKEN);
