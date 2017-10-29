import { Router } from 'express';

import user from './controller';

const router = Router();

router.route('/user')
  .get(user.findAll)
  .post(user.create);

router.route('/user/:nickname')
  .get(user.findByNickname)
  .delete(user.remove);

export default router;
