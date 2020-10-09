const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'halp'],
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    default: null
                }
            ],
            category: 'Information',
            description: {
                content: 'Displays information about a command',
                usage: '[command]',
                examples: ['[command name]']
            }
        });
    }

    exec(message, { command }) {
        const prefix = this.handler.prefix;
        const embed = new MessageEmbed().setColor('#00ff9e');

        if (command) {
            embed
                .setColor('#00ff9e')
                .addField(
                    '❯ Usage',
                    `\`${command.aliases[0]} ${command.description.usage ? command.description.usage : ''
                    }\``
                )
                .addField(
                    '❯ Description',
                    command.description.content || 'No Description provided'
                );

            if (command.aliases.length > 1) {
                embed.addField('❯ Aliases', `\`${command.aliases.join('`, `')}\``);
            }
            if (command.description.examples && command.description.examples.length) {
                embed.addField(
                    '❯ Examples',
                    `\`${command.aliases[0]} ${command.description.examples.join(
                        `\`\n\`${command.aliases[0]} `
                    )}\``
                );
            }
        } else {
            embed
                .setTitle('❯ Help Interface')
                .setDescription(
                    stripIndents`
                    These are the commands which are executable in the **${this.client.user.username}**.
					For additional info on a command, type \`${prefix}help <command>\`.
                    Some commands may require arguments ie. **<>** mean required, **[]** mean optional.
					`
                )
                .setFooter(
                    `${this.client.user.username} is made with ❤️ by <@!${this.client.ownerID}>.`,
                    this.client.user.displayAvatarURL()
                );

            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `❯ ${category.id.replace(/(\b\w)/gi, (lc) =>
                        lc.toUpperCase())} - ${category.size}`,
                    `${category
                        .filter((cmd) => cmd.aliases.length > 0)
                        .map((cmd) => `\`${cmd.aliases[0]}\``)
                        .join(', ')}`
                );
            }
        }

        return message.util.send(embed);
    }
}

module.exports = HelpCommand;