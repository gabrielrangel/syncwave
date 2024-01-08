import { configDotenv, DotenvConfigOptions } from 'dotenv';
import { existsSync } from 'fs';
import { camelCase } from 'lodash';

process.env.NODE_ENV = 'development';
const { NODE_ENV } = process.env;

export const config: DotenvConfigOptions = {
    path: (() => {
        const argmentEnvFile = process.argv[2];
        if (existsSync(argmentEnvFile)) {
            console.log({ argmentEnvFile });
            return argmentEnvFile;
        }

        const ambientEnvFile = `.env.${camelCase(NODE_ENV)}`;
        if (existsSync(ambientEnvFile)) {
            console.log({ ambientEnvFile });
            return ambientEnvFile;
        }

        return '.env';
    })(),
};

configDotenv(config);

export default config;
