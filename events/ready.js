
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		const channelId = '1411047672550260736';
		const channel = await client.channels.fetch(channelId);
		console.log("📌 Ready event fired, trying to send button...");
		console.log("Channel ID:", channelId);
		console.log("Channel object:", channel?.id || "not found");

	},
};
