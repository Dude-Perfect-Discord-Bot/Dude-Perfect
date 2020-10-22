const { Command } = require('discord-akairo');

class VoiceKick extends Command {
    constructor() {
        super('voiceKick', {
            aliases: ['voicekick', 'vkick', 'vdc'],
            channel: 'guild',
            category: 'Guild Management',
            description: {
                content: 'Disconnects the user provided by the executor from the voice channel.',
                usage: '<user>',
                examples: ['Xynox#0117']
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention user!**"
                    },
                    default: message => message.member
                }
            ],
            typing: true
        });
    }

    async exec(message, { member } ) {

        if (!message.member.hasPermission("MOVE_MEMBERS")) return message.reply("<a:RedTick:760514410115498025> **You need `MOVE_MEMBERS` permission to use this command!**");
        
        try {
        await member.voice.kick(member);
        return message.channel.send(`<:check:753484699237613630> **${member.user.tag}** has successfully disconnected by **${message.author.tag}**.`);

        } catch (err) 
            { 
                message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
            }

    }
}

module.exports = VoiceKick;