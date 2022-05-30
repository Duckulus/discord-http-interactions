import {APIApplicationCommandOption, ApplicationCommandType} from "discord-api-types/v10";
import axios from "axios";
import {APPLICATION_ID, BOT_TOKEN, DISCORD_BASE_URL, GUILD_ID} from "./constants";

export const registerSlashCommand = async (name: string, description: string, options: APIApplicationCommandOption[]) => {
    const url = `${DISCORD_BASE_URL}/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`

    return await axios.post(url, {
        name: name,
        description: description,
        type: ApplicationCommandType.ChatInput,
        options: options,
        id: name,
    }, {
        headers: {
            authorization: `Bot ${BOT_TOKEN}`,
        }
    })
}