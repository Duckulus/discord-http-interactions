import {
    APIApplicationCommandInteraction,
    APIApplicationCommandOption,
    APIInteractionResponse, ApplicationCommandType
} from "discord-api-types/v10";
import {commands} from "./commandHandler";

export abstract class ApplicationCommand {
    name: string
    description: string
    type: ApplicationCommandType
    options: APIApplicationCommandOption[] | undefined

    protected constructor(name: string, description: string, type: ApplicationCommandType,options?: APIApplicationCommandOption[]) {
        this.name = name
        this.description = description
        this.options = options
        this.type = type
        commands[name] = this
    }

    abstract execute(interaction: APIApplicationCommandInteraction): APIInteractionResponse


}
