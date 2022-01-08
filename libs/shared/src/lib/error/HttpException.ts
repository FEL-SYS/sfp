export class HttpException extends Error {
	msg: string;
	code: number;
	data: any;

	constructor(msg: any, code: number) {
		super();
		this.msg = msg;
		this.code = code;
	}
}
