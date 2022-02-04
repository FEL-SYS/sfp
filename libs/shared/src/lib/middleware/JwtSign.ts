import { sign } from 'jsonwebtoken';

const JwtSign = (payload: any) => {
	return sign(payload, String(process.env.JWT_SECRET).toString(), {
		expiresIn: 60 * 60,
		issuer: process.env.APP_NAME,
	});
};
export { JwtSign };
