import { init, initInstana } from '@swatch/service-shared';

async function main() {
  await init();

  await initInstana('user-preferences-service');

  await import('./main');
}

main();
