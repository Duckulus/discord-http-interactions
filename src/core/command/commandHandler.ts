import { PingCommand } from '../../commands/ping';
import {
  APIApplicationCommand,
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  InteractionResponseType,
  MessageFlags,
} from 'discord-api-types/v10';
import { ApplicationCommand } from './ApplicationCommand';
import {
  APPLICATION_ID,
  BOT_TOKEN,
  DISCORD_BASE_URL,
  GUILD_ID,
} from '../../utils/constants';
import axios from 'axios';
import { registerSlashCommand } from '../../utils/commandRegistry';
import { UserId } from '../../commands/userid';
import { Reverse } from '../../commands/reverse';
import { Report } from '../../commands/report';

export const commands: { [name: string]: ApplicationCommand } = {};

export const initCommands = async () => {
  await unregisterAllSlashCommands();

  new PingCommand();
  new UserId();
  new Reverse();
  new Report();

  await registerSlashCommands();
};

export const handleCommand = async (
  interaction: APIApplicationCommandInteraction
) => {
  const command = commands[interaction.data.name];

  if (command) {
    return command.execute(interaction);
  } else {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: 'Command not found',
        flags: MessageFlags.Ephemeral,
      },
    } as APIInteractionResponse;
  }
};

const unregisterAllSlashCommands = async () => {
  const url = `${DISCORD_BASE_URL}/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`;
  const resp = await axios.get(url, {
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
    },
  });
  const registeredCommands = resp.data as APIApplicationCommand[];
  for (const cmd of registeredCommands) {
    const url = `${DISCORD_BASE_URL}/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands/${cmd.id}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    });
  }
};

const registerSlashCommands = async () => {
  for (const command of Object.values(commands)) {
    try {
      await registerSlashCommand(
        command.name,
        command.description,
        command.type,
        command.options
      );
    } catch (e) {
      console.log(`Error registering ${command.name} Command`);
      console.log(e);
    }
  }
};
