interface SyncWaveProcessEnv {
    API_PORT?: number;
}

declare namespace NodeJS {
    interface ProcessEnv extends SyncWaveProcessEnv {}
}
