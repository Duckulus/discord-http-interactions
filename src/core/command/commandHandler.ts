import { PingCommand } from '../../commands/ping';
import {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  InteractionResponseType,
  MessageFlags,
  Routes,
} from 'discord-api-types/v10';
import { ApplicationCommand } from './ApplicationCommand';
import { APPLICATION_ID, GLOBAL, GUILD_ID } from '../../utils/constants';
import { UserId } from '../../commands/userid';
import { Reverse } from '../../commands/reverse';
import { Report } from '../../commands/report';
import { discordRest } from '../rest/rest';

export const commands: { [name: string]: ApplicationCommand } = {};

export const initCommands = async () => {
  new PingCommand();
  new UserId();
  new Reverse();
  new Report();
  if (GLOBAL) {
    await registerGlobalCommands();
  } else {
    await registerGuildCommands();
  }
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

const registerGuildCommands = async () => {
  const slashCommands = Object.values(commands).map((cmd) => {
    return {
      name: cmd.name,
      description: cmd.description,
      options: cmd.options,
      type: cmd.type,
    };
  });
  try {
    await discordRest.put(
      Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
      {
        body: slashCommands,
      }
    );
    console.log(`Succesfully overwrote application commands in guild`);
  } catch (e) {
    console.log(`Error registering application commands in guild`);
    console.log(e);
  }
};

const registerGlobalCommands = async () => {
  const slashCommands = Object.values(commands).map((cmd) => {
    return {
      name: cmd.name,
      description: cmd.description,
      options: cmd.options,
      type: cmd.type,
    };
  });
  try {
    await discordRest.put(Routes.applicationCommands(APPLICATION_ID), {
      body: slashCommands,
    });
    console.log(`Succesfully overwrote application commands globally`);
  } catch (e) {
    console.log(`Error registering application commands globally`);
    console.log(e);
  }
};
