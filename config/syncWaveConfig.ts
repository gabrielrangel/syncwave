import '../lib/dotenv';

export class SyncWaveConfig implements SyncWaveProcessEnv {
    readonly API_PORT: number = process.env.API_PORT ?? 3000;

    readonly API_URI: string = process.env.API_URI ?? 'localhost';
}

export default SyncWaveConfig;
