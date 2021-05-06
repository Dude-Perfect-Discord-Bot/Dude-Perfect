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
            category: 'Utilities',
            description: {
                content: 'Displays information about a command',
                usage: '[command]',
                examples: ['userinfo']  
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
            embed.addField(`❯ Check Out`, [
                ` [**Wiki**](https://github.com/Dude-Perfect-Discord-Bot/Dude-Perfect/wiki) • [**Invite**](http://bit.ly/dpdb_xynox) • [**Support**](https://discord.gg/ZzbZpdw) • [**GitHub**](https://github.com/Dude-Perfect-Discord-Bot/Dude-Perfect) • [**Donate**](https://www.patreon.com/arindamz)`
            ]);

        }

        return message.util.send(embed);
    }
}

module.exports = HelpCommand;