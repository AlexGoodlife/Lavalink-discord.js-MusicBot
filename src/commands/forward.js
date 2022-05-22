module.exports={
    name: "forward",
    aliases: ["fw"],
    run: (message, args) => {
        const player = message.client.manager.get(message.guild.id);
        if (!args[0])
            return message.channel.send("Invalid duration");
        let time = Number(player.position) + (Number(args[0]) * 1000);
        let time_formated = time / 1000;
        if(Number(args[0]) <= 0)
            time = Number(player.position);
        if(time >= player.queue.current.duration)
            time = player.queue.current.duration;
        player.seek(time);
        return message.channel.send(`Song set at timestamp:${time_formated}`);

    }

}