FROM node:12-alpine as builder

WORKDIR /msu

COPY yarn.lock ./
COPY *.json ./

RUN yarn install --production=true

COPY ./ ${WORKDIR}

RUN yarn build
#RUN yarn global add serve

#CMD ["serve", "-s", "build", "-l", "5000"]

FROM nginx:1.17

COPY ./.docker/nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /msu/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]