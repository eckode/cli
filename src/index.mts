#!/usr/bin/env node

import { platform } from 'os';
import { spawnSync } from 'child_process';
import { exit } from 'process';
import { existsSync } from 'fs';
import { normalize } from 'path';
import { EckodeNpmScripts } from './types.js';

/**
 * Spawn Node Process to load one of the script commands.
 *
 * @param {string} scriptName Name of script relative to ./cli/scripts
 * @param {string[]} args CLI args passed to spawn process
 * @param {string[]} nodeArgs Node CLI args passed to spawn process
 */
export const spawnNodeProcess = (
  scriptName: keyof EckodeNpmScripts = 'build',
  args: string[] = [],
  nodeArgs: string[] = [],
): void => {
  if (!hasScriptFile(scriptName)) {
    console.log(`Unknown command "${scriptName}"`);
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

function scriptFilePath(scriptName: string): string {
  return normalize(`${process.env.ECKO_PATH}/src/scripts/${scriptName}.mjs`);
}

function hasScriptFile(scriptName: string): boolean {
  return existsSync(scriptFilePath(scriptName));
}

function handleSignal(signal: NodeJS.Signals): void {
  if (signal === 'SIGKILL') {
    // eslint-disable-next-line no-console
    console.log(
      'The script failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.',
    );
  } else if (signal === 'SIGTERM') {
    // eslint-disable-next-line no-console
    console.log(
      'The script failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.',
    );
  }
  exit(1);
}

export default {
  spawnNodeProcess,
};