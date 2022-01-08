import { HttpException } from '../HttpException';
import { HTTP_STATUS } from './../HttpStatus';

export class BadRequestException extends HttpException {
  constructor(msg: any) {
    super(msg, HTTP_STATUS.BAD_REQUEST);
  }
}
