FROM exp-base-image:nx-base AS builder

ARG APP_NAME
ARG BUILD_FLAG

WORKDIR /app/builder
COPY . .
RUN npx prisma generate --schema=/app/builder/apps/${APP_NAME}/prisma/schema.prisma
RUN npx nx build ${APP_NAME} ${BUILD_FLAG}

FROM exp-base-image:nx-base

WORKDIR /app
COPY --from=builder /app/builder ./

CMD ["node", "./dist/apps/auth-app/main.js"]
