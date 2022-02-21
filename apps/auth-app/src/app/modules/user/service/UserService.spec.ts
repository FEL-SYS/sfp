import { JwtSign } from '@exp/shared';
import { prismaMock } from '../../../utils/database/prismaSingleton';
import { UserService } from './UserService';

jest.mock('@exp/shared', () => {
	return {
		JwtSign: jest.fn(),
	};
});
jest.mock('bcryptjs', () => ({
	...jest.requireActual('bcryptjs'),
	compare: jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true),
	hash: jest.fn().mockResolvedValue('password'),
}));

describe('UserService', () => {
	let payloadLogin: any;
	let responseLogin: any;

	beforeEach(() => {
		payloadLogin = {
			username: 'username',
			password: 'password',
		};
		responseLogin = {
			id: 1,
			username: 'username',
			email: 'username@mail.com',
			type: 'administrator',
			active: true,
			accessToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZSIsImVtYWlsIjoidXNlcm5hbWVAbWFpbC5jb20iLCJ0eXBlIjoiYWRtaW5pc3RyYXRvciIsImFjdGl2ZSI6dHJ1ZSwiaWF0IjoxNjQ1NDM5MTE3LCJleHAiOjE2NDU0NDI3MTcsImlzcyI6InRzbmV4dCJ9.jcq9X1DKrEzHpIeXwYDI-lglE8BYjJNvnjudORlnP-A',
		};
	});

	it('should register validation error', async () => {
		const service = new UserService();
		const payload = {
			username: 'username',
			email: 'username@mail.com',
			type: 'administrator',
			password_unknown: 'password',
		};
		await expect(service.register(payload)).rejects.toThrow('');
	});

	it('should register success', async () => {
		const service = new UserService();
		const payload = {
			username: 'username',
			email: 'username@mail.com',
			type: 'administrator',
			password: 'password',
		};
		prismaMock.user.create.mockResolvedValue(responseLogin);
		await expect(service.register(payload)).resolves.toEqual(responseLogin);
	});

	it('should login not found', async () => {
		const service = new UserService();
		prismaMock.user.findFirst.mockResolvedValue(undefined);
		await expect(service.login(payloadLogin)).rejects.toThrow('');
	});

	it('should login user not active', async () => {
		const service = new UserService();
		responseLogin.active = false;
		prismaMock.user.findFirst.mockResolvedValue(responseLogin);
		await expect(service.login(payloadLogin)).rejects.toThrow('');
	});

	it('should login user password does not match', async () => {
		const service = new UserService();
		prismaMock.user.findFirst.mockResolvedValue(responseLogin);
		await expect(service.login(payloadLogin)).rejects.toThrow('');
	});

	it('should login success', async () => {
		(JwtSign as jest.MockedFunction<typeof JwtSign>).mockReturnValue(
			responseLogin.accessToken
		);

		const service = new UserService();
		prismaMock.user.findFirst.mockResolvedValue(responseLogin);
		delete responseLogin.password;
		await expect(service.login(payloadLogin)).resolves.toEqual(
			responseLogin
		);
	});

	it('should view user not found', async () => {
		const service = new UserService();
		prismaMock.user.findFirst.mockResolvedValue(undefined);
		await expect(service.me(payloadLogin)).rejects.toThrow('');
	});

	it('should view user ', async () => {
		const service = new UserService();
		prismaMock.user.findFirst.mockResolvedValue(responseLogin);
		delete responseLogin.accessToken;
		await expect(service.me({ id: 1 })).resolves.toEqual(responseLogin);
	});
});
