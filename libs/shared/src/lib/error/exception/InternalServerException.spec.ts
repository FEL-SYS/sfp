import { InternalServerException } from './InternalServerException';
import { HTTP_STATUS } from '../HttpStatus';

describe('InternalServerException', () => {
	it('should success', () => {
		const message = 'error';
		const exception = new InternalServerException(message);
		expect(exception.msg).toEqual(message);
		expect(exception.code).toEqual(HTTP_STATUS.INTERNAL_ERROR);
	});
});
