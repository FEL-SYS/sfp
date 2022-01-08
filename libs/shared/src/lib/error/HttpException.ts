import { HTTP_STATUS } from "./HttpStatus";

export class HttpException extends Error {

    msg: string;
    code: number;
    data: any;

    constructor(msg: any = 'Server exception', code = 400) {
        super();
        this.msg = msg;
        this.code = code;
    }
}

export class BadRequestException extends HttpException {
    constructor(msg: any) {
        super(msg, HTTP_STATUS.BAD_REQUEST);
    }
}