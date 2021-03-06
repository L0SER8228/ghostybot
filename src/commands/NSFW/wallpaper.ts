import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class WallpaperCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "wallpaper",
      description: "good wallpapers xD",
      category: "nsfw",
      nsfwOnly: true,
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const data = await bot.neko.sfw.wallpaper();
  
      const wallpaper = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(data.url);
  
      message.channel.send(wallpaper);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
