// package: songs
// file: songs.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js';
import * as songs_pb from './songs_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

interface ISongsService
	extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
	getSong: ISongsService_IGetSong;
}

interface ISongsService_IGetSong
	extends grpc.MethodDefinition<
		google_protobuf_empty_pb.Empty,
		songs_pb.Song
	> {
	path: '/songs.Songs/GetSong';
	requestStream: false;
	responseStream: false;
	requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
	requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
	responseSerialize: grpc.serialize<songs_pb.Song>;
	responseDeserialize: grpc.deserialize<songs_pb.Song>;
}

export const SongsService: ISongsService;

export interface ISongsServer extends grpc.UntypedServiceImplementation {
	getSong: grpc.handleUnaryCall<
		google_protobuf_empty_pb.Empty,
		songs_pb.Song
	>;
}

export interface ISongsClient {
	getSong(
		request: google_protobuf_empty_pb.Empty,
		callback: (
			error: grpc.ServiceError | null,
			response: songs_pb.Song
		) => void
	): grpc.ClientUnaryCall;
	getSong(
		request: google_protobuf_empty_pb.Empty,
		metadata: grpc.Metadata,
		callback: (
			error: grpc.ServiceError | null,
			response: songs_pb.Song
		) => void
	): grpc.ClientUnaryCall;
	getSong(
		request: google_protobuf_empty_pb.Empty,
		metadata: grpc.Metadata,
		options: Partial<grpc.CallOptions>,
		callback: (
			error: grpc.ServiceError | null,
			response: songs_pb.Song
		) => void
	): grpc.ClientUnaryCall;
}

export class SongsClient extends grpc.Client implements ISongsClient {
	constructor(
		address: string,
		credentials: grpc.ChannelCredentials,
		options?: Partial<grpc.ClientOptions>
	);
	public getSong(
		request: google_protobuf_empty_pb.Empty,
		callback: (
			error: grpc.ServiceError | null,
			response: songs_pb.Song
		) => void
	): grpc.ClientUnaryCall;
	public getSong(
		request: google_protobuf_empty_pb.Empty,
		metadata: grpc.Metadata,
		callback: (
			error: grpc.ServiceError | null,
			response: songs_pb.Song
		) => void
	): grpc.ClientUnaryCall;
	public getSong(
		request: google_protobuf_empty_pb.Empty,
		metadata: grpc.Metadata,
		options: Partial<grpc.CallOptions>,
		callback: (
			error: grpc.ServiceError | null,
			response: songs_pb.Song
		) => void
	): grpc.ClientUnaryCall;
}
