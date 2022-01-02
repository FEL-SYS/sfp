import { createLogger, format, Logger, transports } from 'winston';
const { combine, timestamp, colorize, printf } = format;
import SanitizeInput from './SanitizeInput';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { IConfig } from '../interface/IConfig';


export class ApmLogger {

    static instance: ApmLogger;
    transports = [];
    logger!: Logger;
    config: IConfig

    private constructor(config: IConfig) {
        this.config = config;
        this.setupWinstonTransporter();
        this.createLogger();
    }

    static getInstance(config: IConfig): ApmLogger {
        if (!ApmLogger.instance) {
            ApmLogger.instance = new ApmLogger(config);
        }
        return ApmLogger.instance;
    }

    setupWinstonTransporter() {
        this.transports = [
            new transports.Console({
                format: combine(
                    timestamp(),
                    colorize(),
                    printf((info) => {
                        if (info.data) {
                            return `${info.timestamp} [${info.level}][${info.context}][${info.scope}] ${info.message}\n${info.data}`;
                        }

                        return `${info.timestamp} [${info.level}][${info.context}][${info.scope}] ${info.message}`;
                    })
                ),
                handleExceptions: true
            })
        ];

        const opts = {
            level: this.config.debugLogging ? 'debug' : 'info',
            clientOpts: {
                node: this.config.elastic.node.split(';'),
                auth: {
                    username: this.config.elastic.username,
                    password: this.config.elastic.password
                }
            }
        };
        const esTransports = new ElasticsearchTransport(opts);
        this.transports.push(esTransports);
    }

    createLogger() {
        this.logger = createLogger({
            silent: false,
            level: this.config.debugLogging ? 'debug' : 'info',
            transports: this.transports,
            exitOnError: false
        });
    }

    buildField(context: string, message: string, scope: string, data = "") {
        return {
            message: SanitizeInput.process(message),
            fields: {
                label: '',
                context: SanitizeInput.process(context),
                scope: SanitizeInput.process(scope),
                data: SanitizeInput.process(data),
            }
        };
    }

    info(context: string, message: string, scope: string, data = "") {
        const values = this.buildField(context, message, scope, data);
        this.logger.info(values.message, values.fields);
    }

    debug(context: string, message: string, scope: string, data = "") {
        const values = this.buildField(context, message, scope, data);
        this.logger.debug(values.message, values.fields);
    }

    error(context: string, message: string, scope: string, data = "") {
        const values = this.buildField(context, message, scope, data);
        this.logger.error(values.message, values.fields);
    }
}