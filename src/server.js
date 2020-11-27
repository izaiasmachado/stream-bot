const ytdl = require("ytdl-core")
const Discord = require('discord.js')
const { DISCORD_OWNER, DISCORD_TOKEN, DISCORD_GUILD_ID, DISCORD_CHANNEL_ID, DISCORD_DESCRIPTION, STREAM_URL } = process.env

const owner = DISCORD_OWNER
const bot = new Discord.Client({ owner })

bot.on('ready', async () => {
    bot.user.setActivity(DISCORD_DESCRIPTION, { type: 'LISTENING' });
    const guild = bot.guilds.cache.find(guild => guild.id === DISCORD_GUILD_ID)
    const channel = guild.channels.cache.find(ch => ch.id === DISCORD_CHANNEL_ID)
    const stream = ytdl(STREAM_URL, { quality: "lowestaudio" })

    channel.join().then(connection => {
        connection.play(stream, { seek: 0, volume: 1 })
    })

})

bot.login(DISCORD_TOKEN)