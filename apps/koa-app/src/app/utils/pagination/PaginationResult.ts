export class PaginationResult<Type> {
	total: number;
	perPage: number;
	data: Array<Type>;

	constructor(total: number, perPage: number, data: Array<Type>) {
		this.total = total;
		this.perPage = perPage;
		this.data = data;
	}
}
