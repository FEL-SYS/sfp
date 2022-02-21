import { mocked } from 'ts-jest/utils';

import { UserService } from '../service/UserService';
import { UserRestHandler } from './UserRestHandler';
jest.mock('../service/UserService', () => {
	return {
		UserService: jest.fn().mockImplementation(() => {
			return {
				register: () => {
					'Pontianak';
				},
				login: () => {
					'Pontianak';
				},
				me: () => {
					'Pontianak';
				},
			};
		}),
	};
});

describe('UserRestHandler', () => {
	const MockedUserService = mocked(UserService, true);

	let ctx: any;

	beforeEach(() => {
		MockedUserService.mockClear();
		ctx = {
			request: {
				body: {
					area: 'Pontianak',
				},
			},
		};
	});

	it('should success register', async () => {
		const response = await UserRestHandler.register(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success login', async () => {
		const response = await UserRestHandler.login(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success me', async () => {
		const response = await UserRestHandler.me(ctx);
		expect(response).toEqual(undefined);
	});
});
