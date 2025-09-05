FROM node:18-alpine AS build-stage

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:18-alpine AS production-stage
WORKDIR /app
COPY --from=build-stage /app/.next .next
COPY --from=build-stage /app/public public
COPY --from=build-stage /app/package.json package.json
COPY --from=build-stage /app/node_modules node_modules
COPY --from=build-stage /app/.env .env

EXPOSE 8000
CMD ["npm", "run", "start"]
