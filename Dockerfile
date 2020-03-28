FROM node:8.11.2-alpine as node

WORKDIR /src/app

COPY package*.json ./

RUN npm install
RUN npm install ngx-bar-rating
RUN npm i ngx-mask
RUN npm install ngx-owl-carousel-o
run npm i ngx-password-toggle

COPY . .

RUN ng serve

RUN npm run build
