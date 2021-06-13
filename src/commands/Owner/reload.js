const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

module.exports = class Reload extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload'],
      ownerOnly: true,
      clientPermissions: [
        'SEND_MESSAGES',
        'ADD_REACTIONS',
        'USE_EXTERNAL_EMOJIS',
      ],
      description: {
        content: 'Reload a command/listener/inhibitor',
        usage: '<Command | Listener | Inhibitor>',
      },
      category: 'Owner',
      args: [
        {
          id: 'things',
          type: Argument.union('command', 'listener', 'inhibitor'),
          prompt: {
            start: 'What do i reload ?',
            time: 4.5e4,
          },
        },
      ],
    });
  }
  async exec(message, { things }) {
    try {
      await things.reload();
      message.react('<:check:753484699237613630>');
    } catch (err) {
      const embed = new MessageEmbed().addField(
        `<a:RedTick:760514410115498025> Error Reloading ${things.id}`,
        `\`\`\`js\n${err}\`\`\``
      );
      await message.util.send(embed);
    }
  }
};
