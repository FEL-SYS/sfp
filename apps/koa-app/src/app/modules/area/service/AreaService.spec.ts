import { prismaMock } from '../../../utils/database/prismaSingleton';
import { AreaService } from './AreaService';

describe('AreaService', () => {
	const payloadList = {
		perPage: 1,
		lastId: 1,
		sort: 1,
		search: 'search',
	};
	const responseList = {
		total: 1,
		perPage: 1,
		data: [
			{
				id: 1,
				area: 'Pontianak',
			},
		],
	};
	const model = {
		id: 1,
		area: 'Area',
	};

	it('should list sort asc', async () => {
		const service = new AreaService();
		prismaMock.area.count.mockResolvedValue(responseList.total);
		prismaMock.area.findMany.mockResolvedValue(responseList.data);
		await expect(
			service.list(
				payloadList.perPage,
				payloadList.lastId,
				payloadList.sort
			)
		).resolves.toEqual(responseList);
	});

	it('should list sort desc', async () => {
		const service = new AreaService();
		prismaMock.area.count.mockResolvedValue(responseList.total);
		prismaMock.area.findMany.mockResolvedValue(responseList.data);
		await expect(
			service.list(payloadList.perPage, payloadList.lastId, 0)
		).resolves.toEqual(responseList);
	});

	it('should create validation error', async () => {
		const service = new AreaService();
		const model = {
			id: 1,
			area_unknown: 'Area',
		};
		await expect(service.create(model)).rejects.toThrow('');
	});

	it('should success create', async () => {
		const service = new AreaService();
		prismaMock.area.create.mockResolvedValue(model);
		await expect(service.create(model)).resolves.toEqual(model);
	});

	it('should update validation error', async () => {
		const service = new AreaService();
		const model = {
			id: 1,
			area_unknown2: 'Area',
		};
		await expect(service.update(model)).rejects.toThrow('');
	});

	it('should success update', async () => {
		const service = new AreaService();
		prismaMock.area.findFirst.mockResolvedValue(model);
		prismaMock.area.update.mockResolvedValue(model);
		await expect(service.update(model)).resolves.toEqual(model);
	});

	it('should success return view not found', async () => {
		const service = new AreaService();
		prismaMock.area.findFirst.mockResolvedValue(undefined);
		await expect(service.view(model.id)).rejects.toThrow('');
	});

	it('should success return view', async () => {
		const service = new AreaService();
		prismaMock.area.findFirst.mockResolvedValue(model);
		await expect(service.view(model.id)).resolves.toEqual(model);
	});

	it('should failed delete', async () => {
		const service = new AreaService();
		prismaMock.area.findFirst.mockResolvedValue(model);
		prismaMock.area.delete.mockResolvedValue(model);
		await expect(service.delete(model.id)).rejects.toThrow('');
	});

	it('should success delete', async () => {
		const service = new AreaService();
		prismaMock.area.findFirst.mockResolvedValue(model);
		prismaMock.area.delete.mockResolvedValue(undefined);
		const result = await service.delete(model.id);
		expect(result).toEqual(undefined);
	});
});
