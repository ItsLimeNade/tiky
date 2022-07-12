const { Client, Intents, MessageEmbed, MessageButton, MessageActionRow, MessageAttachment, DiscordAPIError, MessageReaction, } = require('discord.js')
const { QuickDB } = require("quick.db")
const { welcomeImage, drawCard } = require('discord-welcome-card');
require('dotenv').config();

const database = new QuickDB()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

client.on('ready', async () => {

    client.user.setPresence({
        status: "online",
        activities: [{
            name: (String(client.guilds.resolve("797250791114276864").memberCount) + ' members in King\'s server'),
            type: "WATCHING"
        }]
    });

});

client.on('messageCreate', async message => {

    if (message.channel.id == '994692644427026462') { //ides channel

        const thread = await message.startThread({
            name: 'Let\'s talk about the idea!',
            autoArchiveDuration: 10080,
            reason: 'Idea created.',
        });

        message.react('✅')
        message.react('❌')
    } else if (message.channel.id == '819311402912841811') {

        if (message.attachments != null && message.attachments.size > 0) {
            message.react('❤')
        }

    }
    if (message.content == 'test') {
        const image = await drawCard({
            text: {
                theme: 'dark',
                title: `Welcome ${message.author.tag}`,
                text: `${client.guilds.resolve("797250791114276864").memberCount + 1}` + 'th member!',
                color: `#ffffff`,
            },
            avatar: {
                image: message.author.displayAvatarURL({ format: 'png' }),
                outlineWidth: 5,
                outlineColor: "#ffffff",
            },
            background: "https://cdn.discordapp.com/attachments/939946585708707962/996439413670281216/unknown.png?size=4096",
            blur: 1,
            border: true,
            rounded: true,
        });
        client.channels.cache.get(`993887969440182282`).send({ files: [image] })
    }


})

client.on('guildMemberAdd', async member => {

    const image = await drawCard({
        text: {
            title: `Welcome ${member.user.tag}`,
            text: `${client.guilds.resolve("797250791114276864").memberCount}` + ' member in King\'s server',
            color: `#ffffff`,
        },
        avatar: {
            image: member.user.displayAvatarURL({ format: 'png' }),
            outlineWidth: 5,
            outlineColor: "#ffffff",
        },
        background: "https://cdn.discordapp.com/attachments/939946585708707962/996439413670281216/unknown.png?size=4096",
        blur: 1,
        border: true,
        rounded: true,
    });

    client.channels.cache.get(`826281153978957824`).send({ files: [image] })



})




client.login(process.env.TOKEN)