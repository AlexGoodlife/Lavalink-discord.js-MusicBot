
module.exports={
    name: "seek",
    aliases: [],
    run: (message, args) => {
        const player = message.client.manager.get(message.guild.id);
        if (Number(args[0]) <0 || Number(args[0]) >= player.queue.current.duration / 1000)
            return message.channel.send("Invalid timestamp");
        
        const time = (Number(args[0]) * 1000);
        const time_formated = time / 1000;
        player.seek(time);
        return message.channel.send(`Song set at timestamp:\`${time_formated}\``);

    }

}