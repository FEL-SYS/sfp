import { mocked } from 'ts-jest/utils';

import { AreaService } from '../service/AreaService';
import { AreaRestHandler } from './AreaRestHandler';
jest.mock('../service/AreaService', () => {
	return {
		AreaService: jest.fn().mockImplementation(() => {
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

describe('AreaRestHandler', () => {
	const MockedAreaService = mocked(AreaService, true);

	let ctx: any;

	beforeEach(() => {
		MockedAreaService.mockClear();
		ctx = {
			request: {
				body: {
					area: 'Pontianak',
				},
			},
		};
	});

	it('should success create', async () => {
		const response = await AreaRestHandler.create(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success update', async () => {
		const response = await AreaRestHandler.update(ctx);
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
		const response = await AreaRestHandler.list(ctx);
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
		const response = await AreaRestHandler.list(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success return view', async () => {
		ctx = {
			params: {
				id: 1,
			},
		};
		const response = await AreaRestHandler.view(ctx);
		expect(response).toEqual(undefined);
	});

	it('should success delete', async () => {
		ctx = {
			params: {
				id: 1,
			},
		};
		const response = await AreaRestHandler.delete(ctx);
		expect(response).toEqual(undefined);
	});
});
