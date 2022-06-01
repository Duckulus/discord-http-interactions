import {
  APIApplicationCommandInteraction,
  APIInteraction,
  APIInteractionResponse,
  APIModalSubmitInteraction,
  InteractionResponseType,
  InteractionType,
} from 'discord-api-types/v10';
import { handleCommand } from './command/commandHandler';
import { handleModalInteraction } from './component/ModalComponent';

export const handleInteraction = async (interaction: APIInteraction) => {
  switch (interaction.type) {
    case InteractionType.Ping:
      console.log('Received Ping');
      return {
        type: InteractionResponseType.Pong,
      } as APIInteractionResponse;
    case InteractionType.ApplicationCommand:
      console.log(`Received Application Command: ${interaction.data.name}`);

      return await handleCommand(
        interaction as APIApplicationCommandInteraction
      );

    case InteractionType.ModalSubmit:
      console.log('Received Modal Submit');
      return await handleModalInteraction(
        interaction as APIModalSubmitInteraction
      );
  }
};
