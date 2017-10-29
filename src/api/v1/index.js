import { Router } from 'express';

import status from './status/index';

const router = Router();

router.use(status);

export default router;
