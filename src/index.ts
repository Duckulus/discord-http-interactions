import express from "express"
import nacl from "tweetnacl"
import dotenv from "dotenv"
import {APIInteraction, APIInteractionResponse, InteractionResponseType, InteractionType} from "discord-api-types/v10";

console.log("Hello Discord")

dotenv.config()
const PORT = process.env.PORT || 3000
const PUBLIC_KEY = process.env.PUBLIC_KEY
if (!PUBLIC_KEY) {
    console.error("No public key")
    process.exit(-1)
}

const app = express()

app.use(express.json())

app.post("/", (req, res) => {
    const signature = req.headers['x-signature-ed25519'] as string;
    const timestamp = req.headers['x-signature-timestamp'];

    let isVerified;
    let error;
    try {
        isVerified = nacl.sign.detached.verify(
            Buffer.from(timestamp + JSON.stringify(req.body)),
            Buffer.from(signature, 'hex'),
            Buffer.from(PUBLIC_KEY, 'hex')
        );
    } catch (e) {
        error = e;
    }

    if (error || !isVerified) {
        console.log("Unauthorized Request")
        res.status(401).send("Unauthorized")
        return
    }

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