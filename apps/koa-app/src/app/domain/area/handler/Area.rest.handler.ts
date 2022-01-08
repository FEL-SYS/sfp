import { Context } from 'koa';
import { Post, Route, Request, Tags } from 'tsoa';
import AreaService from '../service/Area.service';

export class AreaRestHandler {
  static async create(@Request() ctx: Context) {
    ctx.status = 201;
    ctx.body = await new AreaService().save(
      ctx.request.body,
      ctx.request.query.id
    );
  }
}
