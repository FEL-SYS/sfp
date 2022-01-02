export class HttpException extends Error {

    msg: string;
    code: number;
    errorCode: number;

    constructor(msg = 'Server exception', errorCode = 1000, code = 400) {
        super();
        this.msg = msg;
        this.code = code;
        this.errorCode = errorCode;
    }
}