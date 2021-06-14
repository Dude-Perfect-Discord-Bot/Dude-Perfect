const { Argument, Category, Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const { normalizePermFlag } = require('../../utility/normalizePermFlag');

class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'halp'],
      args: [
        {
          id: 'query',
          type: Argument.union('command', 'commandAlias', (__, pharse) => {
            return this.handler.findCategory(pharse) ?? null;
          }),
          default: null,
        },
      ],
      category: 'Utilities',
      description: {
        content: 'Displays information about a command',
        usage: '[command]',
        examples: ['userinfo'],
      },
    });
  }

  exec(message, { query }) {
    const { prefix } = this.handler;
    const embed = new MessageEmbed()
      .setColor('#00ff9e')
      .setURL('https://discord.gg/ZzbZpdw');
    const isOwner = this.client.isOwner(message.author);

    if (query instanceof Command) {
      if (query.aliases.length > 1) {
        embed.addField('❯ Aliases', `\`${query.aliases.join('`, `')}\``);
      }
      embed
        .setTitle(
          `${this.capitalizeFirstLetter(query.aliases[0])} Command Help`
        )
        .addField(
          '❯ Description',
          `\`${query.description.content}\`` ?? '`No Description provided`'
        )
        .addField('❯ Category', `\`${query.category.id}\``)
        .addField(
          '❯ Usage',
          `\`${prefix}${query.aliases[0]} ${
            query.description.usage ? query.description.usage.trim() : ''
          }\``
        )

        .addField(
          '❯ Permissions',
          `\`${normalizePermFlag(
            ['SEND_MESSAGES'].concat(query.userPermissions ?? [])
          ).join('`, `')}\``
        );
      if (query.description.examples?.length) {
        embed.addField(
          '❯ Examples',
          `\`${prefix}${query.aliases[0]} ${query.description.examples.join(
            `\`\n\`${query.aliases[0]} `
          )}\``
        );
      }
    } else if (query instanceof Category) {
      const category = this.handler.categories.get(query.id);
      const commands = [...category.values()].filter((cmd) => {
        return isOwner ? true : !cmd.ownerOnly;
      });
      embed
        .setTitle(`${this.capitalizeFirstLetter(category.id)} Commands`)
        .setDescription(
          `\`${commands.map((cmd) => cmd.aliases[0]).join('`, `')}\``
        )
        .setFooter(`${commands.length} Commands`);
    } else {
      embed
        .setAuthor(
          `Help Interface`,
          `${message.guild.iconURL({ dynamic: true })}`
        )
        .setThumbnail(`https://i.imgur.com/OpNjeck.png`)
        .setDescription(
          stripIndents`
                    These are the commands which are executable in the **${this.client.user.username}**.
					For additional info on a command, type \`${prefix}help <command>\`.
                    Some commands may require arguments ie. **<>** mean required, **[]** mean optional.
					`
        )
        .setFooter(
          `${this.client.user.username} is made with ❤️`,
          `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
        )
        .addFields(this._mapCommands(isOwner))
        .addField(`❯ Check Out`, [
          ` [**Wiki**](https://github.com/Dude-Perfect-Discord-Bot/Dude-Perfect/wiki) • [**Invite**](http://bit.ly/dpdb_xynox) • [**Support**](https://discord.gg/ZzbZpdw) • [**GitHub**](https://github.com/Dude-Perfect-Discord-Bot/Dude-Perfect) • [**Donate**](https://www.patreon.com/arindamz)`,
        ]);
    }

    return message.util.send(embed);
  }

  _mapCommands(isOwner = false) {
    const entries = {};

    for (const [category, categoryCommands] of this.handler.categories) {
      const cmds = [...categoryCommands.values()];
      entries[category] = cmds.filter((cmd) =>
        !isOwner ? !cmd.ownerOnly : true
      );
      if (entries[category].length <= 0) delete entries[category];
    }

    return Object.entries(entries).map(([cat, commands]) => ({
      name: `${this.capitalizeFirstLetter(cat)} Commands \`[${
        commands.length
      }]\``,
      value: `\`${commands.join('`, `')}\``,
      inline: false,
    }));
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

module.exports = HelpCommand;
