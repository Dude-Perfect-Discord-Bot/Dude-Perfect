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
                content: 'Gives a random meme to laugh.'
            },
            typing: true
        });
    }

    exec (message){

        let embed = new MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`**${memeTitle}**`);
            embed.setImage(memeImage);
            embed.setColor("#00ff9e");
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
            message.channel.send(embed)


        }).catch(console.error);    }

}

module.exports = Meme;