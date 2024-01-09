import 'reflect-metadata';
import './api/users/usersController';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { Logger } from 'winston';
import createWinstonFactory from './lib/winston';
import AppConfig from './config/syncWaveConfig';
import TYPE from './types/types';
import Server from './api/server';

const container = new Container();
const config = new AppConfig();

container.bind<AppConfig>(TYPE.AppConfig).toConstantValue(config);
container.bind<Logger>(TYPE.Logger).toDynamicValue(createWinstonFactory);
container.load(buildProviderModule());

Server.factory(container).setConfig().start();
