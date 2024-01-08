import { TYPE } from 'inversify-express-utils';

export const types = {
    ...TYPE,
    AppConfig: Symbol('SyncWaveConfig'),
    Express: Symbol('Express'),
    Server: Symbol('Server'),
    UsersService: Symbol('UsersService'),
};

export default types;
