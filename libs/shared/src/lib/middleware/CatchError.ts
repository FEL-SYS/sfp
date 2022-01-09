import { Context, Next } from 'koa';
import { HttpException } from '../error/HttpException';

const CatchError = async (ctx: Context, next: Next) => {
	try {
		await next();
	} catch (error: any) {
		if (error instanceof HttpException) {
			ctx.body = error.msg;
			ctx.status = error.code;
			return ctx;
		} else {
			ctx.body = error.msg;
			ctx.status = error.status || 500;

			return ctx;
		}
	}
};

export { CatchError };
