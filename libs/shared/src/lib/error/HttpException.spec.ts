import { HttpException } from "./HttpException";
import { HTTP_STATUS } from "./HttpStatus";

describe('HttpExpcetion', () => {
    it('should success', () => {
        const message = 'Server Exception';
        const exception = new HttpException(message, 400,);
        expect(exception.msg).toEqual(message);
        expect(exception.code).toEqual(HTTP_STATUS.BAD_REQUEST);
    })
})