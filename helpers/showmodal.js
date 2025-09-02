const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');


function buildMyModal(userId){
    const modal = new ModalBuilder({
        customId: `MyModal-${userId}`,
        title: 'My Modal'
    });

    const firstInput = new TextInputBuilder({
        customId: 'firstInput',
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

    return modal;
}

module.exports = {buildMyModal};