import { Router } from 'express';

import error from '../../middlewares/error-handler';
import status from './status/index';

const router = Router();

router.use(status);

router.use(error);

export default router;
