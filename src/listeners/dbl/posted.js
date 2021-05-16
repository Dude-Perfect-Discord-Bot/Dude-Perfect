const { Listener } = require("discord-akairo")

module.exports = class extends Listener {
    constructor() {
        super('dblPosted', {
            event: 'posted',
            emitter: 'dbl'
        });
    }

    exec() {
        console.log("Posted to top.gg");
    }
}