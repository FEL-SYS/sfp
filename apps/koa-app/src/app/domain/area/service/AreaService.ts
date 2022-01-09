import { BadRequestException, InternalServerException } from '@exp/shared';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Body, Post, Route, Security, Tags } from 'tsoa';
import { getConnection } from 'typeorm';
import Area from '../../../entity/Area';
import AreaDto from '../dto/AreaDto';

@Security('api_key')
@Route('area')
@Tags('Area')
export default class AreaService {

	@Post()
	async save(@Body() dto: AreaDto,) {
		const repo = getConnection().getRepository(Area);
		const data = plainToClass(AreaDto, dto);
		const errors: ValidationError[] = await validate(data);
		if (errors.length) throw new BadRequestException(errors);
		const model = plainToClass(Area, data);
		const result = await repo.save(model).catch(err => {
			throw new InternalServerException(err);
		});
		return result;
	}
}
