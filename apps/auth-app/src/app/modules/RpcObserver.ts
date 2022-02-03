import { SongsService } from '@exp/feature';
import { ApmLogger } from '@exp/shared';
import * as grpc from '@grpc/grpc-js';
import GlobalConfig from '../config/GlobalConfig';
import SongRpcHandler from './song/handler/SongRpcHandler';

export class RpcObserver {
	private static SERVICE_LIST = [
		{ definition: SongsService, implementation: new SongRpcHandler() },
	];

	private rpcServer: grpc.Server;
	private appName: string;

	constructor(appName: string) {
		this.appName = appName;
		this.rpcServer = new grpc.Server();
		this.observeService();
	}

	observeService() {
		for (const { definition, implementation } of RpcObserver.SERVICE_LIST) {
			this.rpcServer.addService(definition, implementation);
		}
	}

	init() {
		this.rpcServer.bindAsync(
			GlobalConfig.urlRpc,
			grpc.ServerCredentials.createInsecure(),
			(err: Error, port: number) => {
				if (err) {
					throw err;
				}
				ApmLogger.getInstance(GlobalConfig).debug(
					this.appName,
					`RPC ${this.appName} running at port ${port}`,
					GlobalConfig.urlRpc,
					'App.Listen'
				);
				this.rpcServer.start();
			}
		);
	}
}
