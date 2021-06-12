const { Command } = require('discord-akairo');

class CreateChannel extends Command {
  constructor() {
    super('createChannel', {
      aliases: ['createChannel', 'create-channel', 'cch'],
      channel: 'guild',
      category: 'Guild Management',
      description: {
        content:
          'Creates text/voice channel as per the arguments entered by the command executor.',
        usage: '<channel type> <channel name>',
        examples: ['text general-chat', 'voice General VC'],
      },
      userPermissions: ['MANAGE_CHANNELS'],
      clientPermissions: ['MANAGE_CHANNELS'],
      args: [
        {
          id: 'chtype',
          type: 'string',
          prompt: {
            start:
              '<a:RedTick:760514410115498025> **You need to mention channel type ie. `text/voice`!**',
          },
        },
        {
          id: 'name',
          type: 'string',
          match: 'content',
          prompt: {
            start:
              '<a:RedTick:760514410115498025> **You need to mention channel name!**',
          },
        },
      ],
    });
  }

  async exec(message, { chtype, name }) {
    try {
      await message.guild.channels.create(name, { type: chtype });
      return message.util.send(
        `<:check:753484699237613630> **${name}** has been successfully created by **${message.author.tag}**.`
      );
    } catch (err) {
      return message.util.send(`<a:RedTick:760514410115498025> **${err}**`);
    }
  }
}

module.exports = CreateChannel;
