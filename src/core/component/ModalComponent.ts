import {
  APIInteractionResponse,
  APIModalSubmitInteraction,
  InteractionResponseType,
  MessageFlags,
} from 'discord-api-types/v10';

const modalInteractions = {};

export const registerModalInteraction = (id: string, action) => {
  modalInteractions[id] = action;
};

export const handleModalInteraction = async (
  interaction: APIModalSubmitInteraction
) => {
  const action = modalInteractions[interaction.data.custom_id];
  if (action) {
    return action(interaction);
  } else {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: 'Modal not found',
        flags: MessageFlags.Ephemeral,
      },
    } as APIInteractionResponse;
  }
};
