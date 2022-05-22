const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const { readdirSync } = require("fs");
const { Manager, Queue } = require("erela.js");
const { channel } = require("diagnostics_channel");
// const { aliases } = require("commands/play"); 

const client = new Client();
client.commands = new Collection();
// client.aliases = new Collection();


const wait = require('util').promisify(setTimeout);

const files = readdirSync("./src/commands")
  .filter(file => file.endsWith(".js"));

for (const file of files) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
  let { aliases } = command;
  if(aliases.length !== 0){
    aliases.forEach(alias => client.commands.set(alias, command));
  }
  console.log(`Command loaded ${command.name}`);
  console.log(`Alias loaded ${aliases}`)
}

const nodes = [
    {
      host: config.host,
      password: config.password,
      port: config.port,
    }
  ]


client.manager = new Manager({
  nodes,
  autoPlay: true,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  }
})
  .on("nodeConnect", node => console.log(`Node "${node.options.identifier}" connected.`))
  .on("nodeError", (node, error) => console.log(
    `Node "${node.options.identifier}" encountered an error: ${error.message}.`
  ))
  .on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`);
  })
  .on("playerMove", (player, currentChannel, newChannel) => {
    // Note: newChannel will always be a string, if you pass the channel object you will need to get the cached channel.
      if(!newChannel)
        player.destroy();
      else{
        if(player.paused) return;
        setTimeout(() => {
          player.pause(true);
          setTimeout(() => player.pause(false), client.ws.ping * 2);
      }, client.ws.ping * 2);
      player.voiceChannel = newChannel;
      }
  })
  .on("socketClosed", async player => {
    const channel = client.channels.cache.get(player.textChannel);
    const embed_socket = new MessageEmbed()
    .setColor('#0099ff')
    .addFields(
      { name: 'If you moved me', value: 'Ignore these messages', inline:true },
      { name: 'If you didnt move me', value: 'My socked died server side, play a new song and contact @Nutdealer', inline:false }
    )
    console.log('socketclosed')
    const msg = await channel.send(embed_socket);
    await wait(10000);
    await msg.delete();

  })
  .on("trackError", async player => {
    const channel = client.channels.cache.get(player.textChannel);
    // const embedTRACK_ERROR = new MessageEmbed()
    // .setDescription(`An error occured during the playback of the song. Try another one`)
    // .setFooter('Err: TRACK_ERROR')
    await channel.send(`\`Track Error please use commmand search to pick another song\``);
    player.stop();
})
  .on("trackStuck", async player => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send(`\`Track got stuck\``)
    player.stop();
})
  .on("nodeDisconnect", () => console.log("⚠  Lavalink parou de ser executado ou nunca o esteve.\n"))
  .on("nodeReconnect", () => console.log("O evento 'nodeReconnect' foi ativado"))
  .on("queueEnd", async player => {
    const channel = client.channels.cache.get(player.textChannel);
    setTimeout(async function() {
      if(!player.playing)
        player.destroy(player.guild.id);
    // await wait(30000);
    // if(player.playing)
    //     return;
    // else{
    //     // channel.send("Queue has ended.");
    //     player.destroy(player.guild.id);
    }, 300000);
  });

client.once("ready", () => {
  client.manager.init(client.user.id);
  client.user.setStatus('available');
client.user.setPresence({
  activity: {
    name: "!help | Zaga Zaga"
  }
})
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("raw", d => client.manager.updateVoiceState(d));

client.on("message", async message => {
  if (!message.content.startsWith(config.prefix) || !message.guild || message.author.bot) return;
  const [name, ...args] = message.content.slice(1).split(/\s+/g);

  const command = client.commands.get(name.toLowerCase());
  // const alias = client.aliases.get(name);
  if (!command) return;

  try {
    command.run(message, args);
  } catch (err) {
    message.reply(`an error occurred while running the command: ${err.message}`);
  }
});

client.login(config.token);
