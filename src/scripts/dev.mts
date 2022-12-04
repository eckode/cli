/**
 * External dependencies
 */
import { platform } from 'os';
import { spawnSync } from 'child_process';
import { sync as resolveBin } from 'resolve-bin';
import { normalize } from 'path';

const { ECKO_SCOPED_PATH } = process.env;

// @TODO Make args dynamic.
const { status } = spawnSync(
  resolveBin('webpack'),
  ['serve', '--config', normalize(`${ECKO_SCOPED_PATH}/webpack/webpack/webpack.dev.mjs`)],
  {
    stdio: 'inherit',
    shell: platform() === 'win32',
  },
);
process.exit(status ?? 1);
