module.exports.normalizePermFlag = (perms) => {
  return perms.map((perm) =>
    perm
      .toLowerCase()
      .replace(/(^|"|_)(\S)/g, (str) => str.toUpperCase())
      .replace(/_/g, ' ')
      .replace(/Use Vad/g, 'Use Voice Acitvity')
  );
};
