const { Listener } = require('discord-akairo');

module.exports = class extends Listener {
  constructor() {
    super('dblError', {
      event: 'error',
      emitter: 'dbl',
    });
  }

  exec(error) {
    console.log(`Error while posting logs to DBL: ${error}`);
  }
};
