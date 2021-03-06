export default class SanitizeInput {
	static process(value: any) {
		if (!value) {
			return '';
		}

		if (typeof value === 'string') {
			return value;
		}

		return JSON.stringify(value);
	}
}
