import { initCommands } from './core/command/commandHandler';
import { createApi } from './core/api';
import { getBotUser } from './utils/botUser';

const main = async () => {
  console.log('Hello Discord');
  await initCommands();
  const self = await getBotUser();
  console.log(`Logged in as ${self.username}#${self.discriminator}`);
  createApi();
};

main().catch((e) => {
  console.log(e);
});
