import { Router } from 'express';

import auth from './controller';

const router = Router();

router.route('/authentication')
  .post(auth.login);

router.route('/authentication/verify')
  .get(auth.verifyToken);

export default router;
