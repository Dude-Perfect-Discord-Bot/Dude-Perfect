const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const got = require('got');

class Meme extends Command {
  constructor() {
    super('meme', {
      aliases: ['meme'],
      channel: 'guild',
      category: 'Fun',
      description: {
        content: 'Gives a random meme to laugh.',
      },
    });
  }

  exec(message) {
    const embed = new MessageEmbed();
    got('https://www.reddit.com/r/memes/random/.json')
      .then((response) => {
        const content = JSON.parse(response.body);
        const { url, title } = content[0].data.children[0].data;
        embed.setTitle(`**${title}**`);
        embed.setImage(url);
        embed.setColor('#00ff9e');
        embed.setFooter(
          `${this.client.user.username} is made with ❤️`,
          `https://cdn.discordapp.com/emojis/805614116937007165.png?v=1`
        );
        message.util.send(embed);
      })
      .catch(console.error);
  }
}

module.exports = Meme;
