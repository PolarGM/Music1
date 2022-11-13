const { getVoiceConnection } = require("@discordjs/voice");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "nowplaying",
    aliases: ["np", "current", "cur"],
    description: "Shows information about the current track",
    run: async (client, message, args, prefix) => {
        if(!message.member.voice.channelId) return message.reply("**Please join a Voice-Channel first!**").catch(() => null);
        const oldConnection = getVoiceConnection(message.guild.id);
        if(!oldConnection) return message.reply("**I'm not connected somewhere!**").catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != message.member.voice.channelId) return message.reply("**We are not in the same Voice-Channel**!").catch(() => null);
        
        const queue = client.queues.get(message.guild.id);
        if(!queue || !queue.tracks || !queue.tracks[0]) { 
            return message.reply(`**Nothing playing right now**`).catch(() => null);
        }
        const song = queue.tracks[0];
        const curPos = oldConnection.state.subscription.player.state.resource.playbackDuration;
        
        const songEmbed = new MessageEmbed().setColor("#2f3136")
            .setTitle(`${song.title}`)
.setFooter({ text: `OddMusic is best right ${song.requester.tag}?`, iconURL: 'https://cdn.discordapp.com/attachments/960823554088247366/968551453050433606/OddMusic_Logo.png'})
            .addField(`**Upload-Channel:**`, `> ${song ? `[${song.channel.name}](${song.channel.url})` : `\`Unknown\``}`, true)
            .addField(`**Upload-At:**`, `> ${song.uploadedAt}`, true)
            .addField(`<:oddadd:968550877445099601> **Requester:**`, `> ${song.requester} \`${song.requester.tag}\``, true)
            .addField(`**Duration:**`, `> ${client.createBar(song.duration, curPos)}\n> **${client.formatDuration(curPos)} / ${song.durationFormatted}**`)
      .addField(`**Total Listener**`, `> ${song.views}`, true)
      .addField(`**Total Likes**`, `> ${song.likes}`, true)
      .addField(`**Duration**`, `> ${song.durationFormatted}`, true)
        if(song?.thumbnail?.url) songEmbed.setImage(`${song?.thumbnail?.url}`);

        return message.reply({content: `<:oddse:968557685500948520> **Nowplaying Track**`, embeds: [songEmbed]}).catch(() => null);
    },
};