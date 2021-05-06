const { Listener } = require("discord-akairo")

module.exports = class extends Listener {
    constructor() {
        super('statcordPost', {
            event: 'post',
            emitter: 'statCord'
        });
    }

    exec(status) {
        if (status !== false) {
            console.log(`An error occured while posting to statcord: ${status}`)
        }
    }
}
