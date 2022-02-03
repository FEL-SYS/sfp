// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var songs_pb = require('./songs_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
	if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
		throw new Error('Expected argument of type google.protobuf.Empty');
	}
	return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
	return google_protobuf_empty_pb.Empty.deserializeBinary(
		new Uint8Array(buffer_arg)
	);
}

function serialize_songs_Song(arg) {
	if (!(arg instanceof songs_pb.Song)) {
		throw new Error('Expected argument of type songs.Song');
	}
	return Buffer.from(arg.serializeBinary());
}

function deserialize_songs_Song(buffer_arg) {
	return songs_pb.Song.deserializeBinary(new Uint8Array(buffer_arg));
}

var SongsService = (exports.SongsService = {
	getSong: {
		path: '/songs.Songs/GetSong',
		requestStream: false,
		responseStream: false,
		requestType: google_protobuf_empty_pb.Empty,
		responseType: songs_pb.Song,
		requestSerialize: serialize_google_protobuf_Empty,
		requestDeserialize: deserialize_google_protobuf_Empty,
		responseSerialize: serialize_songs_Song,
		responseDeserialize: deserialize_songs_Song,
	},
});

exports.SongsClient = grpc.makeGenericClientConstructor(SongsService);
