const { MessageEmbed } = require("discord.js");
const queue = require("./queue");

module.exports = {
  name: "jumpto",
  aliases: ['jump', 'goto', 'skipto'],
  run: (message, args) => {

    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");
    const embed_empty = new MessageEmbed()
        .setColor('#0099ff')
        .setDescription("You need to provide a song to skip to")
    if(!args[0]){
        return message.channel.send(embed_empty);
    }

    const embed_not_num = new MessageEmbed()
        .setColor('#0099ff')
        .setDescription('Parameter must be a number')  
    if (isNaN(args[0])){
      return message.channel.send(embed_not_num)
    }

    const embed_large = new MessageEmbed()
        .setColor('#0099ff')
        .setDescription('Parameter provided is too large for this queue')
    if (Number(args[0]) > player.queue.size){
      return message.channel.send(embed_large);

    }

    player.queue.remove(0, Number(args[0]) - 1);
    player.stop();

    const jumped = Number(args[0]) - 1;

    const embed_sucess = new MessageEmbed()
        .setDescription(`Skipped to song position ${args[0]}`)
        .setColor('#0099ff')
    return message.channel.send(embed_sucess);
  }
}