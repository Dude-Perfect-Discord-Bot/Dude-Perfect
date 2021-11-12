const { Command } = require('discord-akairo');
const {
  Role: { comparePositions },
} = require('discord.js');

class Nickname extends Command {
  constructor() {
    super('nickname', {
      aliases: ['nickname', 'nick'],
      category: 'Guild Management',
      description: {
        content:
          'Sets the provide nickname of the user provided by the executor.',
        usage: '<user> <nickname>',
        examples: ['Xynox#0117 <nickname>'],
      },
      userPermissions: ['MANAGE_NICKNAMES'],
      clientPermissions: ['MANAGE_NICKNAMES'],
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start:
              '<a:RedTick:760514410115498025> **You need to mention a user!**',
          },
        },
        {
          id: 'nick',
          type: 'string',
          match: 'rest',
        },
      ],
    });
  }
  async exec(message, { member, nick }) {
    if (
      comparePositions(message.guild.me.roles.highest, member.roles.highest) <=
      0
    ) {
      return message.reply(
        `<a:RedTick:760514410115498025> **${member}'s role is above or equal to my role so i can't change their nickname.**`
      );
    }
    if (
      comparePositions(message.member.roles.highest, member.roles.highest) <=
      0
    ) {
      return message.reply(
        `<a:RedTick:760514410115498025> **${member}'s role is above or equal to your role, so i can't change their nickname.**`
      );
    }

    member.setNickname(nick ?? null).then((mem) => {
      return message.util.send(
        mem.nickname
          ? `<:check:753484699237613630> **${mem}'s** nickname set to **${mem.nickname}**.`
          : `<:check:753484699237613630> Resested **${mem}'s** nickname to username.`
      );
    });
  }
}
module.exports = Nickname;
