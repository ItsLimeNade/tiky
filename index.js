const { Client, Intents, MessageEmbed, MessageButton, MessageActionRow, MessageAttachment, DiscordAPIError, MessageReaction, } = require('discord.js')
const { QuickDB } = require("quick.db")
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


})




client.login(process.env.TOKEN)