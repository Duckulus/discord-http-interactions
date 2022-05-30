import express from "express"
import nacl from "tweetnacl"
import dotenv from "dotenv"

console.log("Hello Discord")

dotenv.config()
const PORT = process.env.PORT || 3000
const PUBLIC_KEY = process.env.PUBLIC_KEY
if(!PUBLIC_KEY) {
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

    if(req.body.type==1) {
        console.log("Received Ping")
        res.status(200).send({
            "type": 1
        })
    }

})

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})