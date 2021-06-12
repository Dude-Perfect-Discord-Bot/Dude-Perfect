const { Listener } = require('discord-akairo');
const { version } = require('../../package.json');
const { green, greenBright, blue, blueBright } = require('colorette');

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

    const line1 = String.raw`${green('▓')}${greenBright('█████▄')}`;
    const line2 = String.raw`${green('▒')}${greenBright('██▀ ██▌')}`;
    const line3 = String.raw`${green('░')}${greenBright('██   █▌')}`;
    const line4 = String.raw`${green('░▓')}${greenBright('█▄')}${green(
      '   '
    )}${greenBright('▌')}`;
    const line5 = String.raw`${green('░▒')}${greenBright('████')}${green(
      '▓'
    )} `;
    const line6 = String.raw`${green(' ▒▒▓  ▒ ')}`;
    const line7 = String.raw`${green(' ░ ▒  ▒ ')}`;
    const line8 = String.raw`${green(' ░ ░  ░ ')}`;
    const line9 = String.raw`${green('   ░    ')}`;
    const line10 = String.raw`${green(' ░      ')}`;

    console.log(String.raw`
    ${line1}  ________             ___       __________                _____                __   
    ${line2} \______ \  __ __  __| _/ ____  \______   \ ____ ________/ ____\ ____   ____ _/  |_ 
    ${line3}  |    |  \|  |  \/ __ |_/ __ \  |     ___// __ \\_  __ \   __\_/ __ \_/ ___\\   __\
    ${line4}  |    |   \  |  / /_/ |\  ___/_ |    |   \  ___/_|  | \/|  |  \  ___/_  \___ |  |  
    ${line5} /_______  /____/\____ | \___  / |____|    \___  /|__|   |_ |   \___  /\___  /|__|  
    ${line6}         \/           \/     \/                \/          \/       \/     \/    
    ${line7}                                                                         ${blue(
      'v'
    )}${blueBright(version)}
    ${line8}
    ${line9}
    ${line10}
    `);
  }
}

module.exports = Ready;
