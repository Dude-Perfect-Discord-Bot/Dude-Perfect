const { Listener } = require('discord-akairo');

module.exports = class extends Listener {
  constructor() {
    super('missingPermissions', {
      emitter: 'commandHandler',
      event: 'missingPermissions',
    });
  }

  exec(message, command, type, missing) {
    const text = {
      client: () => {
        const str = this.missingPermissions(
          message.channel,
          message.guild.me,
          missing
        );
        return `<a:RedTick:760514410115498025> **I'm missing ${str} to use that command.**`;
      },
      user: () => {
        const str = this.missingPermissions(
          message.channel,
          message.member,
          missing
        );
        return `<a:RedTick:760514410115498025> **You are missing ${str} to use that command.**`;
      },
    }[type];

    if (!text) return;
    if (
      message.guild
        ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES')
        : true
    ) {
      message.reply(text());
    }
  }

  missingPermissions(channel, member, permissions) {
    const missingPerms = channel
      .permissionsFor(member)
      .missing(permissions)
      .map(
        (str) =>
          `\`${str
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (strr) => strr.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/Use Vad/g, 'Use Voice Acitvity')}\``
      );
    return missingPerms.length > 1
      ? `${missingPerms.slice(0, -1).join(', ')} and ${
          missingPerms.slice(-1)[0]
        }`
      : missingPerms[0];
  }
};
