const { Listener } = require('discord-akairo');
const { version } = require('../../package.json');

class Ready extends Listener {
  constructor() {
    super('ready', {
      event: 'ready',
      emitter: 'client',
    });
  }

  async exec() {
    this.client.user.setActivity(`dp!help | Made with ❤️`, {
      type: 'WATCHING',
    });

    console.log(String.raw`________             ___       __________                _____                __   
    \______ \  __ __  __| _/ ____  \______   \ ____ ________/ ____\ ____   ____ _/  |_ 
     |    |  \|  |  \/ __ |_/ __ \  |     ___// __ \\_  __ \   __\_/ __ \_/ ___\\   __\
     |    |   \  |  / /_/ |\  ___/_ |    |   \  ___/_|  | \/|  |  \  ___/_  \___ |  |  
    /_______  /____/\____ | \___  / |____|    \___  /|__|   |_ |   \___  /\___  /|__|  
            \/           \/     \/                \/          \/       \/     \/    `);
    console.log(
      String.raw`                                                         v${version}`
    );
  }
}

module.exports = Ready;
