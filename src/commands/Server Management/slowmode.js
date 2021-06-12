const { Command } = require('discord-akairo');
const { formatDuration } = require('../../utility/formatDuration');

class Slowmode extends Command {
  constructor() {
    super('slowmodeset', {
      aliases: ['slowmodeset', 'sm'],
      channel: 'guild',
      category: 'Guild Management',
      clientPermissions: ['MANAGE_CHANNELS'],
      userPermissions: ['MANAGE_CHANNELS'],
      args: [
        {
          id: 'time',
          type: 'number',
          default: 0,
        },
      ],
      description: {
        content: 'Sets the slowmode in channel.',
        usage: '<time>',
        examples: ['5'],
      },
    });
  }

  async exec(message, { time }) {
    try {
      await message.channel.setRateLimitPerUser(time);
      return message.util.send(
        `<:check:753484699237613630> **Slowmode ${
          time === 0
            ? 'has been disabled!**'
            : `has been set for ${formatDuration(time * 1000)}.**`
        }`
      );
    } catch (err) {
      return message.util.send(`<a:RedTick:760514410115498025> **${err}**`);
    }
  }
}

module.exports = Slowmode;
