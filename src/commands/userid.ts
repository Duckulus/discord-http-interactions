import { ApplicationCommand } from '../core/command/ApplicationCommand';
import {
  APIInteractionResponse,
  APIUserApplicationCommandInteraction,
  ApplicationCommandType,
  InteractionResponseType,
} from 'discord-api-types/v10';

export class UserId extends ApplicationCommand {
  constructor() {
    super('userid', '', ApplicationCommandType.User);
  }

  execute(interaction: APIUserApplicationCommandInteraction) {
    const user = interaction.data.resolved.users[interaction.data.target_id];
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `${user.username}'s ID: ${interaction.data.target_id}`,
      },
    } as APIInteractionResponse;
  }
}
