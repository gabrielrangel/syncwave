import { json, urlencoded, Response as ExResponse, Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

export default function configure(app: Application) {
    app.use(urlencoded({ extended: true }));

    app.use(json());

    app.use('/docs', swaggerUi.serve, async (_: unknown, res: ExResponse) =>
        res.send(swaggerUi.generateHTML(swaggerDoc))
    );
}

export { configure };
