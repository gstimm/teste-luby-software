import { Router } from 'express';

import UserController from '../app/controllers/UserController';

import EnsureAuthenticated from '../app/middlewares/EnsureAuthenticated';

const router = new Router();

router.get('/index', UserController.index);

router.post('/store', UserController.store);
router.post('/login', UserController.login);

router.put('/update', EnsureAuthenticated, UserController.update);

export default router;
