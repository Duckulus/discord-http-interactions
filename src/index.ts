import { initCommands } from './core/command/commandHandler';
import { createApi } from './core/api';

const main = async () => {
  console.log('Hello Discord');
  await initCommands();
  createApi();
};

main().catch((e) => {
  console.log(e);
});
