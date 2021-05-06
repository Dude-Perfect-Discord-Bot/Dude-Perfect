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
            clientPermissions: ['MOVE_MEMBERS'],
            userPermissions: ['MOVE_MEMBERS'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: (msg) => `<a:RedTick:760514410115498025> ${msg.author}, **Who do you want to voicekick?**`,
                        retry: (msg) => `<a:RedTick:760514410115498025> ${msg.author}, please mention a member.`,
                    },
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: 'rest'
                }
            ]
        });
    }

    async exec(message, { member, reason  } ) {
        
        if (!member.voice.channel) return message.reply("<a:RedTick:760514410115498025> **User needs to connected in a voice channel to be disconnected.**");

        member.voice.kick(reason).then(mem => {
            message.channel.send(`<:check:753484699237613630> **${mem.user.tag}** has successfully disconnected by **${message.author.tag}**.`);
        })
        .catch(err => {
            message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
        });
    }
}

module.exports = VoiceKick;