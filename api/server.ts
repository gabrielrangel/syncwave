import { api } from './api';

const port = process.env.PORT || 3000;

api.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
