FROM node:8.11.2-alpine as node

WORKDIR /src/app

COPY package*.json ./

RUN npm install
RUN npm install ngx-bar-rating
RUN npm install ngx-mask
RUN npm install ngx-owl-carousel-o
run npm install ngx-password-toggle
RUN npm install ng4-loading-spinner

COPY . .

RUN ng serve

RUN npm run build
