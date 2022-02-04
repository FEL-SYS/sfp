import {
	BadRequestException,
	HttpException,
	HTTP_STATUS,
	JwtSign,
} from '@exp/shared';
import { plainToClass, classToPlain, instanceToPlain } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { validate, ValidationError } from 'class-validator';
import { Body, Get, Path, Post, Route, Security, Tags } from 'tsoa';
import User from '../../../entity/User';
import prisma from '../../../utils/database/prisma';
import UserRegisterDto from '../dto/UserRegisterDto';
import { Constant } from '../../../utils/constant/Constant';
import UserLoginDto from '../dto/UserLoginDto';
import UserViewDto from '../dto/UserViewDto';

@Security('api_key')
@Route('auth')
@Tags('User')
export class UserService {
	@Post('register')
	async register(@Body() dto: UserRegisterDto | any): Promise<User> {
		const data = plainToClass(UserRegisterDto, dto);
		const errors: ValidationError[] = await validate(data);
		if (errors.length) throw new BadRequestException(errors);
		const model = plainToClass(User, data);
		model.password = await bcrypt.hash(
			data.password,
			Constant.AUTH_HASH_SALT
		);
		const result = await prisma.user.create({ data: model });
		return result;
	}

	@Post('login')
	async login(@Body() dto: UserLoginDto | any): Promise<UserViewDto | Error> {
		const { username, password } = plainToClass(UserLoginDto, dto);
		const where = { username };
		const model = await prisma.user.findFirst({ where });

		if (!model) {
			throw new HttpException(
				'User tidak ditemukan',
				HTTP_STATUS.NOT_FOUND
			);
		}

		if (!model.active) {
			throw new HttpException('User tidak aktif', HTTP_STATUS.NOT_FOUND);
		}

		const passwordResult = await bcrypt.compare(password, model.password);
		if (!passwordResult) {
			throw new HttpException(
				'Katasandi tidak cocok',
				HTTP_STATUS.NOT_FOUND
			);
		}

		const result = plainToClass(UserViewDto, model);
		const accessToken = JwtSign(instanceToPlain(result));
		return { ...result, accessToken };
	}

	@Security('bearer_auth')
	@Get('me')
	async me(userJwt: any): Promise<UserViewDto> {
		const where = { id: userJwt.id };
		const data = await prisma.user.findFirst({ where });
		if (!data) {
			throw new HttpException(
				'Data tidak ditemukan',
				HTTP_STATUS.NOT_FOUND
			);
		}
		return plainToClass(UserViewDto, data);
	}
}
