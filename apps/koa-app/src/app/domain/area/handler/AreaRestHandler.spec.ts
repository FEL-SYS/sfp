import { mocked } from 'ts-jest/utils';
import { AreaService } from '../service/AreaService';
import { AreaRestHandler } from './AreaRestHandler';
jest.mock('../service/AreaService', () => {
	return {
		AreaService: jest.fn().mockImplementation(() => {
			return {
				save: () => {
					'Pontianak';
				},
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

	it('should save', async () => {
		const te = await AreaRestHandler.create(ctx);
		expect(te).toEqual(undefined);
	});
});
