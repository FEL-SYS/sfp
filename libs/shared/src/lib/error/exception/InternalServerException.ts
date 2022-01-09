import { HttpException } from '../HttpException';
import { HTTP_STATUS } from '../HttpStatus';

export class InternalServerException extends HttpException {
	constructor(msg: any) {
		super(msg, HTTP_STATUS.INTERNAL_ERROR);
	}
}
