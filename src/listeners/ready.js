const { Listener } = require("discord-akairo")
const figlet = require('util').promisify(require('figlet'));
const { version } = require('../../package.json');

class Ready extends Listener {
    constructor() {
        super('ready', {
            event: 'ready',
            emitter: 'client'
        });
    }

    async exec() {

        this.client.user.setActivity(`dp!help | Made with ❤️`, { type: 'WATCHING' });

        console.log(await figlet(`${this.client.user.username}`)); 
    }
}

module.exports = Ready;
