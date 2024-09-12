# build stage
ARG NEXT_PUBLIC_CLIENT_HOST
ARG NEXT_PUBLIC_SERVER_HOST
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./portfolio-frontend .
RUN npm run build

# production stage
FROM node:18-alpine AS production-stage
WORKDIR /app
COPY --from=build-stage /app ./portfolio-frontend
EXPOSE 3000
CMD ["npm", "run", "start"]
