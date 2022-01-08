import { BadRequestException } from "../exception/BadRequestException";
import { HTTP_STATUS } from "../HttpStatus";

describe('BadRequestExpcetion', () => {
    it('should success', () => {
        const message = 'error';
        const exception = new BadRequestException(message);
        expect(exception.msg).toEqual(message);
        expect(exception.code).toEqual(HTTP_STATUS.BAD_REQUEST);
    })
})