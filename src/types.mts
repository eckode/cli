import { ChalkInstance } from "chalk";

export type EckodeNpmScripts = 'build' | 'dev';

export type EckodeBundlers = 'webpack';

export interface SpawnNodeProcessArgs {
  scriptName: EckodeNpmScripts;
  args?: string[];
  nodeArgs?: string[];
  bundler?: EckodeBundlers;
}

export type LoggerTypes = {
  info: string;
  warning: string;
  success: string;
  error: string;
  bullet: string;
  text: string;
};

export type Colors = {
  red: ChalkInstance;
  black: ChalkInstance;
  white: ChalkInstance;
  whiteBright: ChalkInstance;
};

export type BgColors = {
  bgBlack: ChalkInstance;
  bgYellow: ChalkInstance;
  bgBlue: ChalkInstance;
  bgWhiteBright: ChalkInstance;
  bgGreenBright: ChalkInstance;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ECKO_SCOPED_PATH: string;
      ECKO_PROJECT_PATH: string;
      ECKO_CLI_PATH: typeof __dirname;
      ECKO_COMMAND: EckodeNpmScripts;
    }
  }
}