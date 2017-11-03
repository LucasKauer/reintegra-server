import express from 'express';
import dotenv from 'dotenv-safe';

import configureExpress from './config/express';
import configureDatabase from './config/database';

const env = process.env.ENVIRONMENT || '';

dotenv.load({
  allowEmptyValues: true,
  sample: './env/.env.example',
  path: `./env/${env}.env`,
});

const app = express();

configureExpress(app);

const {
  DB_BASE,
  DB_HOST,
  DB_USER,
  DB_PWD,
} = process.env;

configureDatabase.connectToDatabase(DB_BASE, DB_HOST, DB_USER, DB_PWD);

app.listen(process.env.PORT);
