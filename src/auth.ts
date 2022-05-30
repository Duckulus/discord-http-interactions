import * as nacl from "tweetnacl";
import {PUBLIC_KEY} from "./index";

export function auth(req, res, next) {
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

    console.log(error)
    console.log(isVerified)
    if (error || !isVerified) {
        console.log("Unauthorized Request")
        res.status(401).send("Unauthorized")
        return
    } else {
        next()
    }
}