import { BadRequestException } from "@exp/shared";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Body, Path, Post, Route, Security, Tags, Response, Query } from "tsoa";
import Area from "../../../entity/Area";
import AreaDto from "../dto/Area.dto";

@Security('api_key')
@Route("area")
@Tags("Area")
export default class AreaService {

    @Post()
    async save(@Body() dto: AreaDto, @Query() id?: string) {
        const data = plainToClass(AreaDto, dto);
        const errors: ValidationError[] = await validate(data);
        if (errors.length) throw new BadRequestException(errors);
        const model = plainToClass(Area, data);
        // todo save repo here
        return model;
    }
}