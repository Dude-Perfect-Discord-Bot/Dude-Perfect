const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class EightBall extends Command {
  constructor() {
    super('8ball', {
      aliases: ['8ball'],
      channel: 'guild',
      category: 'Fun',
      description: {
        content: 'Provides you a random answer based on your questions.',
        usage: '<question>',
        examples: ['Why do you exist on Discord?'],
      },
      args: [
        {
          id: 'question',
          type: 'string',
          prompt: {
            start:
              '<a:RedTick:760514410115498025> **You need to ask a question so that I can answer to it!**',
          },
        },
      ],
    });
  }

  exec(message) {
    const ball = [
      'As I See It Yes',
      'Ask Again Later',
      'Better Not Tell You Now',
      'Cannot Predict Now',
      'Concentrate and Ask Again',
      "Don't Count On It",
      'It Is Certain',
      'It Is Decidely So',
      'Most Likely',
      'My Reply Is No',
      'My Sources Say No',
      'Outlook Good',
      'Outlook Not So Good',
      'Reply Hazy Try Again',
      'Signs Point to Yes',
      'Very Doubtful',
      'Without A Doubt',
      'Yes',
      'Yes - Definitely',
      'You May Rely On It',
      'It is certain',
      'Without a doubt',
      'You may rely on it',
      'Yes definitely',
      'It is decidedly so',
      'As I see it, yes',
      'Most likely',
      'Yes',
      'Outlook good',
      'Signs point to yes',
      'Reply hazy try again',
      'Better not tell you now',
      'Ask again later',
      'Cannot predict now',
      'Concentrate and ask again',
      'Don’t count on it',
      'Outlook not so good',
      'My sources say no',
      'Very doubtful',
      'My reply is no',
      'No',
      'Certainly',
      'Of course',
      'No doubt about that',
      'Yep i guess',
      'Problably No',
      'Not sure',
      'If you wish so',
      'Why not?',
      'Are u sure? Coz m not!',
      'Yes, if u wish',
    ];

    const answer = ball[Math.floor(Math.random() * ball.length)];

    const embed = new MessageEmbed()
      .setTitle(`Asked by ${message.author.tag}`)
      .setColor('#00ff9e')
      .setDescription(`What I think is: **${answer}**`)
      .setTimestamp()
      .setFooter(
        `${this.client.user.username} is made with ❤️`,
        `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
      );

    message.util.send(embed);
  }
}

module.exports = EightBall;
