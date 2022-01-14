export interface IConfig {
	mode: string;
	isProduction: boolean;
	debugLogging: boolean;
	elastic: {
		username: string;
		password: string;
		node: string;
	};
	apm: {
		serverUrl: string;
	};
}
