import Router = require('@koa/router');
import { AreaRestHandler } from '../modules/area/handler/AreaRestHandler';

const router = new Router();

// AREA
router.get(`/area/:perPage/:lastId/:sort`, AreaRestHandler.list);
router.get(`/area/:id`, AreaRestHandler.view);
router.post(`/area`, AreaRestHandler.create);
router.put(`/area`, AreaRestHandler.update);
router.delete(`/area/:id`, AreaRestHandler.delete);

export default router;
