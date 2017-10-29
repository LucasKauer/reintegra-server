import { Router } from 'express';

import status from './controller';

const router = Router();

router.route('/status')
  .get(status.verify);

export default router;
