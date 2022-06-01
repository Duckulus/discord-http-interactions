require('dotenv').config();

export const PUBLIC_KEY = process.env.PUBLIC_KEY as string;
export const APPLICATION_ID = process.env.APPLICATION_ID as string;
export const BOT_TOKEN = process.env.BOT_TOKEN as string;
export const GUILD_ID = process.env.GUILD_ID as string;
export const GLOBAL = process.env.GLOBAL === 'true';

export const PORT = process.env.PORT as string;

export const DISCORD_BASE_URL = 'https://discord.com/api/v10';
