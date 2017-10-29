import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import validator from 'express-validator';
import cookieParser from 'cookie-parser';

import router from '../api/index';

function configureMiddleware(app) {
  const logger = morgan(process.env.LOGGER_TYPE);

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(logger);
  app.use(validator());
  app.use(cookieParser());
  app.use(router);
}

export default configureMiddleware;
