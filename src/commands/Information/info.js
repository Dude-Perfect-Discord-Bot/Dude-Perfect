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
                content: 'Displays information about a provided user or the command executor.',
                usage: '[user]',
                examples: ['Xynox#0117']
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ],
            ratelimit: 2
        });
    }

    async exec(message, args) {

        const flags = {
            DISCORD_EMPLOYEE: '<:staff:753975912969797682>',
            DISCORD_PARTNER: '<:partner:753976272765583461>',
            BUGHUNTER_LEVEL_1: '<:bughunter:753976807799259178>',
            BUGHUNTER_LEVEL_2: '<:bughuntergold:753976795950350426>',
            HYPESQUAD_EVENTS: '<:hypesquadevents:753976575321702472>',
            HOUSE_BRAVERY: '<:bravery:753976846877458442>',
            HOUSE_BRILLIANCE: '<:brilliance:753976825150963842>',
            HOUSE_BALANCE: '<:balance:753977070865875056>',
            EARLY_SUPPORTER: '<:earlysupporter:753976621836533760>',
            TEAM_USER: 'Team User',
            SYSTEM: '<:verifieddcsystem:753976870042730648>',
            VERIFIED_BOT: '<:VerifiedBot:753976885251407872>',
            VERIFIED_DEVELOPER: '<:botdev:753976973168214176>'
        };

        const member = args.member;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = (member.user.flags ? member.user.flags.toArray() : []);

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor('#00ff9e')
            .addField('__User Information__', [
                `**❯ Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}`,
                `**❯ Tag:** ${member.user.tag}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} (${moment(member.user.createdTimestamp).fromNow()})`,
                `\u200b`
            ])
            .addField('__Member Information__', [
                `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**❯ Display Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**❯ Joinned:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**❯ Roles [${roles.length}]:** ${roles.slice(0, 10).join(', ') || 'None'}`,
                `\u200b`
            ])
            .setFooter(
                `${this.client.user.username} is made with ❤️`,
                `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
            );
        message.channel.send(embed);
    }
}

module.exports = UserInfo;
