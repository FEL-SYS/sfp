import { environment } from './environments/environment';
import Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as cors from "@koa/cors";
import * as bodyParser from "koa-bodyparser";
import { ApmLogger, ApmMonitoring, CatchError } from '@exp/shared';
import "reflect-metadata";
import router from './app/config/ServerRouter';
import GlobalConfig from './app/config/Config';

const appName = `koa-app-${GlobalConfig.mode}`;
const port = environment.port || 3000;
const app = new Koa();

ApmMonitoring.init(GlobalConfig, appName);
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "fonts.googleapis.com"],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "online.swagger.io", "validator.swagger.io"]
    }
}));
app.use(cors());
app.use(bodyParser());

app.use(CatchError);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => ApmLogger.getInstance(GlobalConfig).debug(appName, `${appName} running at port ${port}`, `http://localhost:${port}`, 'App.Listen'));