import { prismaMock } from '../../../utils/database/prismaSingleton';
import { AreaService } from './AreaService';

describe('AreaService', () => {
	it('should validation error', async () => {
		const service = new AreaService();
		const model = {
			id: 1,
			area_unknown: 'Area',
		};
		await expect(service.create(model)).rejects.toThrow('');
	});

	it('should success', async () => {
		const service = new AreaService();
		const model = {
			id: 1,
			area: 'Area',
		};
		prismaMock.area.create.mockResolvedValue(model);
		await expect(service.create(model)).resolves.toEqual(model);
	});
});
