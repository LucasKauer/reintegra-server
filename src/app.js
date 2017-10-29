import express from 'express';
import dotenv from 'dotenv-safe';

import configureExpress from './config/express';

dotenv.load({
  allowEmptyValues: true,
  sample: './env/.env.example',
  path: './env/.env',
});

const app = express();

configureExpress(app);

app.listen(process.env.PORT);
