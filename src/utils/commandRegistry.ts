import {
  APIApplicationCommandOption,
  ApplicationCommandType,
} from 'discord-api-types/v10';
import axios from 'axios';
import {
  APPLICATION_ID,
  BOT_TOKEN,
  DISCORD_BASE_URL,
  GUILD_ID,
} from './constants';

export const registerGuildCommand = async (
  name: string,
  description: string,
  type: ApplicationCommandType,
  options: APIApplicationCommandOption[] | undefined
) => {
  const url = `${DISCORD_BASE_URL}/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`;

  return await axios.post(
    url,
    {
      name: name,
      description: description,
      type: type,
      options: options,
      id: name,
    },
    {
      headers: {
        authorization: `Bot ${BOT_TOKEN}`,
      },
    }
  );
};

export const registerGlobalCommand = async (
  name: string,
  description: string,
  type: ApplicationCommandType,
  options: APIApplicationCommandOption[] | undefined
) => {
  const url = `${DISCORD_BASE_URL}/applications/${APPLICATION_ID}/commands`;

  return await axios.post(
    url,
    {
      name: name,
      description: description,
      type: type,
      options: options,
      id: name,
    },
    {
      headers: {
        authorization: `Bot ${BOT_TOKEN}`,
      },
    }
  );
};
