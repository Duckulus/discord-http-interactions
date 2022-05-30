import {Command} from "../core/command/Command";
import {APIApplicationCommandInteraction, APIInteractionResponse, InteractionResponseType} from "discord-api-types/v10";

export class PingCommand extends Command{

    constructor() {
        super("ping", "Pongs", []);
    }

    execute(interaction: APIApplicationCommandInteraction) {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Pong"
            }
        } as APIInteractionResponse
    }
}