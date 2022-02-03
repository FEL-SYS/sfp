import { PaginationResult } from './PaginationResult';

export class Pagination {
	static result<Type>(total: number, perPage: number, data: Array<Type>) {
		return new PaginationResult<Type>(total, perPage, data);
	}
}
