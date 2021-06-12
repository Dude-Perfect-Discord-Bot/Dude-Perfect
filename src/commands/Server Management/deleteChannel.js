const { Command } = require('discord-akairo');

class DeleteChannel extends Command {
  constructor() {
    super('deleteChannel', {
      aliases: ['deleteChannel', 'delete-channel', 'dch'],
      channel: 'guild',
      category: 'Guild Management',
      description: {
        content:
          'Deletes channel as per the arguments entered by the command executor.',
        usage: '<channel-id>',
        examples: ['000000(general-chat)'],
      },
      clientPermissions: ['MANAGE_CHANNELS'],
      userPermissions: ['MANAGE_CHANNELS'],
      args: [
        {
          id: 'ch',
          type: 'string',
          prompt: {
            start:
              '<a:RedTick:760514410115498025> **You need to mention channel id!**',
          },
        },
      ],
    });
  }

  async exec(message, { ch }) {
    try {
      const channel = message.guild.channels.cache.get(ch);
      channel.delete();

      await message.util.send(
        `<:check:753484699237613630> Channel has been successfully deleted by **${message.author.tag}**.`
      );
    } catch (err) {
      message.util.send(`<a:RedTick:760514410115498025> **${err}**`);
    }
  }
}

module.exports = DeleteChannel;
