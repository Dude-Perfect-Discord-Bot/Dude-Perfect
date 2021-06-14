const { Command } = require('discord-akairo');

class Support extends Command {
  constructor() {
    super('support', {
      aliases: ['support'],
      channel: 'guild',
      category: 'Utilities',
      description: {
        content:
          'Provides you the invite link of the bot to add it in other servers.',
      },
    });
  }

  exec(message) {
    message.util.reply('**Join ❯ ** \nhttps://discord.gg/ZzbZpdw');
  }
}

module.exports = Support;
