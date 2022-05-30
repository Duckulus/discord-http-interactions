# Discord-HTTP-Interactions
An example for a Discord Application that receives Interactions via an outgoing Webhook made using Typescript and Express.\
Check out the [The Developer Portal](https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) to read more about this.

## What is this?
Typically Discord events are communicated via Gateways. 
But it's also possible to receive events through an outgoing Webhook.
Discord sends all Interactions to your server and you can use the [Interaction API](https://discord.com/developers/docs/interactions/receiving-and-responding) to respond to them.\
For this to work you need to handle signature headers to verify that the requests are being sent by Discord and Acknoledge Discords Ping requests.
This Project serves as an example for how to handle in this way.

## How to use
For instructions on how to run this project, check out the [Setup Guide](setup.md)

## Credit
[This Blog Post](https://leftfold.tech/blog/posts/how-to-write-a-webhook-discord-bot-in-clojure/#setting-up-a-local-testing-environment) by [JohnnyJayJay](https://github.com/JohnnyJayJay)
introduced me to the topic and inspired me to make this project.
