/**
 * @link https://stackoverflow.com/a/64383997/1954596
 */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'node:module';

export const getNodeRequire = (url: string = import.meta.url): NodeRequire => createRequire(url);
export const getNodeFilename = () => fileURLToPath(import.meta.url);
export const getNodeDirname = (): string => dirname(getNodeFilename());

export default {
  getNodeRequire,
  getNodeFilename,
  getNodeDirname,
};
