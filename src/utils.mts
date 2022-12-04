/**
 * Eckode CLI utility helpers
 *
 * @since 0.0.1
 */
/** Dependencies */
// NPM
import chalk from 'chalk';
import { platform } from 'os';
import { exit } from 'process';
import { existsSync } from 'fs';
import { normalize } from 'path';
// Local
import { LoggerTypes, BgColors, Colors, SpawnNodeProcessArgs } from './types';
import { spawnSync } from 'child_process';
import rimraf from 'rimraf';

/**
 * Spawn Node Process to load one of the script commands.
 *
 * @param {SpawnNodeProcessArgs} spawnArgs Spawn Node Process args
 * @param {keyof EckodeNpmScripts} spawnArgs.scriptName Name of script relative to ./cli/scripts
 * @param {string[]} spawnArgs.args Script arguments
 * @param {string[]} spawnArgs.nodeArgs Node CLI args passed to spawn process
 * @param {string} spawnArgs.bundler Node CLI args passed to spawn process
 *
 * @since 0.0.1
 */
export const spawnNodeProcess = ({
  args = [],
  nodeArgs = [],
  scriptName = 'dev',
  bundler = 'webpack',
}: SpawnNodeProcessArgs): void => {
  // Is @eckode/${bundler} installed?
  if (!existsSync(`${process.env.ECKO_SCOPED_PATH}/${bundler}`)) {
    logger(
      `does not exist. You need to run "yarn add -D @eckode/${bundler}"`,
      'error',
      `${process.env.ECKO_SCOPED_PATH}/${bundler}`,
    );
    exit(1);
  }
  // Does script/command exist?
  if (!hasScriptFile(scriptName)) {
    logger(`Unknown command "${scriptName}", ${scriptFilePath(scriptName)} does not exist`, 'error');
    exit(1);
  }

  const { signal, status } = spawnSync('node', [...nodeArgs, scriptFilePath(scriptName), ...args], {
    stdio: 'inherit',
    shell: platform() === 'win32',
  });

  if (signal) {
    handleSignal(signal);
  }

  exit(status ?? 1);
};

/**
 * Script file path.
 *
 * @param {string} scriptName Script name
 * @return {string}
 * @since 0.0.1
 */
export const scriptFilePath = (scriptName: string): string =>
  normalize(`${process.env.ECKO_CLI_PATH}/src/scripts/${scriptName}.mjs`);

/**
 * Does file exist
 *
 * @param {string} scriptName Script name
 * @return {boolean}
 * @since 0.0.1
 */
export const hasScriptFile = (scriptName: string): boolean => existsSync(scriptFilePath(scriptName));

/**
 * Signal handler
 *
 * @param {NodeJS.Signals} signal Signals required handling
 * @since 0.0.1
 */
export function handleSignal(signal: NodeJS.Signals): void {
  if (signal === 'SIGKILL') {
    // eslint-disable-next-line no-console
    logger(
      'The script failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.',
      'error',
    );
  } else if (signal === 'SIGTERM') {
    // eslint-disable-next-line no-console
    logger(
      'The script failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.',
      'error',
    );
  }
  exit(1);
}

/**
 * Logger helper to decorate outputs during execution
 *
 * @param {string} msg Message to log in console output
 * @param {keyof LoggerTypes} type Logger type, used to decorate console output appropriately
 * @param {string} em String to emphasize at the beginning of the log
 * @since 0.0.1
 */
export function logger(msg: string, type: keyof LoggerTypes = 'text', em: string = ''): void {
  let bgColor: keyof BgColors;
  let color: keyof Colors;
  let emoji = '';
  switch (type) {
    default:
    case 'text':
    case 'bullet':
      color = 'black';
      bgColor = 'bgWhiteBright';
      emoji += '-';
      break;
    case 'info':
      color = 'whiteBright';
      bgColor = 'bgBlue';
      emoji += 'i';
      break;
    case 'success':
      color = 'whiteBright';
      bgColor = 'bgGreenBright';
      emoji += '✅';
      break;
    case 'warning':
      color = 'black';
      bgColor = 'bgYellow';
      emoji += '❕';
      break;
    case 'error':
      color = 'red';
      bgColor = 'bgBlack';
      emoji += '⛔';
      break;
  }
  console.log(chalk[color][bgColor](`[eckode] ${emoji}${em === '' ? '' : ` ${chalk.bold(em)}`} ${msg}`));
}

/**
 * Promised based rimraf
 *
 * @param {string} src Src to remove
 * @uses rimraf
 * @since 0.0.1
 */
export const rmRf = (src: string) =>
  new Promise<string>((resolve, reject) => {
    rimraf(src, (err) => {
      if (err === null) {
        logger(`${src} successfully removed`, 'success');
        return resolve('Success');
      }
      return reject(new Error(`Error invoking rimraf for ${src}`));
    });
  });
