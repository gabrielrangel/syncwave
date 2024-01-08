import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import configureExpress from './config/express.config';
import AppConfig from './config/syncWaveConfig';
import TYPE from './types/types';

import './api/users/usersController';

const container = new Container();
const config = new AppConfig();

container.bind<AppConfig>(TYPE.AppConfig).toConstantValue(config);
container.load(buildProviderModule());

new InversifyExpressServer(container)
    .setConfig(configureExpress)
    .build()
    .listen(config.API_PORT, () =>
        console.log(
            `Server listeting on ${config.API_URI} port ${config.API_PORT}`
        )
    );
