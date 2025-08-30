const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('showmodal')
    .setDescription('Shows a modal'),
    async execute(interaction){
        const modal = new ModalBuilder({
            customId: `MyModal-${interaction.user.id}`,
            title: 'My Modal'
        });

        const firstInput = new TextInputBuilder({
            customID: 'firstInput',
            label: "First Input Box",
            style: TextInputStyle.Short
        });

        const secondInput = new TextInputBuilder({
            customId: 'secondInput',
            label: "Second Input Box",
            style: TextInputStyle.Paragraph
        });

        const firstActionRow = new ActionRowBuilder().addComponents(firstInput);
        const secondActionRow = new ActionRowBuilder().addComponents(secondInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    },
};