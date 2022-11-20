import { spawnNodeProcess } from './index.mjs';
import { resolve } from 'path';
import { exit } from 'process';
import chalk from 'chalk';

import nodeLocalVars from './node-local-variables.mjs';
import { EckodeNpmScripts } from './types.js';

const eckodeNpmCommands: Array<keyof EckodeNpmScripts> = ['build'];

/**
 * Setup some helpful constants.
 */
process.env.ECKO_PROJECT_PATH = process.cwd(); 
process.env.ECKO_SCOPED_PATH = resolve(nodeLocalVars.getNodeDirname(), '../../'); // node_modules/@eckode
process.env.ECKO_PATH = resolve(nodeLocalVars.getNodeDirname(), '../');
process.env.ECKO_ROOT_PATH = resolve(process.env.ECKO_PATH, '../');
process.env.ECKO_COMMAND = (process.env.npm_lifecycle_event as keyof EckodeNpmScripts) ?? 'build';

if (!eckodeNpmCommands.includes(process.env.ECKO_COMMAND)) {
  console.log(
    chalk.black.bgWhiteBright(`[ecko-webpack] ⛔ ${chalk.bold(process.env.ECKO_COMMAND)} command not found!`),
  );
  exit(1);
}

// Start er up!
spawnNodeProcess(process.env.ECKO_COMMAND, process.argv.slice(2));

export default {};