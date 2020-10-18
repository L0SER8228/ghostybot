const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojiUpdate",
  async execute(bot, oldEm, newEm) {
    const w = await oldEm.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "GhostyBot");

    let msg = "";

    if (oldEm.name !== newEm.name) {
      msg = `Emoji: **${oldEm.name}** was renamed to **${newEm.name}** (${newEm})`;
    } else {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle("Emoji Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed);
  },
};
