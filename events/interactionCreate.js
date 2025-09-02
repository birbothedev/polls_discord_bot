const { Events, MessageFlags } = require('discord.js');
const { buildMyModal } = require('../helpers/showmodal');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        // ---------- BUTTON CLICK ----------
        if (interaction.isButton() && interaction.customId === 'openmodal') {
            const modal = buildMyModal(interaction.user.id);
            await interaction.showModal(modal);
        }

        // ---------- MODAL SUBMIT ----------
        if (interaction.isModalSubmit() && interaction.customId.startsWith('MyModal-')) {
            const first = interaction.fields.getTextInputValue('firstInput');
            const second = interaction.fields.getTextInputValue('secondInput');

            await interaction.reply({
                content: `✅ Modal Submitted.\nFirst: ${first}\nSecond: ${second}`,
                ephemeral: true,
            });
            return;
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