interface SyncWaveProcessEnv {
    API_PORT?: number;
    API_URI?: string;
}

declare namespace NodeJS {
    interface ProcessEnv extends SyncWaveProcessEnv {}
}
