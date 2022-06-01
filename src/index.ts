import * as express from 'express';
import { APIInteraction } from 'discord-api-types/v10';
import { auth } from './core/auth';
import { PORT } from './utils/constants';
import { initCommands } from './core/command/commandHandler';
import { handleInteraction } from './core/handler';

console.log('Hello Discord');

initCommands();

const app = express();

app.use(express.json());
app.use(auth);

app.post('/', async (req, res) => {
  const interaction = req.body as APIInteraction;
  res.status(200).send(await handleInteraction(interaction));
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
