const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "pause",
    description: "Pauses the current Track",
    run: async (client, interaction, args, prefix) => {
        if(!interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "**Please join a Voice-Channel first!**"});
        const oldConnection = getVoiceConnection(interaction.guild.id);
        if(!oldConnection) return interaction.reply({ ephemeral: true, content: "**I'm not connected somewhere!**"}).catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "**We are not in the same Voice-Channel**!"}).catch(() => null);
        
        const queue = client.queues.get(interaction.guild.id);
        if(!queue) { 
            return interaction.reply({ ephemeral: true, content: `**Nothing playing right now**`}).catch(() => null);
        }
        if(queue.paused) return interaction.reply({ ephemeral: true, content: `**Track already paused**`}).catch(() => null);
        
        queue.paused = true;
        oldConnection.state.subscription.player.pause();
        
        return interaction.reply({ ephemeral: false, content: `<:oddpa:968592888755785728> **Successfully paused the Track**`}).catch(() => null);
    },
};