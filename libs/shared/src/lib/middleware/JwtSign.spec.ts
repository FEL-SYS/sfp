import { JwtSign } from './JwtSign';

const payload: any = {
	username: 'username',
	password: 'password',
};
const result =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTY0NTQzOTUxNywiZXhwIjoxNjQ1NDQzMTE3LCJpc3MiOiJ0cy1uZXh0In0.Onv_dIvMfpTtlzRk5Y8mSdy1gWYhY4C6iclNB-E3tQw';

jest.mock('jsonwebtoken', () => ({
	...jest.requireActual('jsonwebtoken'),
	sign: jest
		.fn()
		.mockReturnValue(
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTY0NTQzOTUxNywiZXhwIjoxNjQ1NDQzMTE3LCJpc3MiOiJ0cy1uZXh0In0.Onv_dIvMfpTtlzRk5Y8mSdy1gWYhY4C6iclNB-E3tQw'
		),
}));

describe('JwtSign', () => {
	beforeEach(() => {
		jest.resetModules();
		process.env = {
			JWT_SECRET: 'VTwUrUEeuyBTL',
			APP_NAME: 'ts-next',
		};
	});

	afterAll(() => {
		process.env = {};
	});

	it('should success', async () => {
		const sign = JwtSign(payload);
		expect(sign).toEqual(result);
	});
});
