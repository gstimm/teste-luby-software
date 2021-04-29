import { Router } from 'express';

import UserController from '../app/controllers/UserController';

import EnsureAuthenticated from '../app/middlewares/EnsureAuthenticated';

const router = new Router();

router.get('/index', UserController.index);
router.get('/show/:username', UserController.show);

router.post('/store', UserController.store);
router.post('/login', UserController.login);

router.put('/update', EnsureAuthenticated, UserController.update);

router.delete('/delete', EnsureAuthenticated, UserController.delete);

export default router;
