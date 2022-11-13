module.exports = (client) => {
    console.log(`${client.getTime()} Welcome, my name is ${client.user.tag}!`);
    client.user.setActivity(`${client.config.prefix}help | /help`, {type: "PLAYING"})
    setInterval(() => {
        client.user.setActivity(`${client.config.prefix}help | /help`, {type: "PLAYING"})
    }, 600_00)
}