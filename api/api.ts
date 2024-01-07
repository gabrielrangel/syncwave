import express, {
    json,
    urlencoded,
    Response as ExResponse,
    Request as ExRequest,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../config/routes';

export const api = express();

api.use(
    urlencoded({
        extended: true,
    })
);

api.use(json());

api.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) =>
    res.send(swaggerUi.generateHTML(await import('../config/swagger.json')))
);

RegisterRoutes(api);

export default api;
