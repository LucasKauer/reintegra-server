import { Router } from 'express';

import v1 from './v1/index';

const basePath = '/api';

const router = Router();

router.use(`${basePath}/v1`, v1);

export default router;
