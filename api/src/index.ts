import express, { json } from 'express';
import 'express-async-errors';

import cors from './app/middlewares/cors';
import errorHandler from './app/middlewares/errorHandler';
import routes from './routes';

const app = express();

const port = 3001;
app.use(json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
