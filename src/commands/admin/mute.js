module.exports = {
  name: "mute",
  description: "Mute a user",
  category: "admin",
  usage: "mute <@user>",
  botPermissions: ["MANAGE_ROLES"],
  memberPermissions: ["MANAGE_ROLES"],
  async execute(bot, message, args) {
    const muteUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );

    if (!muteUser) {
      return message.channel.send("Please provide valid a member");
    }

    if (muteUser?.roles.cache.find((r) => r.name === "muted")) {
      return message.channel.send("User is already muted!");
    }

    if (muteUser.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("User can't be muted");
    }

    if (
      message.guild.me.roles.highest.comparePositionTo(muteUser.roles.highest) <
      0
    )
      return message.channel.send(
        `My role must be higher than **${muteUser.tag}** highest role!`
      );

    let muteReason = args.join(" ").slice(23);

    const muteRole =
      message.guild.roles.cache.find((r) => r.name === "muted") ||
      (await message.guild.roles.create({
        data: {
          name: "muted",
          color: "GRAY",
        },
        reason: "Mute a user",
      }));

    message.guild.channels.cache.forEach((channel) => {
      channel
        .updateOverwrite(muteUser.id, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false,
        })
        .catch((e) => {
          bot.logger.error("mute_user", e);
        });
    });

    if (!muteUser) return message.channel.send("User wasn't found");
    if (!muteReason) muteReason = "Not Specified";

    // Add role & send msg
    muteUser.roles.add(muteRole);
    muteUser.user.send(
      `You've been **muted** from **${message.guild.name}**, Reason: **${muteReason}**`
    );
    message.channel.send(
      `${muteUser} was successfully muted from the server. Reason: **${muteReason}**. I have also send a DM letting the person know.`
    );
  },
};
