// const copyFile = async (src, dest) => {
//   await fs.promises.copyFile(src, dest);
// };
import fs from 'fs/promises';
import { resolve } from 'path';
import packageJson from '../package.json' assert { type: 'json' };
import { logger, rmRf } from './utils.mjs';

const packageJsonPath = resolve('./', 'package.json');

(async () => {
  logger('Package.json file copied');
    logger('Making changes...');
    const updatedJson = ({ devDependencies: dependencies, ...rest }: typeof packageJson) => ({
      ...rest,
      dependencies,
    });
    await fs.writeFile('./package.json', JSON.stringify(updatedJson(packageJson)));
    logger('Changes applied');
})();