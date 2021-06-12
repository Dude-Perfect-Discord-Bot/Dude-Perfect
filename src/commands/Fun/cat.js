const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const subreddits = ['cat', 'cats', 'catpics', 'kittens'];

class Cat extends Command {
  constructor() {
    super('cat', {
      aliases: ['cat', 'cats', 'cato'],
      channel: 'guild',
      category: 'Fun',
      description: {
        content: 'Gives a random pic of a cat from reddit.',
      },
    });
  }

  async exec(message) {
    const data = await fetch(
      `https://imgur.com/r/${
        subreddits[Math.floor(Math.random() * subreddits.length)]
      }/hot.json`
    )
      .then((response) => response.json())
      .then((body) => body.data);
    const selected = data[Math.floor(Math.random() * data.length)];
    return message.util.send(
      new MessageEmbed()
        .setTitle(`Meow 🐱`)
        .setColor('#00ff9e')
        .setImage(
          `https://imgur.com/${selected.hash}${selected.ext.replace(
            /\?.*/,
            ''
          )}`
        )
        .setFooter(
          `${this.client.user.username} is made with ❤️`,
          `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
        )
    );
  }
}

module.exports = Cat;
