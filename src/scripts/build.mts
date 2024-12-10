/**
 * External dependencies
 */
import { platform } from 'os';
import { spawnSync } from 'child_process';
import { require } from '../deps/index.mjs';

const { ECKO_SCOPED_PATH } = process.env;

import { normalize } from 'path';

// @TODO Make args dynamic.
const { status } = spawnSync(
  require.resolve('webpack/bin/webpack.js'),
  ['--config', normalize(`${ECKO_SCOPED_PATH}/webpack/webpack/webpack.prod.mjs`)],
  {
    stdio: 'inherit',
    shell: platform() === 'win32',
  },
);

process.exit(status ?? 1);
