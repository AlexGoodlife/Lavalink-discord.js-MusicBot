
module.exports = {
    name: "ping",
    aliases: [],
    run: (message) => {
      message.reply(`Pong! Latency is ${Date.now() - message.createdTimestamp}ms`);
    }
  }