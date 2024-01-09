export type NodeEnv = 'development' | 'production' | 'test';

export class SyncWaveConfig implements SyncWaveProcessEnv {
    readonly API_PORT: number = process.env.API_PORT ?? 3000;

    readonly API_URI: string = process.env.API_URI ?? 'localhost';

    readonly ENVIRONMENT: NodeEnv = process.env.NODE_ENV ?? 'development';

    readonly LOGS_OUTPUT: string = process.env.LOGS_OUTPUT ?? 'logs';

    readonly COMBINED_LOG_FILE_NAME: string =
        process.env.COMBINED_LOG_FILE_NAME ?? 'combined';

    readonly ERROR_LOG_FILE_NAME: string =
        process.env.ERROR_LOG_FILE_NAME ?? 'error';
}

export default SyncWaveConfig;
