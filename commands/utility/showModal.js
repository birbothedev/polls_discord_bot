const { ModalBuilder, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, LabelBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a unique and detailed poll'),
    async execute (interaction) {
        const modal = new ModalBuilder()
            .setCustomId('pollModal')
            .setTitle('Poll Creator')

        const pollTitle = new LabelBuilder()
            .setLabel('Poll Title')
            .setTextInputComponent(
                new TextInputBuilder()
                    .setCustomId('title-text-input')
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Enter the title of your poll')
                    .setRequired(true)
            );
                

        const selectMenu = new LabelBuilder()
            .setLabel('Channel Select Menu')
            .setStringSelectMenuComponent(
                new StringSelectMenuBuilder()
                    .setCustomId('channel-select-menu')
                    .setPlaceholder('Choose where to send poll')
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Red')
                            .setValue('red')
                            .setDescription('This is the red color')
                            .setEmoji('❤️'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Blue')
                            .setValue('blue')
                            .setDescription('This is the blue color')
                            .setEmoji('💙')
                )
            )

        modal.addLabelComponents(pollTitle, selectMenu);
        await interaction.showModal(modal);
    }
}