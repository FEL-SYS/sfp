import 'reflect-metadata';
import { environment } from './environments/environment';
import Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import { koaSwagger } from 'koa2-swagger-ui';
import { ApmLogger, ApmMonitoring, CatchError } from '@exp/shared';
import router from './app/config/router';
import GlobalConfig from './app/config/GlobalConfig';
import { resolve } from 'path';
import * as yamljs from 'yamljs';
import { databaseConnection } from './app/utils/database/databaseConnection';

const appName = `koa-app-${GlobalConfig.mode}`;
const port = environment.port || 3000;
const app = new Koa();

// Init APM
ApmMonitoring.init(GlobalConfig, appName);

// Init DB
databaseConnection
	.create()
	.then(() => {
		ApmLogger.getInstance(GlobalConfig).debug(
			appName,
			`DB ${appName} connected`,
			'DB.Listen'
		);
	})
	.catch((err) => {
		ApmLogger.getInstance(GlobalConfig).error(
			appName,
			`DB ${appName} error`,
			'DB.Listen',
			err
		);
	});

// Helmet
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
			styleSrc: [
				"'self'",
				"'unsafe-inline'",
				'cdnjs.cloudflare.com',
				'fonts.googleapis.com',
			],
			fontSrc: ["'self'", 'fonts.gstatic.com'],
			imgSrc: [
				"'self'",
				'data:',
				'online.swagger.io',
				'validator.swagger.io',
			],
		},
	})
);

// Open API
app.use(
	koaSwagger({
		title: 'Koa',
		routePrefix: '/doc',
		swaggerOptions: {
			spec: yamljs.load(resolve(__dirname, 'assets', 'swagger.yaml')),
		},
	})
);

app.use(cors());
app.use(bodyParser());
app.use(CatchError);
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () =>
	ApmLogger.getInstance(GlobalConfig).debug(
		appName,
		`${appName} running at port ${port}`,
		`http://localhost:${port}`,
		'App.Listen'
	)
);
