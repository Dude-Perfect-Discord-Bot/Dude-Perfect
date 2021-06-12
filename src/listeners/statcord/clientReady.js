const { Listener } = require('discord-akairo');

module.exports = class extends Listener {
  constructor() {
    super('clientReady', {
      event: 'ready',
      emitter: 'client',
    });
  }

  exec() {
    this.client.statCord.autopost();
  }
};
