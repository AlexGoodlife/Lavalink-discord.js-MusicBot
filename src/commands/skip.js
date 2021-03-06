module.exports = {
    name: "skip",
    aliases: ['s'],
    run: (message) => { 
      const player = message.client.manager.get(message.guild.id);
      if (!player) return message.reply("there is no player for this guild.");
  
      const { channel } = message.member.voice;
      if (!channel) return message.reply("you need to join a voice channel.");
      if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");

      if (!player.queue.current) return message.channel.send("there is no music playing.")

      const { title } = player.queue.current;

      player.stop();
      return message.channel.send(`\`${title}\` was skipped.`)
    }
  }