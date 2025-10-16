const { Events, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

        // ---------- MODAL SUBMIT ----------
        if (interaction.isModalSubmit() && interaction.customId === 'pollModal') {
            const username = interaction.user.username;
            const selectedValues = interaction.fields.getStringSelectValues('channel-select-menu'); 
            const string = selectedValues[0] || 'None'; 
            const pollTitle = interaction.fields.getTextInputValue('title-text-input')

            const embed = new EmbedBuilder()
            .setTitle(`${pollTitle}`)
                .addFields(
                    { name: 'First Input', value: string }
                )
                .setDescription(`Poll Created By **${username}**`)
                .setFooter({text: `time remaining on poll: `})
                .setColor(0x00FF00);

            await interaction.reply({ embeds: [embed], Ephemeral: false });
        }

        // ---------- SLASH COMMAND ----------
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
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
	},
};