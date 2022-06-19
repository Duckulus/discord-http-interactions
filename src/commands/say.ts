import { ApplicationCommand } from '../core/command/ApplicationCommand';
import {
  APIApplicationCommandInteractionDataStringOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  InteractionResponseType,
} from 'discord-api-types/v10';

export class SayCommand extends ApplicationCommand {
  constructor() {
    super('say', 'Sends a message', ApplicationCommandType.ChatInput, [
      {
        name: 'message',
        description: 'The message I should say',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ]);
  }

  execute(interaction: APIChatInputApplicationCommandInteraction) {
    const message = (
      interaction.data.options?.filter((option) => {
        return option.name == 'message';
      })[0] as APIApplicationCommandInteractionDataStringOption
    ).value;

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: message,
      },
    } as APIInteractionResponse;
  }
}
