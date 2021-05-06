const { Listener } = require("discord-akairo")

module.exports = class extends Listener {
    constructor() {
        super('autoPostStart', {
            event: 'autopost-start',
            emitter: 'statCord'
        });
    }

    exec() {
        console.log("[StatCord] Auto post started");
    }
}
