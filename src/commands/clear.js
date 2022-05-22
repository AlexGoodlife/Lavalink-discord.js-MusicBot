module.exports = {
    name: "clear",
    aliases: ["c"],
    run: async (message) => {
        const player = message.client.manager.get(message.guild.id);

      player.queue.clear();
      return message.channel.send("Cleared the queue!");
    }
  }