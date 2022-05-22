module.exports = {
    name: "stop",
    aliases: ["dc", "stfu"],
    run: (message) => { 
      const player = message.client.manager.get(message.guild.id);
      if (!player) return message.reply("There is no player for this guild.");
  
      const { channel } = message.member.voice;
      
      if (!channel) return message.reply("You need to join a voice channel.");
      if (channel.id !== player.voiceChannel) return message.reply("You're not in the same voice channel.");
      
      player.destroy(player.guild.id);
      // return message.channel.send("Stopped, left.");
    }
  }