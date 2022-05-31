import { ApplicationCommand } from '../core/command/ApplicationCommand';
import {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  ApplicationCommandType,
  InteractionResponseType,
} from 'discord-api-types/v10';

export class PingCommand extends ApplicationCommand {
  constructor() {
    super('ping', 'Pongs', ApplicationCommandType.ChatInput, []);
  }

  execute(interaction: APIApplicationCommandInteraction) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: 'Pong',
      },
    } as APIInteractionResponse;
  }
}
