#!/bin/bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}

PROTO_DEST=./libs/feature/src/proto

mkdir -p ${PROTO_DEST}

npx grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:${PROTO_DEST} \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=grpc_js:${PROTO_DEST} \
   -I ./libs/feature/proto \
    libs/feature/proto/*.proto