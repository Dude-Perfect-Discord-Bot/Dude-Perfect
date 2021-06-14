const { Command } = require('discord-akairo');

class WouldYouRather extends Command {
  constructor() {
    super('wouldYouRather', {
      aliases: ['wyr', 'wouldYouRather'],
      channel: 'guild',
      category: 'Fun',
      description: {
        content: 'Chooses one of your preferences provide to the bot.',
        usage: '<choice1> <choice2>',
        examples: ['tea coffee'],
      },
      args: [
        {
          id: 'q1',
          type: 'string',
          prompt: {
            start:
              '<a:RedTick:760514410115498025> **Provide me your choice 1!**',
          },
        },
        {
          id: 'q2',
          type: 'string',
          prompt: {
            start:
              '<a:RedTick:760514410115498025> **Provide me your choice 2!**',
          },
        },
      ],
    });
  }

  exec(message, { q1, q2 }) {
    const ans = [q1, q2];

    const answer = ans[Math.floor(Math.random() * ans.length)];

    message.util.send(answer);
  }
}

module.exports = WouldYouRather;
