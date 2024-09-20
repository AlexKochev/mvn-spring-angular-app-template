FROM node:20.10.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build app/dist/web-ui/browser /usr/share/nginx/html

EXPOSE 80
