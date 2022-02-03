// package: songs
// file: songs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class Song extends jspb.Message {
	getId(): number;
	setId(value: number): Song;
	getTitle(): string;
	setTitle(value: string): Song;

	serializeBinary(): Uint8Array;
	toObject(includeInstance?: boolean): Song.AsObject;
	static toObject(includeInstance: boolean, msg: Song): Song.AsObject;
	static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
	static extensionsBinary: {
		[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
	};
	static serializeBinaryToWriter(
		message: Song,
		writer: jspb.BinaryWriter
	): void;
	static deserializeBinary(bytes: Uint8Array): Song;
	static deserializeBinaryFromReader(
		message: Song,
		reader: jspb.BinaryReader
	): Song;
}

export namespace Song {
	export type AsObject = {
		id: number;
		title: string;
	};
}
