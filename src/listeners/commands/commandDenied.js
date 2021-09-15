const { Listener } = require('@sapphire/framework');

class UserEvent extends Listener {
    async run({ context, message: content }, { message }) {

        if (Reflect.get(Object(context), 'silent')) return;

        return message.channel.send({ content, allowedMentions: { users: [message.author.id], roles: [] } });
    }
}

exports.UserEvent = UserEvent;