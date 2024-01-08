import '../lib/dotenv';

export class SyncWaveConfig implements SyncWaveProcessEnv {
    readonly API_PORT?: number | undefined = process.env.API_PORT ?? 3000;
}

export default SyncWaveConfig;
