const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "unmute",
        description: "Unmutes a member of the server.",
        usage: "!unmute <member>",
        accessableby: "Helpers",
        aliases: ["unm"]
    },
    run: async (bot, message, args) => {
        let perembed = new RichEmbed()
        .setTitle("Astronaut Bot")
        .setDescription(`You do not have access to \`unmute\`, ${message.author}.`)
        .setColor(0x3c368f)
        .setFooter(message.id)
        .setTimestamp();

        let memembed = new RichEmbed()
        .setTitle("Astronaut Bot")
        .setDescription(`Please provide a valid user to unmute, ${message.author}.`)
        .setColor(0x3c368f)
        .setFooter(message.id)
        .setTimestamp();

        if(!message.member.hasPermissions(["MANAGE_MESSAGES"])) return message.channel.send(perembed)

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!mutee) return message.channel.send(memembed)

        if(!message.guild.me.hasPermissions(["MANAGE_ROLES"])) return console.log("I don't have enough permissions to run some commands!")

        let muterole = message.guild.roles.find(r => r.name === "muted")

        let unmuteembed = new RichEmbed()
        .setTitle("Astronaut Bot")
        .setDescription(`You have been unmuted on the Lunar Discord manually by ${message.author}.`)
        .setColor(0x3c368f)
        .setFooter(message.id)
        .setTimestamp();

        let muteembed = new RichEmbed()
        .setTitle("Astronaut Bot")
        .setDescription(`The user ${mutee} has been successfully unmuted, ${message.author}.`)
        .setColor(0x3c368f)
        .setFooter(message.id)
        .setTimestamp();

        let alrembed = new RichEmbed()
        .setTitle("Lucifer Bot")
        .setDescription(`The user ${mutee} is not muted, ${message.author}.`)
        .setColor(0x3c368f)
        .setFooter(message.id)
        .setTimestamp();
        
        let logembed = new RichEmbed()
        .setTitle("Astronaut Bot")
        .setDescription(`User **${mutee}** with ID **${mutee.id}** has been unmuted by ${message.author} on ${message.channel}.`)
        .setColor(0x3c368f)
        .setFooter(message.id)
        .setTimestamp();

        if(!mutee.roles.has(muterole.id)) return message.channel.send(alrembed);
        await(mutee.removeRole(muterole.id))
        message.channel.send(muteembed)
        mutee.send(unmuteembed)
        message.guild.channels.get("577253140601241600").send(logembed)
    }
}
