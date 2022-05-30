import * as express from "express"
import * as dotenv from "dotenv"
import {APIInteraction, APIInteractionResponse, InteractionResponseType, InteractionType} from "discord-api-types/v10";
import {auth} from "./auth";

console.log("Hello Discord")

dotenv.config()
const PORT = process.env.PORT || 3000
export const PUBLIC_KEY = process.env.PUBLIC_KEY as string
if (!PUBLIC_KEY) {
    console.error("No public key")
    process.exit(-1)
}

const app = express()

app.use(express.json())
app.use(auth)


app.post("/", (req, res) => {
    const interaction = req.body as APIInteraction

    switch (interaction.type) {
        case InteractionType.Ping:
            console.log("Received Ping")
            res.status(200).send({
                type: InteractionResponseType.Pong,
            } as APIInteractionResponse)
            break;
        case InteractionType.ApplicationCommand:
            console.log("Received Application Command")
            res.status(200).send({
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: "Hello World"
                }
            } as APIInteractionResponse)
            break;
    }
})

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})