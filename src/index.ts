import 'express-async-errors';
import express, { Application, json } from 'express';
import cors from 'cors';
import registerRoutes from './routes';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const app: Application = express();

const PORT: string = process.env.PORT || '5000';

app.use(json());
app.use(cors());
registerRoutes(app);

app.listen(PORT, () => {
  console.log(`server started at PORT: ${PORT}`);
});

export default app;
