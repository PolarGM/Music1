const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unban a user",
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: "userid",
            description: "userid that you want to unban",
            type: "STRING",
            required: true,
        },
    ],
run: async (client, interaction) => {
    const userId = interaction.options.getString("userid");

    interaction.guild.members.unban(userId).then((user) =>{
        interaction.reply({ content: '${user.tag is unbanned from this server!',
            });
       }).catch(() => {
        interaction.reply({ content: "PLease specify a vaild banned member's id",})
       });
    },
};