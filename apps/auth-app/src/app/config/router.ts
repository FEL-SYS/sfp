import Router = require('@koa/router');
import { UserRestHandler } from '../modules/user/handler/UserRestHandler';

const router = new Router();

// USER
router.get('/user/:perPage/:lastId/:sort', UserRestHandler.list);
router.get('/user/:id', UserRestHandler.view);
router.post('/user', UserRestHandler.create);
router.put('/user', UserRestHandler.update);
router.delete('/user/:id', UserRestHandler.delete);

export default router;
