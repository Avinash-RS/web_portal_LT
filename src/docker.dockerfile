FROM node:8.11.2-alpine as node

WORKDIR /lxpfrontend/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN   ng serve --host 0.0.0.0 [--port 4200 --live-reload-port 49153]

RUN npm run build
