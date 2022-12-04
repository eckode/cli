import { logger, rmRf } from './utils.mjs';

(async () => {
  try {
    await rmRf('./src/**/*.mjs');
    await rmRf('./src/**/*.js');
  } catch (err) {
    // @TODO @type
    logger(err as string, 'error');
  }
})();
