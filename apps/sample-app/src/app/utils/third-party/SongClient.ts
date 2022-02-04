import * as grpc from '@grpc/grpc-js';
import { RpcServerList, Song, SongsClient } from '@exp/feature';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

class SongClient {
	client: SongsClient;
	constructor() {
		try {
			this.client = new SongsClient(
				RpcServerList.SERVICE_AUTH,
				grpc.ChannelCredentials.createInsecure(),
				{
					'grpc.keepalive_time_ms': 120000,
					'grpc.http2.min_time_between_pings_ms': 120000,
					'grpc.keepalive_timeout_ms': 20000,
					'grpc.http2.max_pings_without_data': 0,
					'grpc.keepalive_permit_without_calls': 1,
				}
			);
		} catch (err) {
			throw new Error(err);
		}
	}

	getSong(): Promise<Song.AsObject> {
		return new Promise<Song.AsObject>((resolve, reject) => {
			this.client.getSong(new Empty(), (err, song: Song) => {
				if (err) {
					return reject(err);
				}
				return resolve(song.toObject());
			});
		});
	}
}

export { SongClient };
