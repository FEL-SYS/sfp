export interface IConfig {
	mode: string;
	isProduction: boolean;
	debugLogging: boolean;
	elastic: {
		username: string;
		password: string;
		node: string;
	};
	database: {
		host: string;
		port: number;
		username: string;
		password: string;
		database: string;
	},
	apm: {
		serverUrl: string;
	};
}
