import { REST } from '@discordjs/rest';
import { BOT_TOKEN } from '../../utils/constants';

export const discordRest = new REST({
  version: '10',
}).setToken(BOT_TOKEN);
