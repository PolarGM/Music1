const { Client, CommandInteraction } = require('discord.js');

module.exports ={
    name: 'ban',
    description: 'ban a member',
    usserpermissions: ['BAN_MEMBERS'],
    options: [
        {
            name: 'target',
            description: 'target to ban',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'reason for this ban',
            type: 'STRING',
            required: false
        }
    ],
    run: async (client, interaction, args, prefix) => {
        const target = interaction.options.getMember('target');
        const reason =
            interaction.options.getString('reason') || "No reason provided";
        
        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: 'That user is a mod/admin, I cant do that.'});
        await target.send(`You have been banned from ${interaction.guild.name}, reason: ${reason}`);

        target.ban(reason);

        interaction.reply({ content: `Banned ${target.user.tag} successfully! reason: ${reason}`});
    },
};