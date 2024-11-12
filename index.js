const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();  // To load token from a .env file for security

const token = process.env.DISCORD_TOKEN; // Use environment variable for better security

// Initialize client with intents
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

// Handle the messageCreate event
client.on("messageCreate", (message) => {
    // Prevent bot from responding to its own messages
    if (message.author.bot) return;

    // If the message starts with 'create', extract the URL and generate a short ID
    if (message.content.startsWith('create')) {
        const url = message.content.split('create')[1].trim();  // Trim to clean up spaces
        if (url) {
            return message.reply({
                content: `Generating Short ID for: ${url}`,
            });
        } else {
            return message.reply({
                content: "Please provide a valid URL after 'create'.",
            });
        }
    }

    // Default message reply for other content
    message.reply({
        content: "Hi From Bot!",
    });
});

// Login to Discord with the bot's token
client.login(token);

// Handle interactionCreate event (for Slash Commands or Button Clicks)
client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;  // Ignore if it's not a command

    if (interaction.commandName === 'ping') {
        interaction.reply("Pong!!");
    }
});

