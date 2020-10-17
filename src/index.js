const { log } = require('console');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

const { config } = require('dotenv');
const { join } = require('path');

// Executes .env file 
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
