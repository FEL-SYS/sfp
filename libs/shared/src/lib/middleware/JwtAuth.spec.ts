import { InternalServerException } from '../error/exception/InternalServerException';
import { HttpException } from '../error/HttpException';
import { HTTP_STATUS } from '../error/HttpStatus';
import { JwtAuth } from './JwtAuth';
describe('JwtAuth', () => {
	beforeEach(() => {
		jest.resetModules();
		process.env = {
			JWT_SECRET: 'VTwUrUEeuyBTL',
		};
	});

	afterAll(() => {
		process.env = {};
	});

	it('should success', async () => {
		const ctx: any = {
			headers: {
				authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJmZWxpeGExOTk2IiwiamFiYXRhbiI6OSwiaXNfYWt0aWYiOnRydWUsImNhYmFuZ19pZCI6MSwiaXNzIjoiQnZoTHlzellhM0RrYzNucklGWWRnOUF1TGpzc3dZYjIiLCJpYXQiOjE2Mzg5ODU1NDh9.lj0I9L4RtRT_H3ktjVqnqo-YOC_9UotbLy5ubbKleRo',
			},
		};
		await JwtAuth(ctx, async () => ({}));

		expect(ctx.user).toEqual({
			cabang_id: 1,
			iat: 1638985548,
			id: 1,
			is_aktif: true,
			iss: 'BvhLyszYa3Dkc3nrIFYdg9AuLjsswYb2',
			jabatan: 9,
			username: 'felixa1996',
		});
	});

	it('should return internal error', async () => {
		try {
			const ctx: any = {
				headers: {
					authorization: 'wrongtoken'
				},
			};
			await JwtAuth(ctx, async () => ({}));
		} catch (err) {
			expect(err).toEqual(
				new InternalServerException(err)
			);
		}
	});

	it('should return unauthorized', async () => {
		try {
			const ctx: any = {
				headers: {},
			};
			await JwtAuth(ctx, async () => ({}));
		} catch (err) {
			expect(err).toEqual(
				new HttpException('Unauthorized', HTTP_STATUS.UNAUTHORIZED)
			);
		}
	});
});
