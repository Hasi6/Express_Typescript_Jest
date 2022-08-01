import 'express-async-errors';
import express, { Application, json } from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import helmet from 'helmet';
import logger from 'morgan';
import registerRoutes from './routes';
import { NotFoundError } from './utils/execptions';
import { errorHandler } from './middlewares/error-handler';
import loggerObj from './utils/logger';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const app: Application = express();

const PORT: string = process.env.PORT || '5000';

app.use(json());
app.use(cors());
app.use(helmet());
app.use(logger('dev'));

app.all('*', (req, _res, next) => {
  const correlationId = (req?.headers['x-correlation-id'] as string) || uuid();
  loggerObj.debug('Request', {
    headers: req.headers,
    query: req.query,
    body: req.body,
    ip: req.ip,
    'x-correlation-id': correlationId
  });
  req.headers['x-correlation-id'] = correlationId;

  return next();
});

registerRoutes(app);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started at PORT: ${PORT}`);
});

export default app;
