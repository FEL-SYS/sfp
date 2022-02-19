FROM node:12.8.1-alpine
WORKDIR /app
COPY ./dist/apps/auth-app .
COPY ./apps/auth-app/prisma .
EXPOSE 3002
RUN npm install --production
RUN npx prisma generate --schema=/app/prisma/schema.prisma
CMD node ./main.js