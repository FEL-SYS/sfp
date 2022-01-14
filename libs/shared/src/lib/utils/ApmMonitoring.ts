export class ApmMonitoring {
	static init(config: any, serviceName: string) {
		if (config.apm.serverUrl !== undefined) {
			/* eslint @typescript-eslint/no-var-requires: "off" */
			const apm = require('elastic-apm-node');
			apm.start({
				serviceName: serviceName,
				secretToken: '',
				apiKey: '',
				serverUrl: config.apm.serverUrl,
			});
		}
	}
}
