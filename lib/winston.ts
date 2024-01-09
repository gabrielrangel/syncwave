import winston from 'winston';
import { interfaces as inversifyInterfaces } from 'inversify';
import { resolve } from 'path';
import AppConfig from '../config/syncWaveConfig';
import TYPES from '../types/types';

export default function winstonFactoryCreator(
    context: inversifyInterfaces.Context
) {
    const { container } = context;
    const c = container.get<AppConfig>(TYPES.AppConfig);
    const dirname = resolve(__dirname, '../', c.LOGS_OUTPUT);

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
    });

    logger.add(
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            dirname: resolve(dirname, c.ERROR_LOG_FILE_NAME),
        })
    );

    logger.add(
        new winston.transports.File({
            filename: 'combined.log',
            dirname: resolve(dirname, c.COMBINED_LOG_FILE_NAME),
        })
    );

    if (c.ENVIRONMENT === 'production') {
        return logger;
    }

    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );

    return logger;
}

export { winstonFactoryCreator };
