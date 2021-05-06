const { Listener } = require("discord-akairo")

module.exports = class extends Listener {
    constructor() {
        super('commandStart', {
            event: 'commandStarted',
            emitter: 'commandHandler'
        });
    }

    exec(message, command) {
        // This logic assumes that the name of the command is the command ID
        this.client.statCord.postCommand(command.id, message.author.id);
    }
}
