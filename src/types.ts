export interface EckodeNpmScripts {
  build: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ECKO_SCOPED_PATH: string;
      ECKO_PROJECT_PATH: string;
      ECKO_PATH: typeof __dirname;
      ECKO_ROOT_PATH: typeof __dirname;
      ECKO_COMMAND: keyof EckodeNpmScripts;
    }
  }
}