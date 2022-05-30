import {
    APIApplicationCommandInteraction,
    APIApplicationCommandOption,
    APIInteractionResponse
} from "discord-api-types/v10";
import {commands} from "./commandHandler";

export abstract class Command {
    name: string
    description: string
    options: APIApplicationCommandOption[]

    protected constructor(name: string, description: string, options: APIApplicationCommandOption[]) {
        this.name = name
        this.description = description
        this.options = options
        commands[name] = this
    }

    abstract execute(interaction: APIApplicationCommandInteraction): APIInteractionResponse


}
