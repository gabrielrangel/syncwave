import {
    ConfigFunction,
    InversifyExpressServer,
} from 'inversify-express-utils';
import { Logger } from 'winston';
import {
    json,
    urlencoded,
    Response as ExResponse,
    Request as ExRequest,
    Application,
    NextFunction,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { Container } from 'inversify';
import AppConfig from '../config/syncWaveConfig';
import TYPES from '../types/types';
import swaggerDoc from '../config/swagger.json';

export default class ExpressServer extends InversifyExpressServer {
    #logger: Logger;

    #appConfig: AppConfig;

    constructor(...args: ConstructorParameters<typeof InversifyExpressServer>) {
        super(...args);
        const [container] = args;
        this.#logger = container.get<Logger>(TYPES.Logger);
        this.#appConfig = container.get<AppConfig>(TYPES.AppConfig);
    }

    override setConfig(
        fn: ConfigFunction = this.#configSetter.bind(this)
    ): this {
        super.setConfig(fn);
        return this;
    }

    start() {
        this.build().listen(
            this.#appConfig.API_PORT,
            this.#onStartListening.bind(this)
        );
    }

    static factory(container: Container) {
        return new ExpressServer(container);
    }

    #configSetter(app: Application) {
        app.use(urlencoded({ extended: true }));

        app.use(json());

        app.use('/docs', swaggerUi.serve, async (_: unknown, res: ExResponse) =>
            res.send(swaggerUi.generateHTML(swaggerDoc))
        );

        app.use((req: ExRequest, _res: ExResponse, next: NextFunction) => {
            this.#logger.info(`${req.url}`);
            next();
        });
    }

    #onStartListening() {
        const { API_PORT, API_URI } = this.#appConfig;
        this.#logger.info(`Server listeting on ${API_URI} port ${API_PORT}`);
    }
}

export { ExpressServer };
