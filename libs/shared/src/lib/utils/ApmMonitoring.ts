import { IConfig } from '../interface/IConfig';
import * as apm from 'elastic-apm-node';

export class ApmMonitoring {
	static init(config: IConfig, serviceName: string) {
		if (config.apm.serverUrl !== undefined) {
			apm.start({
				serviceName: serviceName,
				secretToken: '',
				apiKey: '',
				serverUrl: config.apm.serverUrl,
			});
		}
	}
}
