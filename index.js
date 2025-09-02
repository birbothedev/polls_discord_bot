const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags, REST, Routes } = require('discord.js');
const { token, CLIENT_ID, GUILD_ID } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// -----------------------------
// Load commands from folder
// -----------------------------
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const commands = []; // for registration with Discord

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			commands.push(command.data.toJSON()); // Add for registration
			console.log(`Loaded command: ${command.data.name}`);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// -----------------------------
// Register commands with Discord
// -----------------------------
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), // Use Routes.applicationCommands(CLIENT_ID) for global
			{ body: commands }
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

// -----------------------------
// Load commands from folder
// -----------------------------
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

// -----------------------------
// Event handlers
// -----------------------------
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	const channel = client.channels.cache.get("1411047672550260736");
	if (!channel) {
		console.error(`No such channel ${channel} was found`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.login(token);
