import { mocked } from 'ts-jest/utils';

import { UserService } from '../service/UserService';
import { UserRestHandler } from './UserRestHandler';
jest.mock('../service/UserService', () => {
	return {
		UserService: jest.fn().mockImplementation(() => {
			return {
				create: () => {
					'Pontianak';
				},
				update: () => {
					'Pontianak';
				},
				list: () => {
					[];
				},
				view: () => {
					'Pontianak';
				},
				delete: () => undefined,
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
					username: 'Pontianak',
				},
			},
		};
	});

	it('should success create', async () => {
		const response = await UserRestHandler.create(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success update', async () => {
		const response = await UserRestHandler.update(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success return list', async () => {
		ctx = {
			params: {
				perPage: 100,
				lastId: 0,
				sort: 1,
			},
			query: {
				search: 'test',
			},
		};
		const response = await UserRestHandler.list(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success with search undefined return list', async () => {
		ctx = {
			params: {
				perPage: 100,
				lastId: 0,
				sort: 1,
			},
			query: {
				search: undefined,
			},
		};
		const response = await UserRestHandler.list(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success return view', async () => {
		ctx = {
			params: {
				id: 1,
			},
		};
		const response = await UserRestHandler.view(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success delete', async () => {
		ctx = {
			params: {
				id: 1,
			},
		};
		const response = await UserRestHandler.delete(ctx);
		expect(response).toEqual(undefined);
	});
});
