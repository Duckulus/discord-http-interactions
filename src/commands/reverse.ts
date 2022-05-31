import { ApplicationCommand } from '../core/command/ApplicationCommand';
import {
  APIInteractionResponse,
  APIMessageApplicationCommandInteraction,
  ApplicationCommandType,
  InteractionResponseType,
} from 'discord-api-types/v10';

export class Reverse extends ApplicationCommand {
  constructor() {
    super('reverse', '', ApplicationCommandType.Message);
  }

  execute(interaction: APIMessageApplicationCommandInteraction) {
    const message =
      interaction.data.resolved.messages[interaction.data.target_id];
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: reverse(message.content),
      },
    } as APIInteractionResponse;
  }
}

const reverse = (str: string) => {
  return str.split('').reverse().join('');
};
