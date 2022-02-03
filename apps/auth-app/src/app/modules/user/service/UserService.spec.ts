import { prismaMock } from '../../../utils/database/prismaSingleton';
import { UserService } from './UserService';

describe('UserService', () => {
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
				username: 'Pontianak',
			},
		],
	};
	const model = {
		id: 1,
		username: 'User',
	};

	it('should list sort asc', async () => {
		const service = new UserService();
		prismaMock.User.count.mockResolvedValue(responseList.total);
		prismaMock.User.findMany.mockResolvedValue(responseList.data);
		await expect(
			service.list(
				payloadList.perPage,
				payloadList.lastId,
				payloadList.sort
			)
		).resolves.toEqual(responseList);
	});

	it('should list sort desc', async () => {
		const service = new UserService();
		prismaMock.User.count.mockResolvedValue(responseList.total);
		prismaMock.User.findMany.mockResolvedValue(responseList.data);
		await expect(
			service.list(payloadList.perPage, payloadList.lastId, 0)
		).resolves.toEqual(responseList);
	});

	it('should create validation error', async () => {
		const service = new UserService();
		const modelError = {
			id: 1,
			username_unknown: 'User',
		};
		await expect(service.create(modelError)).rejects.toThrow('');
	});

	it('should success create', async () => {
		const service = new UserService();
		prismaMock.User.create.mockResolvedValue(model);
		await expect(service.create(model)).resolves.toEqual(model);
	});

	it('should update validation error', async () => {
		const service = new UserService();
		const modelError = {
			id: 1,
			username_unknown: 'User',
		};
		await expect(service.update(modelError)).rejects.toThrow('');
	});

	it('should success update', async () => {
		const service = new UserService();
		prismaMock.User.findFirst.mockResolvedValue(model);
		prismaMock.User.update.mockResolvedValue(model);
		await expect(service.update(model)).resolves.toEqual(model);
	});

	it('should success return view not found', async () => {
		const service = new UserService();
		prismaMock.User.findFirst.mockResolvedValue(undefined);
		await expect(service.view(model.id)).rejects.toThrow('');
	});

	it('should success return view', async () => {
		const service = new UserService();
		prismaMock.User.findFirst.mockResolvedValue(model);
		await expect(service.view(model.id)).resolves.toEqual(model);
	});

	it('should failed delete', async () => {
		const service = new UserService();
		prismaMock.User.findFirst.mockResolvedValue(model);
		prismaMock.User.delete.mockResolvedValue(model);
		await expect(service.delete(model.id)).rejects.toThrow('');
	});

	it('should success delete', async () => {
		const service = new UserService();
		prismaMock.User.findFirst.mockResolvedValue(model);
		prismaMock.User.delete.mockResolvedValue(undefined);
		const result = await service.delete(model.id);
		expect(result).toEqual(undefined);
	});
});
