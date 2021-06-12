const { Command } = require('discord-akairo');

class Invite extends Command {
  constructor() {
    super('invite', {
      aliases: ['invite', 'add'],
      channel: 'guild',
      category: 'Utilities',
      description: {
        content:
          'Provides you the invite link of the bot to add it in other servers.',
      },
    });
  }

  exec(message) {
    message.util.reply(
      '**Invite me ❯ ** \nhttps://discord.com/api/oauth2/authorize?client_id=759763855680602122&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Finvite%2FZzbZpdw&scope=bot'
    );
  }
}

module.exports = Invite;
