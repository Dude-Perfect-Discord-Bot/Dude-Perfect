const { Command } = require("discord-akairo");

class Nickname extends Command {
    constructor() {
        super('nickname', {
            aliases: ['nickname', 'nick'],
            category: 'Guild Management',
            description: {
                content: 'Sets the provide nickname of the user provided by the executor.',
                usage: '<user> <nickname>',
                examples: ['Xynox#0117 <nickname>']
            },
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention a user!**"
                    }
                },
                {
                    id: "nick",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention a nickname!**"
                    }


                },
            ],
            typing: true
        });
    }
    async exec(message, { member, nick }) {

        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("<a:RedTick:760514410115498025> **You need `MANAGE_NICKNAMES` permission to use this command!**");

        try {

            await member.setNickname(nick)
        return message.channel.send(`<:check:753484699237613630> Nickname of the **${member.user.tag}** has been set as **${nick}**`);

        } catch (err) 
                {  
                    message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
                }
    }
}
module.exports = Nickname;