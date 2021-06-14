const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { normalizePermFlag } = require('../../utility/normalizePermFlag');

module.exports = class ViewPerm extends Command {
  constructor() {
    super('viewPerm', {
      aliases: ['perms', 'permissions', 'myperm'],
      channel: 'guild',
      category: 'Fun',
      description: {
        content: 'Shows what permission you have in the guild.',
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

  exec(message, { member }) {
    const permissions = normalizePermFlag(member.permissions.toArray()).map(
      (perm) => `\`${perm}\``
    );

    const embed = new MessageEmbed()
      .setAuthor(
        `${member.user.tag} 👇`,
        `${message.guild.iconURL({ dynamic: true })}`
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor('#00ff9e')
      .setDescription(
        `**Your Member Guild Permissions in ${
          message.guild.name
        } are:** \n${permissions.join(' | ')}`
      )
      .setFooter(
        `${this.client.user.username} is made with ❤️`,
        `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
      );
    message.util.send(embed);
  }
};
