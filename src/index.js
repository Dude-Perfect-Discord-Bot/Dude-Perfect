const { log } = require('console');
const { Client, Intents } = require("discord.js");
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { Client: StatcordClient } = require("statcord.js");
const DBL = require("dblapi.js");

const { config } = require('dotenv');
const { join } = require('path');

config(); 

const commandsPath = join(__dirname, '..', 'commands/');
const listenersPath = join(__dirname, '..', 'listeners/');

class XynoxClient extends AkairoClient {
    constructor() {
        super(
            {
                ownerID: process.env.ownerID
            },
            {
                disableEveryone: true,
            }
        );
		
        // Stats
        this.statCord = new StatcordClient({
            client: this,
            key: process.env.STATCORD_KEY
        })
        this.dbl = new DBL(process.env.TOP_GG_TOKEN, {
            statsInterval: 900000
        }, this)

        // Handlers . . .
        this.commandHandler = new CommandHandler(this, {
            prefix: process.env.PREFIX,
            blockBots: true,
            blockClient: true,
            allowMention: true,
            handleEdits: true,
            defaultCooldown: 500,
            commandUtil: true,
            ignoreCooldown: ['259008949427109891', '430236084744749058', '371600898822111234', '365644930556755969'],
            directory: join(__dirname, "commands")
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "listeners")
        });

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            statCord: this.statCord,
            dbl: this.dbl
        })

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
    }
}

        // Client Login . . .
const client = new XynoxClient();
client.login(process.env.TOKEN);
