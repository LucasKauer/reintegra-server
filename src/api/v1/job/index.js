import { Router } from 'express';

import job from './controller';

import authenticated from '../../../middlewares/authentication';

const router = Router();

router.route('/job')
  .get(authenticated, job.findAll)
  .post(authenticated, job.create);

router.route('/job/:id')
  .delete(authenticated, job.remove);

router.route('/job/:title')
  .get(authenticated, job.findByTitle);

export default router;
