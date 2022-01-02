import { verify } from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { HttpException } from '../error/HttpException';

const JwtAuth = async (context: Context, next: Next) => {
    if (context.headers['authorization']) {
        const authKey = context.headers['authorization'].replace('Bearer', '').replace(' ', '');
        context.user = verify(authKey, String(process.env.JWT_SECRET).toString());;
    } else {
        throw new HttpException('Unauthorized', 1000, 401);
    }
    return next();
};
export { JwtAuth };