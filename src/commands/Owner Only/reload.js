const { Command, Argument } = require('discord-akairo')

module.exports = class Reload extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            ownerOnly: true,
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS'],
            description: {
                content: 'Reload a command/listener/inhibitor',
                usage: '< Command | Listener | Inhibitor >'
            },
            category: "Bot Owner Only",
            args: [
                {
                    id: 'things',
                    type: Argument.union('command', 'listener', 'inhibitor'),
                    prompt: {
                        start: 'What do i reload',
                        time: 4.5e4
                    }
                }
            ]
        })
    }
    async exec(message, { things }) {

        if (message.author.id !== "594853883742912512") return message.reply("<a:RedTick:760514410115498025> **Oie, only `Dad` can run this command.**");	

        try{
            await things.reload()
            message.react("<:check:753484699237613630>")
        }
        catch(err){
            const embed = new MessageEmbed()
                .addField(`<a:RedTick:760514410115498025> Error Reloading ${stuff.id}`, `\`\`\`js\n${err}\`\`\``)
            await message.channel.send(embed)
        }
    }
}
