require('./lib/setup');
const { Intents: { FLAGS } } = require('discord.js');
const { LogLevel, SapphireClient } = require('@sapphire/framework');

const { config } = require('dotenv');
config();

const client = new SapphireClient({
	shards: 'auto',
	defaultPrefix: process.env.PREFIX,
	caseInsensitiveCommands: true,
	intents: Object.values(FLAGS),
	logger: { 
		level: LogLevel.Debug 
	},
	presence: {
		activities: [
			{
				name: 'dp!help | Made with ❤️',
				type: "WATCHING",
			},
		],
	}
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login(process.env.TOKEN);
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
