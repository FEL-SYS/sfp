import { verify } from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { HttpException } from '../error/HttpException';
import { HTTP_STATUS } from '../error/HttpStatus';

const JwtAuth = async (context: Context, next: Next) => {
	if (context.headers['authorization']) {
		const authKey = context.headers['authorization']
			.replace('Bearer', '')
			.replace(' ', '');
		context.user = verify(
			authKey,
			String(process.env.JWT_SECRET).toString()
		);
	} else {
		throw new HttpException('Unauthorized', HTTP_STATUS.UNAUTHORIZED);
	}
	return next();
};
export { JwtAuth };
