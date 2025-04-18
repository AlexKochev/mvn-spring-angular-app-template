# Dev stage
FROM node:22 AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY src/ src/
COPY *.json .
COPY server.ts .
RUN ng build
EXPOSE 4200
CMD ["ng", "s"]

# Prod build stage (optional)
FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

# Production stage (optional, if you want to serve via Nginx)
FROM nginx:alpine AS prod
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
