import * as express from 'express';
import { auth } from './auth';
import { APIInteraction } from 'discord-api-types/v10';
import { handleInteraction } from './handler';
import { PORT } from '../utils/constants';

export const createApi = () => {
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
};
