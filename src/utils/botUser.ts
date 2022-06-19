import { discordRest } from '../core/rest/rest';
import { APIUser, Routes } from 'discord-api-types/v10';

export const getBotUser = async () => {
  return (await discordRest.get(Routes.user('@me'))) as APIUser;
};
