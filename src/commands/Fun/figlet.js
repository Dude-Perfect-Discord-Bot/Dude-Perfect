const { Command } = require('discord-akairo');
const figlet = require('util').promisify(require('figlet'));

class Figlet extends Command {
  constructor() {
    super('figlet', {
      aliases: ['figlet'],
      channel: 'guild',
      category: 'Fun',
      description: {
        content: 'Creates Figlet art from text.',
        usage: '<text>',
        examples: ['Dude Perfect'],
      },
      args: [
        {
          id: 'text',
          type: 'string',
          match: 'content',
          prompt: {
            start:
              '<a:RedTick:760514410115498025> **You need to provide me a text!**',
          },
        },
      ],
    });
  }

  async exec(message, { text }) {
    message.util.send(await figlet(text), { code: true });
  }
}

module.exports = Figlet;
