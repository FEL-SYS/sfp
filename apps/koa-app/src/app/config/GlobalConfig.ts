const GlobalConfig = {
	mode: process.env.NODE_ENV || 'development',
	portRpc: process.env.PORT_RPC,
	isProduction: process.env.NODE_ENV === 'production',
	debugLogging: process.env.NODE_ENV !== 'production',
	elastic: {
		username: process.env.ELASTIC_USERNAME || 'elastic',
		password: process.env.ELASTIC_PASSWORD || 'changeme',
		node: process.env.ELASTIC_NODE || 'http://localhost:9200',
	},
	apm: {
		serverUrl: process.env.APM_SERVERURL || 'http://localhost:8200',
	},
};

export default GlobalConfig;
