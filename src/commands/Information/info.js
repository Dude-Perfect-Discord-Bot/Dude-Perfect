const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class UserInfo extends Command {
  constructor() {
    super('userinfo', {
      aliases: ['userinfo', 'ui', 'info', 'whois', 'profile', 'me'],
      channel: 'guild',
      category: 'Information',
      description: {
        content:
          'Displays information about a provided user or the command executor.',
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

  async exec(message, { member }) {
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);

    const embed = new MessageEmbed()
      .setTitle(`${member.user.tag}`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor('#00ff9e')
      .addField('__User Information__', [
        `**❯ Badges:** ${member.user.displayFlags()}`,
        `**❯ Tag:** ${member.user.tag}`,
        `**❯ ID:** ${member.id}`,
        `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
          dynamic: true,
        })})`,
        `**❯ Time Created:** ${moment(member.user.createdTimestamp).format(
          'LT'
        )} ${moment(member.user.createdTimestamp).format('LL')} (${moment(
          member.user.createdTimestamp
        ).fromNow()})`,
        `\u200b`,
      ])
      .addField('__Member Information__', [
        `**❯ Highest Role:** ${
          member.roles.highest.id === message.guild.id
            ? 'None'
            : member.roles.highest.name
        }`,
        `**❯ Display Role:** ${
          member.roles.hoist ? member.roles.hoist.name : 'None'
        }`,
        `**❯ Joinned:** ${moment(member.joinedAt).format('LL LTS')}`,
        `**❯ Roles [${roles.length}]:** ${
          roles.slice(0, 10).join(', ') || 'None'
        }`,
        `\u200b`,
      ])
      .setFooter(
        `${this.client.user.username} is made with ❤️`,
        `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
      );
    message.util.send(embed);
  }
}

module.exports = UserInfo;
