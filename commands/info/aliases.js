const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "aliases",
    aliases: ["a"],
    description: "Show all of the Commands aliases",
    run: async (client, message, args, prefix) => {
        return message.reply(`Here is a list of all of my Commands aliases:

**Music commands**
**-play** - p
**-playskip** - ps
**-playtop** - pt
**-nowplaying** - np, current, cur
**-pause** - break
**-resume** - res, con, continue
**-volume** - vol
**-skip** - s, fs, forceskip
**-skipto** - jump, jumpto
**-forward** - fwd, fd
**-leave** - disconnect, dis, stopleave
**-queue** - list
**-remove** - delete
**-queueloop** - loopqueue, qloop, queuloop
**-rackloop** - looptrack, songloop, loopsong
**-bassboost** -"bass, bb
**Info commands**
**-help** - h`).catch(() => null);
    },
};