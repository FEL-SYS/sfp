import { Request } from 'tsoa';
import { UserService } from '../service/UserService';

export class UserRestHandler {
	static async register(@Request() ctx: any) {
		const service = new UserService();
		ctx.status = 201;
		ctx.body = await service.register(ctx.request.body);
		return;
	}

	static async login(@Request() ctx: any) {
		const service = new UserService();
		ctx.status = 201;
		ctx.body = await service.login(ctx.request.body);
		return;
	}

	static async me(@Request() ctx: any) {
		const service = new UserService();
		ctx.status = 200;
		ctx.body = await service.me(ctx.user);
	}
}
