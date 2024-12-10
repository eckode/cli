import * as rimrafPkg from 'rimraf';
export const { rimraf } = rimrafPkg;
export default rimrafPkg;

import { createRequire } from 'module';
export const require = createRequire(import.meta.url);
