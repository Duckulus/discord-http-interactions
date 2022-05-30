import * as express from "express"
import {
    APIApplicationCommandInteraction,
    APIInteraction,
    APIInteractionResponse,
    InteractionResponseType,
    InteractionType
} from "discord-api-types/v10";
import {auth} from "./core/auth";
import {PORT} from "./utils/constants";
import {handleCommand, initCommands} from "./core/command/commandHandler";

console.log("Hello Discord")

initCommands()

const app = express()

app.use(express.json())
app.use(auth)

app.post("/", async (req, res) => {
    const interaction = req.body as APIInteraction

    switch (interaction.type) {
        case InteractionType.Ping:
            console.log("Received Ping")
            res.status(200).send({
                type: InteractionResponseType.Pong,
            } as APIInteractionResponse)
            break;

        case InteractionType.ApplicationCommand:
            console.log(`Received Application Command: ${interaction.data.name}`)

            res.status(200).send(await handleCommand(interaction as APIApplicationCommandInteraction))
    }
})

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})