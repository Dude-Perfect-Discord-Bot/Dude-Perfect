const { Listener } = require("discord-akairo")

class Ready extends Listener {
    constructor() {
        super('ready', {
            event: 'ready',
            emitter: 'client'
        });
    }

    exec() {

        const activities = [
            `${this.client.guilds.cache.size} guilds!`,
            `Anish, Hound, Kartik, Piyush & Xynox!`,
            `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`
        ];

        let i = 0;
        setInterval(() => this.client.user.setActivity(`dp!help | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);

        console.log(`${this.client.user.tag} is online!`);

    }
}

module.exports = Ready;
