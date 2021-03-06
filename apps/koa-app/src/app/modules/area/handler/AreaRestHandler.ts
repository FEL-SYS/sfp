import { Context } from 'koa';
import { Request } from 'tsoa';
import { AreaService } from '../service/AreaService';

export class AreaRestHandler {
	static async create(@Request() ctx: any) {
		const service = new AreaService();
		ctx.status = 201;
		ctx.body = await service.create(ctx.request.body);
		return;
	}

	static async update(@Request() ctx: any) {
		const service = new AreaService();
		ctx.status = 201;
		ctx.body = await service.update(ctx.request.body);
		return;
	}

	static async list(@Request() ctx: Context) {
		const { perPage, lastId, sort } = ctx.params;
		const { search } = ctx.query;
		const service = new AreaService();
		ctx.status = 200;
		ctx.body = await service.list(
			+perPage,
			+lastId,
			+sort,
			search === undefined ? undefined : String(search)
		);
	}

	static async view(@Request() ctx: any) {
		const { id } = ctx.params;
		const service = new AreaService();
		ctx.status = 200;
		ctx.body = await service.view(+id);
	}

	static async delete(@Request() ctx: Context) {
		const { id } = ctx.params;
		const service = new AreaService();
		ctx.status = 204;
		ctx.body = await service.delete(+id);
	}
}
