/**
 * @copyright Anish Shobith P S
 * @description Converts miliseconds to readable time.
 * @param {number} ms Time in milliseconds.
 * @returns {string}
 */
module.exports.formatDuration = (ms) => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return new Intl.ListFormat('en-GB', {
    style: 'long',
    type: 'conjunction',
  }).format(
    Object.entries(time)
      .filter((val) => val[1] !== 0)
      .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
  );
};
