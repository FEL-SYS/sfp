// source: songs.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.object.extend(proto, google_protobuf_empty_pb);
goog.exportSymbol('proto.songs.Song', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.songs.Song = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.songs.Song, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.songs.Song.displayName = 'proto.songs.Song';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.songs.Song.prototype.toObject = function (opt_includeInstance) {
		return proto.songs.Song.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.songs.Song} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.songs.Song.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				id: jspb.Message.getFieldWithDefault(msg, 1, 0),
				title: jspb.Message.getFieldWithDefault(msg, 2, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.songs.Song}
 */
proto.songs.Song.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.songs.Song();
	return proto.songs.Song.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.songs.Song} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.songs.Song}
 */
proto.songs.Song.deserializeBinaryFromReader = function (msg, reader) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setId(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setTitle(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.songs.Song.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.songs.Song.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.songs.Song} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.songs.Song.serializeBinaryToWriter = function (message, writer) {
	var f = undefined;
	f = message.getId();
	if (f !== 0) {
		writer.writeInt32(1, f);
	}
	f = message.getTitle();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
};

/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.songs.Song.prototype.getId = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.songs.Song} returns this
 */
proto.songs.Song.prototype.setId = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional string title = 2;
 * @return {string}
 */
proto.songs.Song.prototype.getTitle = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.songs.Song} returns this
 */
proto.songs.Song.prototype.setTitle = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

goog.object.extend(exports, proto.songs);
