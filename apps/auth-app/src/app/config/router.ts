import { JwtAuth } from '@exp/shared';
import Router = require('@koa/router');
import { UserRestHandler } from '../modules/user/handler/UserRestHandler';

const router = new Router();

// USER
router.get('/auth/me', JwtAuth, UserRestHandler.me);
router.post('/auth/register', UserRestHandler.register);
router.post('/auth/login', UserRestHandler.login);

export default router;
