FROM node:12.20 AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npm i