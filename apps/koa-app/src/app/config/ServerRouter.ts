import Router = require('@koa/router');
import { AreaRestHandler } from '../domain/area/handler/Area.rest.handler';

const router = new Router();

// AREA
router.post(`/area`, AreaRestHandler.create);

export default router;
