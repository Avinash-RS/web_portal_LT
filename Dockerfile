### STAGE 1: Build ###
FROM node:10.20.1 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm config set registry http://registry.npmjs.org/ 
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
RUN npm i xlsx
RUN npm i file-saver
RUN npm i ngx-pagination
RUN npm i ngx-infinite-scroll
RUN npm install apollo-client

COPY . .
#RUN ng serve
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/lxpfrontend /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
