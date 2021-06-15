const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Avatar extends Command {
  constructor() {
    super('avatar', {
      aliases: ['avatar', 'av'],
      channel: 'guild',
      category: 'Information',
      description: {
        content: 'Displays avatar of provided user or the command executor.',
        usage: '[user]',
        examples: ['Xynox#0117'],
      },
      args: [
        {
          id: 'member',
          type: 'member',
          default: (message) => message.member,
        },
      ],
      ratelimit: 2,
    });
  }

  async exec(message, args) {
    const { member } = args;

    const embed = new MessageEmbed()
      .setImage(member.user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setColor('#00ff9e')
      .setTitle(`**Avatar of ${member.user.tag} **`)
      .setDescription(
        `[**Avatar URL link**](${member.user.displayAvatarURL({
          dynamic: true,
        })})`
      )
      .setFooter(
        `${this.client.user.username} is made with ❤️`,
        `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
      );

    message.util.send(embed);
  }
}

module.exports = Avatar;
