const { Client, CommandInteraction } = require('discord.js');

module.exports ={
    name: 'kick',
    description: 'kick a member',
    usserpermissions: ['KICK_MEMBERS'],
    options: [
        {
            name: 'target',
            description: 'target to kick',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'reason for this kick',
            type: 'STRING',
            required: false
        }
    ],
    run: async (client, interaction, args, prefix) => {
        const target = interaction.options.getMember('target');
        const reason =
            interaction.options.getString('reason') || "No reason provided";
        
        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: 'That user is a mod/admin, I cant do that.'});
        await target.send(`You have been kicked from ${interaction.guild.name}, reason: ${reason}`);

        target.kick(reason);

        interaction.reply({ content: `Kicked ${target.user.tag} successfully! reason: ${reason}`});
    },
};