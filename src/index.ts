import * as express from 'express';
import {
  APIApplicationCommandInteraction,
  APIInteraction,
  APIInteractionResponse,
  APIModalSubmitInteraction,
  InteractionResponseType,
  InteractionType,
} from 'discord-api-types/v10';
import { auth } from './core/auth';
import { PORT } from './utils/constants';
import { handleCommand, initCommands } from './core/command/commandHandler';
import { handleModalInteraction } from './core/component/ModalComponent';

console.log('Hello Discord');

initCommands();

const app = express();

app.use(express.json());
app.use(auth);

app.post('/', async (req, res) => {
  const interaction = req.body as APIInteraction;

  switch (interaction.type) {
    case InteractionType.Ping:
      console.log('Received Ping');
      res.status(200).send({
        type: InteractionResponseType.Pong,
      } as APIInteractionResponse);
      break;

    case InteractionType.ApplicationCommand:
      console.log(`Received Application Command: ${interaction.data.name}`);

      res
        .status(200)
        .send(
          await handleCommand(interaction as APIApplicationCommandInteraction)
        );
      break;

    case InteractionType.ModalSubmit:
      console.log('Received Modal Submit');
      res
        .status(200)
        .send(
          await handleModalInteraction(interaction as APIModalSubmitInteraction)
        );
  }
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
