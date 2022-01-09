export const environment = {
	production: false,
	port: 3001,
	elastic: {
		username: 'elastic',
		password: 'changeme',
		node: 'http://zetaxcloud.com:9200',
	},
	database: {
		host: 'localhost',
		port: 5432,
		username: 'root',
		password: 'Katasandi2',
		database: 'exp-dev',
	},
	apm: {
		serverUrl: 'http://zetaxcloud.com:8200',
	},
};
