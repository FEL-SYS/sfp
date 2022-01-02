import * as Router from '@koa/router';
import { ApmLogger, JwtAuth } from '@exp/shared';
import { Context } from 'koa';
import GlobalConfig from './Config';
import { HttpException } from '@exp/shared';

const router = new Router();

router.get(`/api`, JwtAuth, (ctx: Context) => {
    ApmLogger.getInstance(GlobalConfig).info('Test', 'Test', 'Test', { data: 'a' });
    throw new HttpException('Login error', 10000, 501);
    ctx.body = 'Test';
    ctx.status = 200;
});

export default router;
