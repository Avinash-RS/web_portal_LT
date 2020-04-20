FROM node:8.11.2-alpine as node

WORKDIR /src/app

COPY package*.json ./

RUN npm install
RUN npm install ngx-bar-rating
RUN npm install ngx-mask
RUN npm install ngx-owl-carousel-o
RUN npm install ngx-password-toggle
RUN npm install ng4-loading-spinner
RUN npm install videogular2 --save
RUN npm install @types/core-js --save-dev
RUN npm i ngx-spinner@7.2.0
RUN npm i ngx-toastr@10.1.0

COPY . .

RUN ng serve

RUN npm run build
