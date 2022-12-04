import { resolve } from 'path';
import { exit } from 'process';
import chalk from 'chalk';

import { spawnNodeProcess } from './utils.mjs';
import nodeLocalVars from './node-env-vars.mjs';
import { EckodeNpmScripts } from './types.js';

const eckodeNpmCommands: Array<EckodeNpmScripts> = ['build', 'dev'];

const {
  env: { npm_lifecycle_event: lifecycleEvent = 'dev' },
} = process;

/**
 * Node globals
 */
process.env.ECKO_CLI_PATH = resolve(nodeLocalVars.getNodeDirname(), '../');
// node_modules/@eckode
process.env.ECKO_SCOPED_PATH = resolve(process.env.ECKO_CLI_PATH, '../');
process.env.ECKO_PROJECT_PATH = process.cwd();
process.env.ECKO_COMMAND = lifecycleEvent as EckodeNpmScripts;

if (!eckodeNpmCommands.includes(process.env.ECKO_COMMAND)) {
  console.log(
    chalk.black.bgWhiteBright(`< ECKODE-CLI; /> ⛔ ${chalk.bold(process.env.ECKO_COMMAND)} command not found!`),
  );
  exit(1);
}

// Start er up!
spawnNodeProcess({ scriptName: process.env.ECKO_COMMAND, args: process.argv.slice(2) });

export default {};
