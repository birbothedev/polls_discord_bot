
const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

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

		const button = new ButtonBuilder()
			.setCustomId('openmodal0')
			.setLabel('Create Poll')
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder().addComponents(button);

		await channel.send({
			content: 'Click the Button below to Create a Poll!',
			components: [row],
		})
	},
};
