import { Router } from 'express';

import auth from './controller';

const router = Router();

router.route('/authentication')
  .get(auth.verifyToken)
  .post(auth.login);

export default router;
