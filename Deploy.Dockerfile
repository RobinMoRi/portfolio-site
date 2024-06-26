# build stage
ARG VITE_GITHUB_API_TOKEN
ARG VITE_DISCORD_PROXY_HOST
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm cache clean --force
RUN npm run build
# production stage
FROM nginx AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
