const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');


class EightBall extends Command {
    constructor() {
        super('8ball', {
            aliases: ['8ball'],
            channel: 'guild',
            category: 'Fun',
            description: {
                content: 'Provides you a random question based on your questions.',
                usage: '<question>',
                examples: ['Why do you exist on Discord?']
            },
            args: [
                {
                    id: 'question',
                    type: 'string',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to ask a question so that I can answer to it!**"
                    },
                }
            ]
        });
    }

    exec (message){

        var ball = ["Yes", "No", "Certainly", "Of course", "No doubt about that", "Yep i guess", "Problably No", "Not sure", "Certainly", "If you wish so", "Why not?", "Are u sure? Coz m not!", "Yes, if u wish"];

        let answer = ball[Math.floor(Math.random() * ball.length)]

        let em = new MessageEmbed()
            .setTitle(`Asked by ${ message.author.tag }`)
            .setColor("#00ff9e")
            .setDescription(`What I think is: **${answer}**`)
            .setTimestamp()
            .setFooter(
                `${this.client.user.username} is made with ❤️`,
                `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
            );

        message.channel.send(em);
    }

}

module.exports = EightBall;