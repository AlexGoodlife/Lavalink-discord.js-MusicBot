const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    aliases: [],
    run: (message, args) => {
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('List of all commands')
        .setURL('https://www.youtube.com/watch?v=hUGDd6FIQuI&ab_channel=Kopera')
        .setAuthor('Made by Nutdealer#6187', 'https://i.redd.it/1i77ej79l5471.jpg', 'https://github.com/AlexGoodlife')
        // .setDescription('Some description here')
        .setThumbnail('https://i.ytimg.com/vi/mIIjcetMul0/hqdefault.jpg')
        .addFields(
            { name: 'play or p', value: 'Plays requested song', inline:true },
            { name: 'search', value: 'Searchs results of a song', inline:true },
            // { name: '\u200B', value: '\u200B' },
            { name: 'skip or s', value: 'Skips current song', inline : true },
            { name: 'queue or q', value: 'Displays the queue', inline: true },
            { name: 'pause', value: 'Pauses current song', inline:true },
            { name: 'resume', value: 'Resumes current song', inline:true },
            // { name: '\u200B', value: '\u200B' },
            { name: 'stop', value: 'Disconnects player', inline : true },
            { name: 'repeat', value: 'Repeats the current song', inline: true },
            { name: 'seek', value: 'Sets the song at timestamp', inline : true },
            { name: 'forward', value: 'Forwards the song set amount', inline: true },
            { name: 'clear', value: 'Clears the queue', inline: true },
            { name: 'jump or skipto', value: 'Skips to a song in the queue', inline: true }
        )
        // .addField('Inline field title', 'Some value here', true)
        // .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        .setFooter('Zaga Zaga', 'https://i.redd.it/1i77ej79l5471.jpg');
    
    return message.channel.send(embed);
    }
  }