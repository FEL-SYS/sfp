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
import User from '../../../entity/User';
import UserDto from '../dto/UserDto';
import prisma from '../../../utils/database/prisma';

export class PaginationResult<Type> {
	total: number;
	perPage: number;
	data: Array<Type>;

	constructor(total: number, perPage: number, data: Array<Type>) {
		this.total = total;
		this.perPage = perPage;
		this.data = data;
	}
}

export class Pagination {
	static result<Type>(total: number, perPage: number, data: Array<Type>) {
		return new PaginationResult<Type>(total, perPage, data);
	}
}

@Security('api_key')
@Route('user')
@Tags('User')
export class UserService {
	@Security('bearer_auth')
	@Post()
	async create(@Body() dto: UserDto | any): Promise<User> {
		const data = plainToClass(UserDto, dto);
		const errors: ValidationError[] = await validate(data);
		if (errors.length) throw new BadRequestException(errors);
		const model = plainToClass(User, data);
		const result = await prisma.user.create({ data: model });
		return result;
	}

	@Security('bearer_auth')
	@Put()
	async update(@Body() dto: UserDto | any): Promise<User> {
		const data = plainToClass(UserDto, dto);
		const errors: ValidationError[] = await validate(data);
		if (errors.length) throw new BadRequestException(errors);
		await this.view(dto.id);
		const model = plainToClass(User, data);
		const where = { id: model.id };
		const result = await prisma.user.update({ where, data: model });
		return result;
	}

	@Security('bearer_auth')
	@Get('{perPage}/{lastId}/{sort}')
	async list(
		@Path() perPage: number,
		@Path() lastId: number,
		@Path() sort: number,
		@Query() search?: string
	): Promise<PaginationResult<User>> {
		const where = {
			username: {
				contains: search,
			},
		};
		const total = await prisma.user.count({
			where,
			orderBy: { username: 'asc' },
		});
		const data = await prisma.user.findMany({
			take: +perPage,
			where,
			cursor: {
				id: +lastId,
			},
			orderBy: {
				username: sort ? 'asc' : 'desc',
			},
		});
		return Pagination.result(total, perPage, data);
	}

	@Security('bearer_auth')
	@Get('{id}')
	async view(@Path() id: number): Promise<User> {
		const where = { id };
		const data = await prisma.user.findFirst({ where });
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
		const data = await prisma.user.delete({ where });
		if (data) {
			throw new HttpException(
				'Gagal menghapus data',
				HTTP_STATUS.CONFLICT
			);
		}
		return data;
	}
}
