import { Router } from 'express';

import RepositoryController from '../app/controllers/RepositoryController';

import EnsureAuthenticated from '../app/middlewares/EnsureAuthenticated';

const router = new Router();

router.get('/index', RepositoryController.index);
router.get('/show/:repository_id', RepositoryController.show);

router.post('/store', EnsureAuthenticated, RepositoryController.store);

router.put(
  '/update/:repository_id',
  EnsureAuthenticated,
  RepositoryController.update,
);

router.patch(
  '/star/:repository_id',
  EnsureAuthenticated,
  RepositoryController.star,
);

router.delete(
  '/delete/:repository_id',
  EnsureAuthenticated,
  RepositoryController.delete,
);

export default router;
