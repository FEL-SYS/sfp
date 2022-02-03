import * as grpc from '@grpc/grpc-js';
import { ISongsServer, Song } from '@exp/feature';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { sendUnaryData } from '@grpc/grpc-js';

export default class SongRpcHandler implements ISongsServer {
	[name: string]: import('@grpc/grpc-js').UntypedHandleCall;

	// @ts-ignore
	getSong(
		call: grpc.ServerUnaryCall<Empty, Song>,
		callback: sendUnaryData<Empty>
	) {
		const s = new Song();
		s.setId(1);
		s.setTitle('Todo need change');
		callback(null, s);
	}
}
