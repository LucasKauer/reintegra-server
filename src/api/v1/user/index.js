import { Router } from 'express';

import user from './controller';
import authenticated from '../../../middlewares/authentication';

const router = Router();

router.route('/user')
  .get(authenticated, user.findAll)
  .post(user.create)
  .put(authenticated, user.update);

router.route('/user/:nickname')
  .get(authenticated, user.findByNickname)
  .delete(authenticated, user.remove);

export default router;
