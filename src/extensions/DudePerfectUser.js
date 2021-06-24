const { Structures } = require('discord.js');

const FLAGS = {
  DISCORD_EMPLOYEE: '<:staff:753975912969797682>',
  PARTNERED_SERVER_OWNER: '<:partner:753976272765583461>',
  BUGHUNTER_LEVEL_1: '<:bughunter:753976807799259178>',
  BUGHUNTER_LEVEL_2: '<:bughuntergold:753976795950350426>',
  HYPESQUAD_EVENTS: '<:hypesquadevents:753976575321702472>',
  HOUSE_BRAVERY: '<:bravery:753976846877458442>',
  HOUSE_BRILLIANCE: '<:brilliance:753976825150963842>',
  HOUSE_BALANCE: '<:balance:753977070865875056>',
  EARLY_SUPPORTER: '<:earlysupporter:753976621836533760>',
  TEAM_USER: 'Team User',
  SYSTEM: '<:verifieddcsystem:753976870042730648>',
  VERIFIED_BOT: '<:VerifiedBot:753976885251407872>',
  EARLY_VERIFIED_DEVELOPER: '<:botdev:753976973168214176>',
};
const NITRO = '<:nitro:753976428009357373>';
const EXTENSIONS = ['.gif', '.webm'];
const DEPRECATED = ['DISCORD_PARTNER', 'VERIFIED_DEVELOPER'];

class DudePerfectUser extends Structures.get('User') {
  displayFlags() {
    const badges = this.flags
      ? this.flags
          .toArray()
          .filter((flag) => !DEPRECATED.includes(flag))
          .map((flag) => FLAGS[flag])
      : [];

    if (
      this.avatarURL() &&
      EXTENSIONS.some((type) =>
        this.avatarURL({ dynamic: true }).endsWith(type)
      )
    ) {
      badges.push(NITRO);
    }
    return badges.length ? badges.join(' ') : 'None';
  }
}

Structures.extend('User', () => DudePerfectUser);
