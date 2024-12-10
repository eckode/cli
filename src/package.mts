import fs from 'fs/promises';
import { logger } from './utils.mjs';
import packageJson from '../package.json' assert { type: 'json' };

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
