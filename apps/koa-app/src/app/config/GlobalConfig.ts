import { IConfig } from '@exp/shared';
import { environment } from '../../environments/environment';

const GlobalConfig: IConfig = {
	mode: environment.production ? 'production' : 'development',
	isProduction: environment.production,
	debugLogging: !environment.production,
	elastic: environment.elastic,
	apm: environment.apm,
	database: environment.database,
};

export default GlobalConfig;
