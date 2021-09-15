const { Listener } = require('@sapphire/framework');

class UserEvent extends Listener {
	run(old, message) {
		if (old.content === message.content) return;

		if (message.webhookId !== null) return;

		if (message.system) return;

		if (message.author.bot) return;

		this.container.client.emit('preMessageParsed', message);
	}
}

exports.UserEvent = UserEvent;