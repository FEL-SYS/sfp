import { IConfig } from '@exp/shared';
import { environment } from '../../environments/environment';

const GlobalConfig: IConfig = {
	mode: environment.production ? 'production' : 'development',
	debugLogging: !environment.production,
	elastic: environment.elastic,
	apm: environment.apm,
};

export default GlobalConfig;
