interface SyncWaveProcessEnv {
    API_PORT?: number;
    API_URI?: string;
    NODE_ENV?: 'development' | 'test' | 'production';
}

declare namespace NodeJS {
    interface ProcessEnv extends SyncWaveProcessEnv {}
}
