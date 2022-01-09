import GlobalConfig from '../../config/GlobalConfig';
import { createConnection, getConnection } from "typeorm";
import Area from '../../entity/Area';

const db = GlobalConfig.database

const databaseConnection = {
    async create() {
        return await createConnection({
            type: 'postgres',
            schema: GlobalConfig.isProduction ? 'public' : 'koa',
            host: db.host,
            port: db.port,
            username: db.username,
            password: db.password,
            database: db.database,
            synchronize: true,
            logging: GlobalConfig.debugLogging,
            entities: [
                Area
            ],
            extra: {
                ssl: false
            }
        }).catch(err => {
            throw Error('DB Not Connected' + err);
        });
    },

    async close() {
        await getConnection().close();
    },
};

export { databaseConnection };