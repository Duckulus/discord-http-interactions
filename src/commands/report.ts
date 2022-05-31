import { ApplicationCommand } from '../core/command/ApplicationCommand';
import {
  APIInteractionResponse,
  APIModalSubmitInteraction,
  APIUserApplicationCommandInteraction,
  ApplicationCommandType,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
  TextInputStyle,
} from 'discord-api-types/v10';
import { registerModalInteraction } from '../core/component/ModalComponent';

export class Report extends ApplicationCommand {
  constructor() {
    super('report', '', ApplicationCommandType.User);

    registerModalInteraction(
      'report',
      (interaction: APIModalSubmitInteraction) => {
        const reason = interaction.data.components![0].components[0].value;
        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            content: `User has been reported for ${reason}`,
            flags: MessageFlags.Ephemeral,
          },
        } as APIInteractionResponse;
      }
    );
  }

  execute(
    interaction: APIUserApplicationCommandInteraction
  ): APIInteractionResponse {
    const user = interaction.data.resolved.users[interaction.data.target_id];
    return {
      type: InteractionResponseType.Modal,
      data: {
        title: `Report ${user.username}#${user.discriminator}`,
        custom_id: 'report',
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.TextInput,
                custom_id: 'reason',
                placeholder: 'Reason',
                value: '',
                style: TextInputStyle.Short,
                max_length: 20,
                label: 'Reason',
              },
            ],
          },
        ],
      },
    };
  }
}
