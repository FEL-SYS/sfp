import { Context } from 'koa';
import { Request } from 'tsoa';
import AreaService from '../service/AreaService';

export class AreaRestHandler {
	static async create(@Request() ctx: Context) {
		const service = new AreaService();
		ctx.status = 201;
		ctx.body = await service.save(ctx.request.body);
		return;
	}
}
