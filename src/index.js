const {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
} = require('discord-akairo');
const { Client: StatcordClient } = require('statcord.js');
const { AutoPoster } = require('topgg-autoposter');

const { config } = require('dotenv');
const { join } = require('path');

require('./extensions/DudePerfectUser');

config();
class DudePerfectClient extends AkairoClient {
  constructor() {
    super({
      ownerID: process.env.owners
        ? process.env.owners.split(',')
        : process.env.ownerID,
      disableMentions: 'everyone',
    });

    // Statistical Data recorded with the help other 3rd Party srevices.
    this.statCord = new StatcordClient({
      client: this,
      key: process.env.STATCORD_KEY,
    });
    this.dbl = new AutoPoster(process.env.TOP_GG_TOKEN, this);

    // Handler configuration . . .
    this.commandHandler = new CommandHandler(this, {
      prefix: process.env.PREFIX,
      blockBots: true,
      blockClient: true,
      allowMention: true,
      handleEdits: true,
      defaultCooldown: 5000,
      commandUtil: true,
      // Xynox, Piyush & Anish omly.
      ignoreCooldown: [
        '594853883742912512',
        '365644930556755969',
        '259008949427109891',
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
