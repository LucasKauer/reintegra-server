import { Router } from 'express';

import error from '../../middlewares/error-handler';
import status from './status/index';
import user from './user/index';

const router = Router();

router.use(status);
router.use(user);

router.use(error);

export default router;
