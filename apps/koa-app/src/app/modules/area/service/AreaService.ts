import { BadRequestException, HttpException, HTTP_STATUS } from '@exp/shared';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import {
	Body,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Query,
	Route,
	Security,
	Tags,
} from 'tsoa';
import Area from '../../../entity/Area';
import AreaDto from '../dto/AreaDto';
import prisma from '../../../utils/database/prisma';
import { PaginationResult } from '../../../utils/pagination/PaginationResult';
import { Pagination } from '../../../utils/pagination/Pagination';

@Security('api_key')
@Route('area')
@Tags('Area')
export class AreaService {
	@Security('bearer_auth')
	@Post()
	async create(@Body() dto: AreaDto | any): Promise<Area> {
		const data = plainToClass(AreaDto, dto);
		const errors: ValidationError[] = await validate(data);
		if (errors.length) throw new BadRequestException(errors);
		const model = plainToClass(Area, data);
		const result = await prisma.area.create({ data: model });
		return result;
	}

	@Security('bearer_auth')
	@Put()
	async update(@Body() dto: AreaDto | any): Promise<Area> {
		const data = plainToClass(AreaDto, dto);
		const errors: ValidationError[] = await validate(data);
		if (errors.length) throw new BadRequestException(errors);
		await this.view(dto.id);
		const model = plainToClass(Area, data);
		const where = { id: model.id };
		const result = await prisma.area.update({ where, data: model });
		return result;
	}

	@Security('bearer_auth')
	@Get('{perPage}/{lastId}/{sort}')
	async list(
		@Path() perPage: number,
		@Path() lastId: number,
		@Path() sort: number,
		@Query() search?: string
	): Promise<PaginationResult<Area>> {
		const where = {
			area: {
				contains: search,
			},
		};
		const total = await prisma.area.count({
			where,
			orderBy: { area: 'asc' },
		});
		const data = await prisma.area.findMany({
			take: +perPage,
			where,
			cursor: {
				id: +lastId,
			},
			orderBy: {
				area: sort ? 'asc' : 'desc',
			},
		});
		return Pagination.result(total, perPage, data);
	}

	@Security('bearer_auth')
	@Get('{id}')
	async view(@Path() id: number): Promise<Area> {
		const where = { id };
		const data = await prisma.area.findFirst({ where });
		if (!data) {
			throw new HttpException(
				'Data tidak ditemukan',
				HTTP_STATUS.NOT_FOUND
			);
		}
		return data;
	}

	@Security('bearer_auth')
	@Delete('{id}')
	async delete(@Path() id: number): Promise<number> {
		await this.view(id);
		const where = { id };
		const data = await prisma.area.delete({ where });
		if (data) {
			throw new HttpException(
				'Gagal menghapus data',
				HTTP_STATUS.CONFLICT
			);
		}
		return data;
	}
}
