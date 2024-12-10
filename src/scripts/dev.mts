/**
 * External dependencies
 */
import { platform } from 'os';
import { normalize } from 'path';
import { spawnSync } from 'child_process';
import { require } from '../deps/index.mjs';

const { ECKO_SCOPED_PATH } = process.env;

// @TODO Make args dynamic.
const { status } = spawnSync(
  require.resolve('webpack/bin/webpack.js'),
  ['serve', '--config', normalize(`${ECKO_SCOPED_PATH}/webpack/webpack/webpack.dev.mjs`)],
  {
    stdio: 'inherit',
    shell: platform() === 'win32',
  },
);
process.exit(status ?? 1);
