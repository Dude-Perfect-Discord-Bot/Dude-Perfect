const {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
} = require('discord-akairo');
const { Client: StatcordClient } = require('statcord.js');
const { AutoPoster } = require('topgg-autoposter');

const { config } = require('dotenv');
const { join } = require('path');

config();
class DudePerfectClient extends AkairoClient {
  constructor() {
    super({
      ownerID: process.env.owners
        ? process.env.owners.split(',')
        : process.env.ownerID,
      disableMentions: 'everyone',
    });

    // Stats
    this.statCord = new StatcordClient({
      client: this,
      key: process.env.STATCORD_KEY,
    });
    this.dbl = new AutoPoster(process.env.TOP_GG_TOKEN, this);

    // Handlers . . .
    this.commandHandler = new CommandHandler(this, {
      prefix: process.env.PREFIX,
      blockBots: true,
      blockClient: true,
      allowMention: true,
      handleEdits: true,
      defaultCooldown: 5000,
      commandUtil: true,
      ignoreCooldown: [
        '259008949427109891',
        '430236084744749058',
        '371600898822111234',
        '365644930556755969',
      ],
      directory: join(__dirname, 'commands'),
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, 'listeners'),
    });

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      statCord: this.statCord,
      dbl: this.dbl,
    });

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
  }
}

// Client Login . . .
const client = new DudePerfectClient();
client.login(process.env.TOKEN);
